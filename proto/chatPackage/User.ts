// Original file: proto/chat.proto

import type { Status as _chatPackage_Status } from '../chatPackage/Status';

export interface User {
  'id'?: (number);
  'username'?: (string);
  'status'?: (_chatPackage_Status | keyof typeof _chatPackage_Status);
  'avatar'?: (string);
  'roomsId'?: (string)[];
}

export interface User__Output {
  'id'?: (number);
  'username'?: (string);
  'status'?: (_chatPackage_Status);
  'avatar'?: (string);
  'roomsId'?: (string)[];
}
