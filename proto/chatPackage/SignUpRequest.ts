// Original file: proto/chat.proto

import type { SignInRequest as _chatPackage_SignInRequest, SignInRequest__Output as _chatPackage_SignInRequest__Output } from '../chatPackage/SignInRequest';

export interface SignUpRequest {
  'credential'?: (_chatPackage_SignInRequest | null);
  'avatarUrl'?: (string);
}

export interface SignUpRequest__Output {
  'credential'?: (_chatPackage_SignInRequest__Output);
  'avatarUrl'?: (string);
}
