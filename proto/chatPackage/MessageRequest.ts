// Original file: proto/chat.proto


export interface MessageRequest {
  'username'?: (string);
  'roomId'?: (number);
  'message'?: (string);
  'whisper'?: (string);
}

export interface MessageRequest__Output {
  'username'?: (string);
  'roomId'?: (number);
  'message'?: (string);
  'whisper'?: (string);
}
