import { nrp } from "./data";
import { StreamMessage } from "./proto/chatPackage/StreamMessage";
import { User } from "./proto/chatPackage/User";

const REDIS_CHANNELS = {
  mainRoom: "MAIN_ROOM",
  userChange: "USER_CHAHNGE",
};

const emitRoomChatUpdate = (username: string, msg: StreamMessage) =>
  nrp.emit(REDIS_CHANNELS.mainRoom, JSON.stringify(msg));

const listenRoomChatUpdate = (
  fn: (data: string, channel: string) => void
) => nrp.on(REDIS_CHANNELS.mainRoom, fn);

const emitUserUpdateEvent = (user: User) =>
  nrp.emit(REDIS_CHANNELS.userChange, JSON.stringify(user));

const listenUserUpdateEvent = (fn: (data: string, channel: string) => void) =>
  nrp.on(REDIS_CHANNELS.userChange, fn);

export {
  emitRoomChatUpdate,
  listenRoomChatUpdate,
  emitUserUpdateEvent,
  listenUserUpdateEvent,
};
