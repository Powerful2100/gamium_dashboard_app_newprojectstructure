import { BLOCKCHAIN_CONNECT, BLOCKCHAIN_RESET } from "./types";


export const blockchainConnectAction = (data) => {
  return {
    type: BLOCKCHAIN_CONNECT,
    data,
  }
}

export const blockchainResetAction = () => {
  return {
    type: BLOCKCHAIN_RESET
  }
}

