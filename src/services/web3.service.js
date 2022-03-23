import Web3 from 'web3';

import { toWei, fromWei, toChecksumAddress } from "web3-utils";
import lands_contract_abi from "../abi/lands_abi.json"

import config from '../config.json';

export class LandsCrowdsaleEventsListener {

  options = {
    timeout: 30000, 
    clientConfig: {
      // Useful if requests are large
      maxReceivedFrameSize: 100000000,   // bytes - default: 1MiB
      maxReceivedMessageSize: 100000000, // bytes - default: 8MiB
      // Useful to keep a connection alive
      keepalive: true,
      keepaliveInterval: 60000 // ms
    },
    reconnect: {
        auto: true,
        delay: 5000, // in ms
        maxAttemps: 5,
        onTimeout: false,
    }
  };

  constructor(web3, onBuyEventCallback = null) {
    this.web3internal = web3;
    this.onBuyEventCallback = (onBuyEventCallback !== null ? onBuyEventCallback : this.defaultOnBuyEventCallback).bind(this);
    // this.onBuyEventCallback = this.onBuyEventCallback.bind(this);
    this.listenToBuyEvents();
  };

  defaultOnBuyEventCallback = async () => {
    // Do nothin
  };

  listenToBuyEvents() {
    const lands_crowdsale_contract= new this.web3internal.eth.Contract(lands_contract_abi, config.contractAddress);   
		let that = this;
    lands_crowdsale_contract.events.LANDBought({})
      .on("connected", async function(subscriptionId){
        // console.log(subscriptionId);
      })
      .on('data', async function(event){
        // console.log(event); // same results as the optional callback above
        if (this.onBuyEventCallback !== null) {
          that.onBuyEventCallback(event);
        }
      })
      .on('changed', async function(event){
        // remove event from local database
      })
      .on('error', async function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        console.log(receipt)
      });
  };
}
