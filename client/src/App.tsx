import React, { useEffect, useState } from "react";
import "./App.css";
import { ChatServiceClient } from "./proto/ChatServiceClientPb";
import {
  StreamRequest,
  SignInRequest,
  StreamMessage,
  UserStreamResponse,
  User,
  MessageRequest,
  SignUpRequest,
} from "./proto/chat_pb";
import Chat from "./components/Chat";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

export const client = new ChatServiceClient("http://localhost:8080");

export type Session = { id: number; username: string; avatar: string };

const style: { [key: string]: React.CSSProperties } = {
  greeting: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
};

function App() {
  const [user, setUser] = useState<Session>();
  const [messages, setMessages] = useState<Array<StreamMessage.AsObject>>([]);
  const [userList, setUserList] = useState<Array<User.AsObject>>([]);

  const handleUserSignIn = (username: string, password: string) => {
    const signInReq = new SignInRequest();
    signInReq.setUsername(username);
    signInReq.setPassword(password);

    client.signIn(signInReq, {}, (err, resp) => {
      if (err) throw err;
      const id = resp.getId();
      const avatar = resp.getAvatar();
      setUser({ id, username, avatar });
    });
  };

  const handleUserSignUp = (username: string, password: string, avatar: string) => {
    const signUpReq = new SignUpRequest();
    const credential = new SignInRequest();
    credential.setUsername(username);
    credential.setPassword(password);
    signUpReq.setCredential(credential);
    signUpReq.setAvatarUrl(avatar);

    client.signUp(signUpReq, {}, (err, resp) => {
      if (err) throw err;

      const id = resp.getId();
      const avatar = resp.getAvatar();
      setUser({ id, username, avatar });
    });
  };

  const handleSendMessage = (msg: string, onSuccess: () => void) => {
    if (!user) return;
    const req = new MessageRequest();
    req.setUsername(user.username);
    req.setMessage(msg);
    req.setWhisper("all");
    client.sendMessage(req, {}, (err, resp) => {
      if (err) throw err;
      onSuccess();
    });
  };

  const handleSendPrivateMessage = (msg: string, to: string, onSuccess: () => void) => {
    if (!user) return;
    const req = new MessageRequest();
    req.setUsername(user.username);
    req.setMessage(msg);
    req.setWhisper(to);    
    client.sendMessage(req, {}, (err, resp) => {
      if (err) throw err;
      onSuccess();
    });
  }

  useEffect(() => {
    if (!user) return;
    
    const chatReq = new StreamRequest();
    chatReq.setUsername(user.username);

    (() => {
      const userListStream = client.userStream(chatReq);
      userListStream.on("data", (chunk) => {
        const { usersList } = (chunk as UserStreamResponse).toObject();
        console.log(usersList);
        setUserList(usersList);
      });
    })();

    (() => {
      const chatStream = client.chatStream(chatReq);
      chatStream.on("data", (chunk) => {
        const msg = (chunk as StreamMessage).toObject();
        console.log(msg);
        setMessages((prev) => [...prev, msg]);
      });
    })();
  }, [user]);

  return (
    <div className="App">
      {user ? (
        <Chat
          user={user}
          userList={userList}
          messages={messages}
          onMessageSubmit={handleSendMessage}
          onPrivateMessageSubmit={handleSendPrivateMessage}
        />
      ) : (
        <div style={style.greeting}>
          <SignIn onUserSubmit={handleUserSignIn} />
          <SignUp onUserSubmit={handleUserSignUp} />
        </div>
      )}
    </div>
  );
}

export default App;
