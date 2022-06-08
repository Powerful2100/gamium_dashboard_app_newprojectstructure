import { React, useState, useEffect } from 'react';
import { PortfolioContext } from './portfolioContext';

const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState({});

  const fetchPortfolioData = () => {};

  useEffect(() => {
      fetchPortfolioData();
  });

  const contextValue = {
    portfolio,
    setPortfolio,
  }; 

  return (
    <PortfolioContext.Provider
      value={ contextValue }
    >
      { children }
    </PortfolioContext.Provider>
  );
};

export default PortfolioProvider;
