import http from "base/http-common";

class PortfolioApiService {

    static namespaces = {
        dashboard: 'dashboard',
    }

    static paths = {
      portfolio: (chain, address) => `/${PortfolioApiService.namespaces.dashboard}/${chain}/address/${address}/portfolio_summary/ALL`,
    }

    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    getPortfolio = async (chain, address) => this.httpClient.get(PortfolioApiService.paths.portfolio(chain, address));

    createPortfolio = async (chain, address, portfolio) => this.httpClient.post(
        PortfolioApiService.paths.portfolio(chain, address), 
        { portfolio }
    );
}

const portfolioApiService = new PortfolioApiService(http);

export default portfolioApiService;
export {
    PortfolioApiService,
};
