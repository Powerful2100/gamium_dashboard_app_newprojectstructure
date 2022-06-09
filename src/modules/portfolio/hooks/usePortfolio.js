import { useMemo } from'react';
import useSWR from 'swr';
import { PortfolioModel } from '../models';

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

    // Process and model final data
    const portfolio = useMemo(() => {
        const data = result?.data?.data;
        if (!data) return undefined;

        return new PortfolioModel({
            chainId: data.chain_id,
            walletData: data.wallet_data,
            protocolData: data.protocol_data,
            totalAssets: data.total_assets,
            totalDebts: data.total_debts,
            totalRewards: data.total_rewards,
            totalNetWorth: data.total_net_worth,
        });
    }, [result?.data?.data]);

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
