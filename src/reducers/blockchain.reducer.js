import { BLOCKCHAIN_CONNECT, BLOCKCHAIN_RESET } from "../actions/types";

const initialState = {
  isProviderConnected: false,
  provider: null,
  web3: null, 
};

// Changes are made with pure functions (https://redux.js.org/understanding/thinking-in-redux/three-principles#changes-are-made-with-pure-functions)

function blockchainReducer(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case BLOCKCHAIN_CONNECT:
      // console.log(data);
      return { 
        ...state,
        isProviderConnected: data.isProviderConnected,
        provider: data.provider,
        web3: data.web3,
      }
    case BLOCKCHAIN_RESET:
      // console.log(data);
      return { 
        ...state,
        ...initialState
      }
    default:
      return state;
  }
};

export default blockchainReducer;

