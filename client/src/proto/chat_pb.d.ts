import * as jspb from 'google-protobuf'

import * as google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb';


export class SignUpRequest extends jspb.Message {
  getCredential(): SignInRequest | undefined;
  setCredential(value?: SignInRequest): SignUpRequest;
  hasCredential(): boolean;
  clearCredential(): SignUpRequest;

  getAvatarUrl(): string;
  setAvatarUrl(value: string): SignUpRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignUpRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SignUpRequest): SignUpRequest.AsObject;
  static serializeBinaryToWriter(message: SignUpRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignUpRequest;
  static deserializeBinaryFromReader(message: SignUpRequest, reader: jspb.BinaryReader): SignUpRequest;
}

export namespace SignUpRequest {
  export type AsObject = {
    credential?: SignInRequest.AsObject,
    avatarUrl: string,
  }
}

export class SignInRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): SignInRequest;

  getPassword(): string;
  setPassword(value: string): SignInRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignInRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SignInRequest): SignInRequest.AsObject;
  static serializeBinaryToWriter(message: SignInRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignInRequest;
  static deserializeBinaryFromReader(message: SignInRequest, reader: jspb.BinaryReader): SignInRequest;
}

export namespace SignInRequest {
  export type AsObject = {
    username: string,
    password: string,
  }
}

export class MessageRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): MessageRequest;

  getRoomId(): number;
  setRoomId(value: number): MessageRequest;

  getMessage(): string;
  setMessage(value: string): MessageRequest;

  getWhisper(): string;
  setWhisper(value: string): MessageRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MessageRequest): MessageRequest.AsObject;
  static serializeBinaryToWriter(message: MessageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageRequest;
  static deserializeBinaryFromReader(message: MessageRequest, reader: jspb.BinaryReader): MessageRequest;
}

export namespace MessageRequest {
  export type AsObject = {
    username: string,
    roomId: number,
    message: string,
    whisper: string,
  }
}

export class User extends jspb.Message {
  getId(): number;
  setId(value: number): User;

  getUsername(): string;
  setUsername(value: string): User;

  getStatus(): Status;
  setStatus(value: Status): User;

  getAvatar(): string;
  setAvatar(value: string): User;

  getRoomsIdList(): Array<string>;
  setRoomsIdList(value: Array<string>): User;
  clearRoomsIdList(): User;
  addRoomsId(value: string, index?: number): User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): User.AsObject;
  static toObject(includeInstance: boolean, msg: User): User.AsObject;
  static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): User;
  static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
  export type AsObject = {
    id: number,
    username: string,
    status: Status,
    avatar: string,
    roomsIdList: Array<string>,
  }
}

export class Room extends jspb.Message {
  getId(): number;
  setId(value: number): Room;

  getName(): string;
  setName(value: string): Room;

  getUsersIdList(): Array<string>;
  setUsersIdList(value: Array<string>): Room;
  clearUsersIdList(): Room;
  addUsersId(value: string, index?: number): Room;

  getMessagesList(): Array<StreamMessage>;
  setMessagesList(value: Array<StreamMessage>): Room;
  clearMessagesList(): Room;
  addMessages(value?: StreamMessage, index?: number): StreamMessage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Room.AsObject;
  static toObject(includeInstance: boolean, msg: Room): Room.AsObject;
  static serializeBinaryToWriter(message: Room, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Room;
  static deserializeBinaryFromReader(message: Room, reader: jspb.BinaryReader): Room;
}

export namespace Room {
  export type AsObject = {
    id: number,
    name: string,
    usersIdList: Array<string>,
    messagesList: Array<StreamMessage.AsObject>,
  }
}

export class UserStreamResponse extends jspb.Message {
  getUsersList(): Array<User>;
  setUsersList(value: Array<User>): UserStreamResponse;
  clearUsersList(): UserStreamResponse;
  addUsers(value?: User, index?: number): User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserStreamResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserStreamResponse): UserStreamResponse.AsObject;
  static serializeBinaryToWriter(message: UserStreamResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserStreamResponse;
  static deserializeBinaryFromReader(message: UserStreamResponse, reader: jspb.BinaryReader): UserStreamResponse;
}

export namespace UserStreamResponse {
  export type AsObject = {
    usersList: Array<User.AsObject>,
  }
}

export class StreamRequest extends jspb.Message {
  getUsername(): string;
  setUsername(value: string): StreamRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StreamRequest): StreamRequest.AsObject;
  static serializeBinaryToWriter(message: StreamRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StreamRequest;
  static deserializeBinaryFromReader(message: StreamRequest, reader: jspb.BinaryReader): StreamRequest;
}

export namespace StreamRequest {
  export type AsObject = {
    username: string,
  }
}

export class StreamMessage extends jspb.Message {
  getId(): number;
  setId(value: number): StreamMessage;

  getRoomId(): number;
  setRoomId(value: number): StreamMessage;

  getSenderName(): string;
  setSenderName(value: string): StreamMessage;

  getSenderAvatar(): string;
  setSenderAvatar(value: string): StreamMessage;

  getMessage(): string;
  setMessage(value: string): StreamMessage;

  getTo(): string;
  setTo(value: string): StreamMessage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamMessage.AsObject;
  static toObject(includeInstance: boolean, msg: StreamMessage): StreamMessage.AsObject;
  static serializeBinaryToWriter(message: StreamMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StreamMessage;
  static deserializeBinaryFromReader(message: StreamMessage, reader: jspb.BinaryReader): StreamMessage;
}

export namespace StreamMessage {
  export type AsObject = {
    id: number,
    roomId: number,
    senderName: string,
    senderAvatar: string,
    message: string,
    to: string,
  }
}

export enum Status { 
  UNKOWN = 0,
  ONLINE = 1,
  OFFLINE = 2,
}
