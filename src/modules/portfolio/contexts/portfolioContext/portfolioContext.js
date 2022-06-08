import { createContext } from 'modules/common/utils/context';

const CONTEXT_NAME = 'Portfolio';

const defaultState = {
  portfolio: undefined,
  setPortfolio: () => {},
};

const { Context: PortfolioContext, useContext: usePortfolioContext } = createContext(CONTEXT_NAME, defaultState);

export default usePortfolioContext;
export {
    PortfolioContext,
};
