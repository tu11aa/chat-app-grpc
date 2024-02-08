import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./proto/chat";
import { ChatServiceHandlers } from "./proto/chatPackage/ChatService";
import { StreamMessage } from "./proto/chatPackage/StreamMessage";
import { ChatConnectRequest } from "./proto/chatPackage/ChatConnectRequest";
import { UserStreamResponse } from "./proto/chatPackage/UserStreamResponse";
import { User } from "./proto/chatPackage/User";
import client, {
  addUser,
  getUserList,
  listMessagesFromMainRoom,
  addChatToMainRoom,
  // findUser,
  // updateUser,
  getUserByUsername,
  createIdOfKey,
  signIn,
  signUp,
  updateUser
} from "./data";
import {
  emitRoomChatUpdate,
  emitUserUpdateEvent,
  listenRoomChatUpdate,
  listenUserUpdateEvent,
} from "./pubsub";
import { Status } from "./proto/chatPackage/Status";
import { StreamRequest } from "./proto/chatPackage/StreamRequest";

const PORT = 9090;
const PROTO_FILE = "./proto/chat.proto";

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObj = grpc.loadPackageDefinition(
  packageDef
) as unknown as ProtoGrpcType;
const chatPackage = grpcObj.chatPackage;

function main() {
  const server = getServer();
  server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Your server as started on port ${port}`);
      server.start();
    }
  );
  
  runStreams();
}

const usernameToMsgStream = new Map<
  string,
  grpc.ServerWritableStream<StreamRequest, StreamMessage>
>();
const usernameToUserListStream = new Map<
  string,
  grpc.ServerWritableStream<StreamRequest, UserStreamResponse>
>();
function getServer() {
  const server = new grpc.Server();
  server.addService(chatPackage.ChatService.service, {

    SignIn: (call, callback) => {
      const {username, password} = call.request;
      if (!username || !password) return callback(new Error('Name/password required'));
      signIn(call.request, (err, user) => {
        if (err) return callback(err);
        if (!user) return callback(new Error('Wrong username or password'))
        callback(null, user);
      })
    },

    SignUp: (call, callback) => {
      getUserByUsername(call.request.credential?.username as string, (err, rep) => {
        if (err) return callback(err);
        if (rep) return callback(new Error('Username existed'));
        signUp(call.request, (err, user) => {
          if (err) return callback(err);
          callback(null, user);
        })
      })
    },

    UserStream: (call) => {
      const { username} = call.request;
      console.log('Request user stream from ', username)
      if (!username) return call.end();

      getUserByUsername(username, (err, user) => {
        if (err || !user) return call.end();
        user.status = Status.ONLINE;
        updateUser(user, (err) => {
          if(err) throw err
          getUserList((err, users) => {
            if (err) throw err;
            usernameToUserListStream.set(username as string, call);
            emitUserUpdateEvent(user);
          });
        });

        call.on("cancelled", () => {
          usernameToUserListStream.delete(username)
          user.status = Status.OFFLINE;
          updateUser(user, (err) => {
            if(err) throw err
            emitUserUpdateEvent(user)
          });
        });
      })
    },

    ChatStream: (call) => {
      getUserByUsername(call.request.username as string, (err, rep) => {
        if (err) return call.end();
        const user = rep as User;
        console.log('Request user chat from ', user.username)
        const username = user.username as string;
        updateUser(user, console.error);
        listMessagesFromMainRoom((msgs) => {
          usernameToMsgStream.set(username as string, call);
          for (const msg of msgs) {
            call.write(msg);
          }
        });
        
        call.on("cancelled", () => {
          usernameToMsgStream.delete(username as string);
        });
      });
    },

    SendMessage: (call, callback) => {
      const { username = "", message = "", whisper = "all"} = call.request;
      if (!username) return callback(new Error("not valid id"));
      if (!message) return callback(new Error("no message"));
    
      getUserByUsername(username, (err, rep) => {
        if (err) return callback(null, err);
        const user = rep as User;
        const msg: StreamMessage = {
          id: user.id,
          senderName: user.username,
          senderAvatar: user.avatar,
          message,
          to: whisper
        };
        console.log('Send message', msg)
        addChatToMainRoom(msg, (err) => {
          if (err) callback(null, err);
          emitRoomChatUpdate(user.username as string, msg);
          callback(null);
        });
      });
    },

  } as ChatServiceHandlers);

  return server;
}

function runStreams() {
  listenUserUpdateEvent(() =>
    getUserList((err, users) => {
      if (err) throw err;
      for (const [, stream] of usernameToUserListStream) {        
        stream.write({users} as UserStreamResponse);
      }
    })
  );
  listenRoomChatUpdate((data, channel) => {
    const msg = JSON.parse(data) as StreamMessage;
    for (const [username , stream] of usernameToMsgStream) {      
      if (msg.to === 'all' || username === msg.to || username=== msg.senderName) stream.write(msg);
      // stream.write(msg);
    }
  });
}

main();
