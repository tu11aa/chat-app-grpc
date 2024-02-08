// Original file: proto/chat.proto


export interface StreamMessage {
  'id'?: (number);
  'roomId'?: (number);
  'senderName'?: (string);
  'senderAvatar'?: (string);
  'message'?: (string);
  'to'?: (string);
}

export interface StreamMessage__Output {
  'id'?: (number);
  'roomId'?: (number);
  'senderName'?: (string);
  'senderAvatar'?: (string);
  'message'?: (string);
  'to'?: (string);
}
