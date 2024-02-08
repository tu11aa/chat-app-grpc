import redis, { ReplyError } from "redis";
import NRP from "node-redis-pubsub";
import { StreamMessage } from "./proto/chatPackage/StreamMessage";
import { User } from "./proto/chatPackage/User";
import { Status } from "./proto/chatPackage/Status";
import { SignUpRequest } from './proto/chatPackage/SignUpRequest'
import { SignInRequest } from "./proto/chatPackage/SignInRequest";
import { Room } from './proto/chatPackage/Room'
import { credentials } from "@grpc/grpc-js";

const REDIST_KEYS = {
  broadcastRoom: 'rooms:broadcast',
  rooms: "rooms",
  users: "users",
  credentials: 'credentias',
};

const initiateUser = (id: number, username: string, avataUrl: string = "") => ({
  id,
  username,
  status : Status.OFFLINE,
  avataUrl,
  roomsId: [REDIST_KEYS.broadcastRoom]
} as User)

const initiateRoom = (id: number, usersId: Array<string>) => ({
  id,
  name: '',
  usersId,
  messages: []
} as Room)

const client = redis.createClient();

client.on("error", console.error);
client.on("connect", console.log);
type errCB = (err: Error | null) => void;
type replyCB<T> = (err: Error | null, reply: T | null) => void;

// export const findUserById(username:string, cb: replyCB<number>){
//   client.exists(REDIST_KEYS.users.concat(':', username), ())
// }

const getKey = (prefix: string, key: string) => prefix.concat(':', key)

export const createIdOfKey = (key: string) => {
  var result = 0;
  
  client.lindex(key, -1, (err, rep) => {
    if (rep !== null) {
      const credential = JSON.parse(rep) as SignInRequest;
      getUserByUsername(credential.username as string, (err, rep) => {
        console.log(rep)
        return (rep?.id as number ) + 1
      })
    }
  })

  return result;
}

export const getUserByUsername = (username: string, cb: replyCB<User>) => {
  const key = getKey(REDIST_KEYS.users, username);
  client.get(key, (err, rep) => {
    if (err) return cb(err, null);
    cb(null, JSON.parse(rep as string) as User)
  })
}

export const getUserById = (id: number, cb: replyCB<User>) => {
  client.lindex(REDIST_KEYS.credentials, id, (err, rep) => {
    if (err) return cb(err, null);
    if (rep === null) return cb(null, null);
    return cb(null, JSON.stringify(rep) as User);
  })
}

export const signUp = (credential: SignUpRequest, cb: replyCB<User>) => {
  client.rpush(
    REDIST_KEYS.credentials, 
    JSON.stringify(credential.credential),
    (err, id) => {
      if (err) return cb(err, null)
      const username = credential.credential?.username as string;
      const {avatarUrl} = credential
      const user = initiateUser(id - 1, username, avatarUrl)

      client.set(
        getKey(REDIST_KEYS.users, username),
        JSON.stringify(user),
        (err) => {
          if (err) {
            client.rpop(REDIST_KEYS.credentials, (err) => console.error);
            return cb(err, null);
          }
          cb(null, user);
        }
      )
    }
  )
}

export const signIn = (credential: SignInRequest, cb: replyCB<User>) => {
  getUserByUsername(credential.username as string, (err, user) => {
    if (err) return cb(err, null);
    if (user === null) return cb(null, null);
    
    client.lindex(REDIST_KEYS.credentials, user.id as number, (err, rep) => {
      if (err) return cb(err, null);
      if (rep === null) return cb(null, null);
      const server_credential = JSON.parse(rep) as SignInRequest
      if (server_credential.password === credential.password) return cb(null, user);
      return cb(null, null);
    })
  })
}

export const updateUser = (user: User, cb: errCB) => {
  client.set(getKey(REDIST_KEYS.users, user.username as string), JSON.stringify(user), cb);
}

export const listMessagesFromMainRoom = (
  done?: (data: Array<StreamMessage>) => void
) => {
  client.lrange(REDIST_KEYS.rooms, 0, -1, (err, reply) => {
    const msgs: Array<StreamMessage> = [];
    for (const res of reply) {
      msgs.push(JSON.parse(res));
    }
    done && done(msgs);
  });
};
export const addChatToMainRoom = (msg: StreamMessage, fn: errCB) => {
  client.rpush(REDIST_KEYS.broadcastRoom, JSON.stringify(msg), fn);
};

export const addUser = (user: User, fn: errCB) => {
  client.rpush(REDIST_KEYS.users, JSON.stringify(user), fn);
};

export const getUserList = (cb: replyCB<Array<User>>) => {
  client.lrange(REDIST_KEYS.credentials, 0, -1, (err, reply) => {
    if (err) return cb(err, []);

    let users: Array<User> = [];
    for (let i = 0; i < reply.length; i++) {

      client.get(getKey(REDIST_KEYS.users, JSON.parse(reply[i]).username as string), (err, user) => {
        if (err) return cb(err, []);
        users.push(JSON.parse(user as string) as User);
        if (i === reply.length - 1) return cb(null, users)
      });
    };
  });
};

export default client;
export const nrp = NRP({
  emitter: redis.createClient(),
  receiver: redis.createClient(),
});