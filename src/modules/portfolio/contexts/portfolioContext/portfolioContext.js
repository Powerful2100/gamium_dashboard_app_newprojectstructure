import { createContext } from 'modules/common/utils/context';

const CONTEXT_NAME = 'Portfolio';

const defaultState = {
  chainId: undefined,
  address: undefined,
  portfolio: undefined,
  error: undefined,
  loading: false,
  setChainId: () => {},
  setAddress: () => {},
  fetchPortfolio: () => {},
};

const { Context: PortfolioContext, useContext: usePortfolioContext } = createContext(CONTEXT_NAME, defaultState);

export default usePortfolioContext;
export {
    PortfolioContext,
};
