// Original file: proto/chat.proto

import type { StreamMessage as _chatPackage_StreamMessage, StreamMessage__Output as _chatPackage_StreamMessage__Output } from '../chatPackage/StreamMessage';

export interface Room {
  'id'?: (number);
  'name'?: (string);
  'usersId'?: (string)[];
  'messages'?: (_chatPackage_StreamMessage)[];
}

export interface Room__Output {
  'id'?: (number);
  'name'?: (string);
  'usersId'?: (string)[];
  'messages'?: (_chatPackage_StreamMessage__Output)[];
}
