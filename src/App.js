import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './styles/app.style.css';

import NavBarComponent from './components/navbar.component';
import GeoJSONLandExplorer from './components/landPolygonExplorer.component';
import LandInventory from './components/landInventory.component';
import LandBuySuccessOverlay from './components/landBuySuccessOverlay.component';
import SizeDevices from './components/sizeDevices.component';
import WellcomeOverlay from './components/wellcomeOveraly.component';

import { LandsCrowdsaleEventsListener } from './services/web3.service';
import { manageLandEvent } from './actions/lands.actions';
import { selectedLandOverlayStatusAction } from './actions/selectedLand.actions';
import { blockchainConnectAction } from './actions/blockchain.actions';

import Web3 from 'web3';
import { shortWeb3Address } from './helpers/formaters';
import { isBrowser } from 'react-device-detect';

import ReconnectingWebSocket from 'reconnecting-websocket';

import config from './config.json';



const blockchainProviderOptions = {
	timeout: 30000,
	clientConfig: {
		// Useful if requests are large
		maxReceivedFrameSize: 100000000, // bytes - default: 1MiB
		maxReceivedMessageSize: 100000000, // bytes - default: 8MiB
		// Useful to keep a connection alive
		keepalive: true,
		keepaliveInterval: 60000, // ms
	},
	reconnect: {
		auto: true,
		delay: 5000, // in ms
		maxAttemps: 5,
		onTimeout: false,
	},
};

const INITIAL_STATE = {
	isAppLoading: true,
};

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...INITIAL_STATE,
		};

		// this.blockchainProvider = config.chainRpcUrls[0];
		const selectedProvider = Math.floor((Math.random() * config.chainRpcUrls.length));
		this.blockchainProvider = config.chainRpcUrls[selectedProvider];
		this.blockchainWeb3 = new Web3(this.blockchainProvider, blockchainProviderOptions);
		this.eventsListener = new LandsCrowdsaleEventsListener(this.blockchainWeb3, this.onLandCrowdsaleEvent.bind(this));
	}

	extendWeb3Provider(web3) {
		web3.eth.extend({
			methods: [
				{
					name: 'chainId',
					call: 'eth_chainId',
					outputFormatter: web3.utils.hexToNumber,
				},
			],
		});
		return web3;
	}

	getBlockchainProviderData = async (web3) => {
		try {
			const web3extended = this.extendWeb3Provider(web3);
			this.props.blockchainConnectAction({ isProviderConnected: true, provider: this.blockchainProvider, web3: web3extended });
		} catch (error) {
			console.error('[BLOCKCHAIN] error detected while initializing web3 provider ' + error); // tslint:disable-line
			this.props.blockchainConnectAction({ isProviderConnected: false, provider: this.blockchainProvider, web3: null });
		}
	};

	onLandCrowdsaleEvent = async (event) => {
		const owner_address = event.returnValues._buyer;
		const token_id = parseInt(event.returnValues._tokenID);
		// console.log(event);
		console.log('[APP] event (' + shortWeb3Address(owner_address, 4) + ' has buy land ' + token_id + ')');
		
		this.props.manageLandEvent({...event, owner_address, token_id, timestamp: Date.now()});
	};

	onClickCloseSuccessOverlay = () => {
		this.props.selectedLandOverlayStatusAction({ selectedLandShowOverlay: false });
	};


	landsEventsWebsocketClient = async () => {
		var socketPath = 'ws://'
					+ 'localhost:8000' 
					// + window.location.host
					+ '/ws/public/lands/';
		const landsSocket = new ReconnectingWebSocket(socketPath);
		landsSocket.onopen = () => {};
		// console.log("[APP] websocket open");
		landsSocket.onmessage = (event) => {
			var data = JSON.parse(event.data);
			var result = { 
					owner_address: data.owner_address, 
					token_id: parseInt(data.token_id),
					returnValues: {
						_buyer: data.owner_address,
						_tokenID: parseInt(data.token_id),
					} 
				}
			this.onLandCrowdsaleEvent(result);
		};
		landsSocket.onclose = (error) => {
	    // console.error('[APP] Chat socket closed unexpectedly');
		};
	}

	componentDidMount = async () => {
		this.getBlockchainProviderData(this.blockchainWeb3);
		this.setState({ isAppLoading: false });
		if (config.useWebsockets) this.landsEventsWebsocketClient();
	};

	render() {
		const { isAppLoading } = this.state;
		return(
			isBrowser 
			? 
				!isAppLoading && (
					<div className='w-100 d-flex flex-column'>
						<WellcomeOverlay />
						<LandBuySuccessOverlay 
							show={this.props.selectedLandShowOverlay} 
							selectedLand={this.props.selectedLandProperties} 
							onCloseButtonCallback={this.onClickCloseSuccessOverlay}
						/>						
					  <NavBarComponent />
						<Switch>
							<Route exact path={['/', '/map']} component={GeoJSONLandExplorer} />
							<Route exact path={['/inventory']} component={LandInventory} />
						</Switch>
					</div>
				)
			 : 
				<SizeDevices /> 
		)
	}
}

// <LandBuySuccessOverlay open={this.props.selectedLandShowOverlay} land={this.props.selectedLandProperties} />


const mapStateToProps = (state) => {
	return {
		isProviderConnected: state.wallet.isProviderConnected,
		provider: state.wallet.provider,
		web3: state.wallet.web3,
		selectedChainId: state.wallet.selectedChainId,
		selectedNetwork: state.wallet.selectedNetwork,
		selectedAddress: state.wallet.selectedAddress,
		selectedLandShowOverlay: state.land.selectedLandShowOverlay,
		selectedLandProperties: state.land.selectedLandProperties,
	};
};

const mapDispatchToProps = {
	blockchainConnectAction,
	selectedLandOverlayStatusAction,
	manageLandEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
