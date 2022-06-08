import { combineReducers } from "redux";

import walletReducer from "./wallet.reducer";
import sessionReducer from "./session.reducer";
import blockchainReducer from "./blockchain.reducer";


export default combineReducers({
  wallet: walletReducer,
  session: sessionReducer,
  blockchain: blockchainReducer,
});
