import useSWR from 'swr';

import portfolioApiService from '../services/api/portfolioService';

const PORTFOLIO_REFRESH_INTERVAL = 60000; // 1 min

const usePortfolio = (chainId, address) => {

    // Cache key: complete url path
    const cacheKey = portfolioApiService.constructor.paths.portfolio(chainId, address);

    // Fetcher: service request
    const fetchPortfolio = (_key, _chainId, _address) => portfolioApiService.getPortfolio(_chainId, _address);
    
    // Fetching flag
    const shouldFetch = !!chainId && !!address;

    // Request hook
    const result = useSWR(
        shouldFetch && [cacheKey, chainId, address],
        fetchPortfolio,
        { 
            refreshInterval: PORTFOLIO_REFRESH_INTERVAL,
        }
    );

    // Final data
    const portfolio = result?.data?.data || {};

    // Loading flag
    const loading = shouldFetch && !result.error && !result?.data;

    return {
    ...result,
    portfolio,
    fetchPortfolio: result.mutate,
    loading,
    };
};

export default usePortfolio;
