// Original file: proto/chat.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from '../google/protobuf/Empty';
import type { MessageRequest as _chatPackage_MessageRequest, MessageRequest__Output as _chatPackage_MessageRequest__Output } from '../chatPackage/MessageRequest';
import type { SignInRequest as _chatPackage_SignInRequest, SignInRequest__Output as _chatPackage_SignInRequest__Output } from '../chatPackage/SignInRequest';
import type { SignUpRequest as _chatPackage_SignUpRequest, SignUpRequest__Output as _chatPackage_SignUpRequest__Output } from '../chatPackage/SignUpRequest';
import type { StreamMessage as _chatPackage_StreamMessage, StreamMessage__Output as _chatPackage_StreamMessage__Output } from '../chatPackage/StreamMessage';
import type { StreamRequest as _chatPackage_StreamRequest, StreamRequest__Output as _chatPackage_StreamRequest__Output } from '../chatPackage/StreamRequest';
import type { User as _chatPackage_User, User__Output as _chatPackage_User__Output } from '../chatPackage/User';
import type { UserStreamResponse as _chatPackage_UserStreamResponse, UserStreamResponse__Output as _chatPackage_UserStreamResponse__Output } from '../chatPackage/UserStreamResponse';

export interface ChatServiceClient extends grpc.Client {
  ChatStream(argument: _chatPackage_StreamRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_StreamMessage__Output>;
  ChatStream(argument: _chatPackage_StreamRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_StreamMessage__Output>;
  chatStream(argument: _chatPackage_StreamRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_StreamMessage__Output>;
  chatStream(argument: _chatPackage_StreamRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_StreamMessage__Output>;
  
  SendMessage(argument: _chatPackage_MessageRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  SendMessage(argument: _chatPackage_MessageRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  SendMessage(argument: _chatPackage_MessageRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  SendMessage(argument: _chatPackage_MessageRequest, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  sendMessage(argument: _chatPackage_MessageRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  sendMessage(argument: _chatPackage_MessageRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  sendMessage(argument: _chatPackage_MessageRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  sendMessage(argument: _chatPackage_MessageRequest, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  
  SignIn(argument: _chatPackage_SignInRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_User__Output>): grpc.ClientUnaryCall;
  SignIn(argument: _chatPackage_SignInRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chatPackage_User__Output>): grpc.ClientUnaryCall;
  SignIn(argument: _chatPackage_SignInRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_User__Output>): grpc.ClientUnaryCall;
  SignIn(argument: _chatPackage_SignInRequest, callback: grpc.requestCallback<_chatPackage_User__Output>): grpc.ClientUnaryCall;
  signIn(argument: _chatPackage_SignInRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_User__Output>): grpc.ClientUnaryCall;
  signIn(argument: _chatPackage_SignInRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chatPackage_User__Output>): grpc.ClientUnaryCall;
  signIn(argument: _chatPackage_SignInRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_User__Output>): grpc.ClientUnaryCall;
  signIn(argument: _chatPackage_SignInRequest, callback: grpc.requestCallback<_chatPackage_User__Output>): grpc.ClientUnaryCall;
  
  SignUp(argument: _chatPackage_SignUpRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_User__Output>): grpc.ClientUnaryCall;
  SignUp(argument: _chatPackage_SignUpRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chatPackage_User__Output>): grpc.ClientUnaryCall;
  SignUp(argument: _chatPackage_SignUpRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_User__Output>): grpc.ClientUnaryCall;
  SignUp(argument: _chatPackage_SignUpRequest, callback: grpc.requestCallback<_chatPackage_User__Output>): grpc.ClientUnaryCall;
  signUp(argument: _chatPackage_SignUpRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_User__Output>): grpc.ClientUnaryCall;
  signUp(argument: _chatPackage_SignUpRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chatPackage_User__Output>): grpc.ClientUnaryCall;
  signUp(argument: _chatPackage_SignUpRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chatPackage_User__Output>): grpc.ClientUnaryCall;
  signUp(argument: _chatPackage_SignUpRequest, callback: grpc.requestCallback<_chatPackage_User__Output>): grpc.ClientUnaryCall;
  
  UserStream(argument: _chatPackage_StreamRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_UserStreamResponse__Output>;
  UserStream(argument: _chatPackage_StreamRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_UserStreamResponse__Output>;
  userStream(argument: _chatPackage_StreamRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_UserStreamResponse__Output>;
  userStream(argument: _chatPackage_StreamRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_chatPackage_UserStreamResponse__Output>;
  
}

export interface ChatServiceHandlers extends grpc.UntypedServiceImplementation {
  ChatStream: grpc.handleServerStreamingCall<_chatPackage_StreamRequest__Output, _chatPackage_StreamMessage>;
  
  SendMessage: grpc.handleUnaryCall<_chatPackage_MessageRequest__Output, _google_protobuf_Empty>;
  
  SignIn: grpc.handleUnaryCall<_chatPackage_SignInRequest__Output, _chatPackage_User>;
  
  SignUp: grpc.handleUnaryCall<_chatPackage_SignUpRequest__Output, _chatPackage_User>;
  
  UserStream: grpc.handleServerStreamingCall<_chatPackage_StreamRequest__Output, _chatPackage_UserStreamResponse>;
  
}

export interface ChatServiceDefinition extends grpc.ServiceDefinition {
  ChatStream: MethodDefinition<_chatPackage_StreamRequest, _chatPackage_StreamMessage, _chatPackage_StreamRequest__Output, _chatPackage_StreamMessage__Output>
  SendMessage: MethodDefinition<_chatPackage_MessageRequest, _google_protobuf_Empty, _chatPackage_MessageRequest__Output, _google_protobuf_Empty__Output>
  SignIn: MethodDefinition<_chatPackage_SignInRequest, _chatPackage_User, _chatPackage_SignInRequest__Output, _chatPackage_User__Output>
  SignUp: MethodDefinition<_chatPackage_SignUpRequest, _chatPackage_User, _chatPackage_SignUpRequest__Output, _chatPackage_User__Output>
  UserStream: MethodDefinition<_chatPackage_StreamRequest, _chatPackage_UserStreamResponse, _chatPackage_StreamRequest__Output, _chatPackage_UserStreamResponse__Output>
}
