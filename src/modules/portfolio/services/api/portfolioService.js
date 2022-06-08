import http from "base/http-common";

class PortfolioApiService {

    static basePath = '';

    static paths = {
      portfolio: (chain, address) => `${PortfolioApiService.basePath}/portfolio/${chain}/${address}`,
    }

    getPortfolio = async (chain, address) => http.get(PortfolioApiService.paths.portfolio(chain, address));

    createPortfolio = async (chain, address, portfolio) => http.post(
        PortfolioApiService.paths.portfolio(chain, address), 
        { portfolio }
    );
}

const portfolioApiService = new PortfolioApiService();

export default portfolioApiService;
export {
    PortfolioApiService,
};
