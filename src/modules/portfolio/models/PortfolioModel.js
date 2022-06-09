class PortfolioModel {
    constructor({
        chainId,
        walletData,
        protocolData,
        totalAssets,
        totalDebts = null,
        totalRewards = null,
        totalNetWorth = null,
    }) {
        this.chainId = chainId;
        this.walletData = walletData;
        this.protocolData = protocolData;
        this.totalAssets = totalAssets || 0;
        this.totalDebts = totalDebts || 0;
        this.totalRewards = totalRewards || 0;
        this.totalNetWorth = totalNetWorth || 0;
    }
}

export default PortfolioModel;
