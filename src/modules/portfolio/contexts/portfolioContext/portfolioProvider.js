import React, { useState } from 'react';
import { usePortfolio } from '../../hooks';
import { PortfolioContext } from './portfolioContext';

const PortfolioProvider = ({ children }) => {
  const [chainId, setChainId] = useState(undefined);
  const [address, setAddress] = useState('');
  const { portfolio, error, loading, fetchPortfolio } = usePortfolio(chainId, address);

  console.log(process.env);
  
  const contextValue = {
    chainId,
    address,
    portfolio,
    error,
    loading,
    setChainId,
    setAddress,
    fetchPortfolio,
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
