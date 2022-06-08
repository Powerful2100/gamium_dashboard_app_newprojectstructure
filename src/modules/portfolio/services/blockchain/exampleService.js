import http from "base/http-common";
import LandsAbi from 'abi/lands_abi.json';


class ExampleBlockchainService {

    constructor(
        web3,
        chainId,
      ) {
        this.web3 = web3;
        this.chainId = chainId;
  
        const networkData = LandsAbi.networks[String(chainId)];
  
        this.contract = new this.web3.eth.Contract(LandsAbi.abi, networkData?.address);
      }

    getExample = async (address) => this.basketsContract.methods.getExample(address).call()
}

const exampleBlockchainService = new ExampleBlockchainService();

export default exampleBlockchainService;
export {
    ExampleBlockchainService,
};
