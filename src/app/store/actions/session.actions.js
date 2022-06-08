import { SESSION_SET_STATUS, SESSION_DISCONNECTED } from "./types";


export const sessionSetStatusAction = (data) => {
  return {
    type: SESSION_SET_STATUS,
    data,
  }
}

export const sessionDisconnectedAction = () => {
  return {
    type: SESSION_DISCONNECTED,
  }
}

