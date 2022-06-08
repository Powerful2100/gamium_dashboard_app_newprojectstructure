import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Switch, Route } from 'react-router-dom';

import 'styles/base.css';

import NavBar from '../components/Navbar/Navbar';

import { blockchainConnectAction } from '../store/actions/blockchain.actions';

import Web3 from 'web3';
import { isBrowser } from 'react-device-detect';

import config from '../config/config.json';
import PortfolioPage from '../../modules/portfolio/pages/PortfolioPage/PortfolioPage';
import MenuComponent from '../components/standard/standardMenu.component';



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
	isMenuOpened: false,
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

	componentDidMount = async () => {
		this.getBlockchainProviderData(this.blockchainWeb3);
		this.setState({ isAppLoading: false });
	};

	callbackOpenMenu = (param) => {
		this.setState({ isMenuOpened: param });
	}

	render() {
		const { isAppLoading, isMenuOpened } = this.state;

		return(
			isBrowser 
			? 
				!isAppLoading && (
					<div className='w-100 d-flex flex-column'>		
					  <NavBar isMenuOpened={ isMenuOpened } callbackOpenMenu={ this.callbackOpenMenu }/>
					  	<MenuComponent openMenu={ isMenuOpened } callbackOpenMenu={ this.callbackOpenMenu } />
						<Switch>
							<Route exact path={['/', '/portfolio']} component={ PortfolioPage } />
						</Switch>
					</div>
				)
			 : 
				<div /> 
		)
	}
}


const mapStateToProps = (state) => {
	return {
		isProviderConnected: state.wallet.isProviderConnected,
		provider: state.wallet.provider,
		web3: state.wallet.web3,
		selectedChainId: state.wallet.selectedChainId,
		selectedNetwork: state.wallet.selectedNetwork,
		selectedAddress: state.wallet.selectedAddress,
	};
};

const mapDispatchToProps = {
	blockchainConnectAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
