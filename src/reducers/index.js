import { combineReducers } from "redux";

import walletReducer from "./wallet.reducer";
import blockchainReducer from "./blockchain.reducer";


export default combineReducers({
  wallet: walletReducer,
  blockchain: blockchainReducer,
});
