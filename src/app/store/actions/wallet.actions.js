import { WALLET_CONNECT, WALLET_CHANGE, WALLET_BALANCE, WALLET_RESET } from "./types";


export const walletConnectAction = (data) => {
  return {
    type: WALLET_CONNECT,
    data,
  }
}

export const walletChangeAction = (data) => {
  return {
    type: WALLET_CHANGE,
    data,
  }
}

export const walletBalanceAction = (data) => {
  return {
    type: WALLET_BALANCE,
    data,
  }
}

export const walletResetAction = () => {
  return {
    type: WALLET_RESET
  }
}
