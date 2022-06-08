import { WALLET_CONNECT, WALLET_CHANGE, WALLET_BALANCE, WALLET_RESET } from "../actions/types";

const initialState = {
  isProviderConnected: false,
  provider: null,
  providerLogo: null,
  providerName: null, 
  web3: null, 
  selectedChainId: null,
  selectedNetwork: null,
  selectedAddress: null,
  selectedAddressEthBalance: null,
  isAddressWhitelisted: false,
};

// Changes are made with pure functions (https://redux.js.org/understanding/thinking-in-redux/three-principles#changes-are-made-with-pure-functions)

function walletReducer(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case WALLET_CONNECT:
      return { 
        ...state,
        isProviderConnected: data.isProviderConnected,
        provider: data.provider,
        providerName: data.providerName,
        providerLogo: data.providerLogo,
        web3: data.web3,
      }
    case WALLET_CHANGE:
      return { 
        ...state,
        selectedChainId: data.selectedChainId,
        selectedNetwork: data.selectedNetwork,
        selectedAddress: data.selectedAddress,
        isAddressWhitelisted: data.isAddressWhitelisted,
      }
    case WALLET_BALANCE:
      return { 
        ...state,
        selectedAddressEthBalance: data.selectedAddressEthBalance,
      }
    case WALLET_RESET:
      return { 
        initialState
      }
    default:
      return state;
  }
};

export default walletReducer;

