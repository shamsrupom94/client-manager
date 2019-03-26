import { NOTIFY_USERS } from "./types";

export const notifyUser = (message, messageType) => {
  return {
    type: NOTIFY_USERS,
    message,
    messageType
  };
};
