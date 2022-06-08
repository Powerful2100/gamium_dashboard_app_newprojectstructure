import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { toChecksumAddress, numberToHex } from "web3-utils";
import { getChainData } from 'utils/utilities';
import { walletConnectAction, walletChangeAction, walletBalanceAction, walletResetAction } from '../../store/actions/wallet.actions';
import Web3Modal, { getInjectedProvider, getInjectedProviderName, verifyInjectedProvider, checkInjectedProviders, getProviderInfo } from 'web3modal';

import MetamaskLogo from '../../logos/metamask.svg';
import MetaMaskOnboarding from '@metamask/onboarding';
import WalletConnectProvider from "@walletconnect/web3-provider";
import Torus from '@toruslabs/torus-embed';
import WalletLink from 'walletlink';
import Web3 from 'web3';

import config from '../../config.json';
import CustomModal from '../standard/standardModal.component';


const INITIAL_STATE = {
	// isProviderConnected: false,
	// provider: null,
	// providerName: null,
	// providerLogo: MetamaskLogo,
	// web3: null,
	// selectedChainId: 1,
	// selectedNetwork: 1,
	// selectedAddress: null,
	// selectedAddressEthBalance: null,
	isThisComponentLoading: true,

	modal: {
		show: false,
		showLoading: false,
		title: null,
		showDismissButton: false,
		callbackOnDismissButton: () => null,
		showCloseButton: false,
		closeButtonText: null,
		callbackOnCloseButton: () => null,
		text: null,
	},
};


function initWeb3(provider) {
	const web3 = new Web3(provider);
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


async function getWalletAccounts(provider) {
	return provider // usually window.ethereum
			.request({ method: 'eth_requestAccounts' })
			.then(function (accounts) {
				console.log("[DEBUG] accounts: " + accounts);
				return accounts;
			})
			.catch((error) => {
				// Some unexpected error.
				// For backwards compatibility reasons, if no accounts are available,
				// eth_accounts will return an empty array.
				console.error('[WALLET] error detected while accesing provider ' + error);
			});
}


async function getSelectedAddress(provider) {
	const providerInfo = getProviderInfo(provider); // TODO: Web3Modal Error
	console.log("[DEBUG] provider id is " + providerInfo.id);
	var selectedAddress = null;
	try {
		if (providerInfo.id === "injected") selectedAddress = toChecksumAddress(provider.selectedAddress);
		if (providerInfo.id === "walletlink") selectedAddress = toChecksumAddress(provider.selectedAddress);
		if (providerInfo.id === "walletconnect") selectedAddress = toChecksumAddress(provider.accounts[0]);
		if (providerInfo.id === "binancechainwallet") {
			const presentAccounts = await getWalletAccounts(provider);
			selectedAddress = toChecksumAddress(presentAccounts[0])
		}
	} catch (error) {
		// console.error(error); // tslint:disable-line
	}
	return selectedAddress;
}


class WalletConnectButton extends Component {
	_isMounted = false;

	constructor(props) {
		super(props);
		this.state = {
			...INITIAL_STATE,
		};

		var customProviderOptions = {};
		// This is a trick to "inject" a custom option for Metamask to be installed is no injected provider is present
		// TODO: Check is Binance Wallet is also present or not, and make it an installing option
		if (getInjectedProvider() === null) {
			customProviderOptions = {
				'custom-injected': {
					display: {
						logo: MetamaskLogo,
						name: 'Metamask',
						description: 'Install Metamask Wallet extension',
					},
					package: Torus,
					connector: async (ProviderPackage, options) => {
						const onboarding = new MetaMaskOnboarding();
						onboarding.startOnboarding();
						return null;
					},
				},
			};
		}

		this.providerOptions = {
			walletlink: {
				package: WalletLink,
				options: {
					appName: 'GAMIUM',
					// infuraId = process.env.REACT_APP_INFURA_ID,
					rpc: {
						1: 'https://nd-863-734-578.p2pify.com/9e8249567528ca2f8ddd003d646c4463',
						3: 'https://nd-624-721-704.p2pify.com/294434fc760889347fa915ba56b61cd8',
						56: 'https://nd-873-525-166.p2pify.com/45ef6adb4f713cb88f6f2bf5a2d8c252',
						97: 'https://nd-472-585-582.p2pify.com/8868f9c2a7ab8721c787b62ea6ee86db',
					},
					// chainId: config.chainId, // or 1
					darkMode: true,
				},
			},
			// binancechainwallet: {
			// 	package: true
			// },
			// walletconnect: {
			// 	package: WalletConnectProvider, // required
			// 	options: {
			// 		// infuraId: "INFURA_ID" // required
			// 		rpc: {
			// 			1: 'https://nd-863-734-578.p2pify.com/9e8249567528ca2f8ddd003d646c4463',
			// 			3: 'https://nd-624-721-704.p2pify.com/294434fc760889347fa915ba56b61cd8',
			// 			56: 'https://nd-873-525-166.p2pify.com/45ef6adb4f713cb88f6f2bf5a2d8c252',
			// 			97: 'https://nd-472-585-582.p2pify.com/8868f9c2a7ab8721c787b62ea6ee86db',
			// 		},
			// 		chainId: config.chainId,
			// 		network: 'binance',
			// 	}
			// },
			...customProviderOptions,
		};

		this.web3Modal = new Web3Modal({
 		  cacheProvider: false,
			providerOptions: this.providerOptions,
			theme: 'dark',
		});

		this.web3Modal.clearCachedProvider();

	}

	componentDidMount = async () => {

		this._isMounted = true;
		if (this._isMounted) {
			try {
  			// let's check if there is an injected provider so we use it
				const injectedProviderInfo = getInjectedProvider();
				// console.log("[DEBUG] InjectedProvider: %o", injectedProviderInfo);
				if (injectedProviderInfo !== null) {
					const tempInjectedProvider = window.ethereum;
					const tempSelectedAddress = await getSelectedAddress(tempInjectedProvider);
					// only force a connection to the provider if it is already connected
					if (tempSelectedAddress !== null) {
						const provider = await this.web3Modal.connectTo('injected');
						// const provider = await this.web3Modal.connectTo(injectedProviderInfo.id);
						// console.log("[DEBUG] Provider: %o", provider);
						await this.subscribeToProviderEvents(provider);
						await this.updateProviderDataState(provider);
					}
				}
			} catch (error) {
				console.error(error); // tslint:disable-line
			}
			this.setState({ isThisComponentLoading: false });
		}
	};

	componentWillUnmount = async () => {
		this._isMounted = false;

		// this is to avoid message "perform a React state update on an unmounted component.." , _isMounted doesn't work so
		// i use this solution as a temporal fix, until we found how to cancel all subscriptions and asynchronous tasks :)
		this.setState = (state, callback) => {
			return;
		};
	}

	onUserWantsToConnectWallet = async () => {

		this.web3Modal = new Web3Modal({
			cacheProvider: false,
		 providerOptions: this.providerOptions,
		 theme: 'dark',
	 });
	 this.web3Modal.clearCachedProvider();

	 try {
			console.log("web3Modal: %o", this.web3Modal);
			const provider = await this.web3Modal.connect();
			console.log("[DEBUG] connected to provider: %o", provider);
			if (provider !== null) {
				await this.subscribeToProviderEvents(provider);
				// await provider.enable();
				await this.updateProviderDataState(provider);
			}
		} catch (error) {
			if (error.message === "No Binance Chain Wallet found") {
 				window.open('https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp', '_blank');
			}
			console.error(error); // tslint:disable-line
		}
	};

	onUserWantsToDisconnectWallet = async () => {
		const { provider } = this.props;
		if (provider.close) {
			await provider.close();
			// If the cached provider is not cleared,
			// WalletConnect will default to the existing session
			// and does not allow to re-scan the QR code with a new wallet.
			// Depending on your use case you may want or want not his behavir.
			await this.web3Modal.clearCachedProvider();
			await this.updateProviderDataState(null);	
		}		
	}

	onUserWantsToChangeChain = async (provider) => {
		const { web3 } = this.props;
		console.log("[DEBUG] chainid is %o", config.chainId);
		await provider
			.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: numberToHex(config.chainId) }],
			})
			.catch((switchError) => {
				// This error code indicates that the chain has not been added to MetaMask.
				if (switchError.code === 4902 || switchError.code === -32603) {
					provider
						.request({
							method: 'wallet_addEthereumChain',
							params: [{
								chainId: numberToHex(parseInt(config.chainId)),
								chainName: config.chainName,
								nativeCurrency: config.chainNativeCurrency,
								rpcUrls: config.chainRpcUrls,
								blockExplorerUrls: config.chainBlockExplorerUrls,
							}],
						})
						.catch((error) => {
							// handle "add" error
						});
				}
				// handle other "switch" errors
			});

		const chainId = await web3.eth.chainId();
		// console.log("[DEBUG][WALLET] chain id changed to " + chainId)
		const network = await web3.eth.net.getId();
		// console.log("[DEBUG][WALLET] network changed to " + network)
		// We recommend reloading the page, unless you must do otherwise
		this.setState({ modal: { show: false } });

		// window.location.reload(1);
	};

	getNetwork = () => getChainData(parseInt(this.props.selectedChainId !== null ? this.props.selectedChainId : 1)).network;

	getEthBalance = async (address) => {
		const { web3 } = this.props;
		const selectedAddressEthBalance = await web3.eth.getBalance(address);
		this.props.walletBalanceAction({ selectedAddressEthBalance });
		return selectedAddressEthBalance;
	};

	updateProviderDataState = async (provider) => {
		var data = { isProviderConnected: false, provider, providerName: null, providerLogo: null, web3: null, selectedAddress: null, selectedAddressEthBalance: null, isAddressWhitelisted: false, selectedChainId: 1, selectedNetwork: 1 };

		if (provider !== null) {
			try {
				const web3 = initWeb3(provider);
				const providerInfo = getProviderInfo(provider); // TODO: Web3Modal Error
				const selectedAddress = await getSelectedAddress(provider);
				// console.log("[DEBUG][WALLET] new address is ", selectedAddress);
				const selectedNetwork = await web3.eth.net.getId();
				const selectedChainId = await web3.eth.chainId();
				// console.log("[DEBUG][WALLET] new chain is ", selectedChainId);

				if (selectedChainId !== config.chainId) {
					this.setState({
						modal: {
							show: true,
							showDismissButton: true,
							callbackOnDismissButton: this.onClickCloseModal,
							showCloseButton: true,
							closeButtonText: "SWITCH NETWORK",
							callbackOnCloseButton: () => this.onUserWantsToChangeChain(provider),
							title: 'Wrong chain!',
							text: "Aww yeah, you successfully connected your wallet, but the seleceted chain is not " + config.chainName + ". If you don't know how to add the " + config.chainName + " to your wallet and/or how to change to it just press the button.",
						}
					});
					return;
				}
				data = { ...data, isProviderConnected: true, providerName: providerInfo.name, providerLogo: providerInfo.logo, web3, selectedChainId, selectedNetwork, selectedAddress }
				console.log('[WALLET] connected to ' + providerInfo.name);
			} catch (error) {
				console.error('[WALLET] error detected while initializing web3 provider ' + error); // tslint:disable-line
				this.props.walletConnectAction(data); this.props.walletChangeAction(data); this.props.walletBalanceAction(data);
				// this.setState(data);
				return
			}
		}

		if (data.isProviderConnected) {
			console.log('[WALLET] selected address is ' + data.selectedAddress);
			try {
				const selectedAddressEthBalance = data.selectedAddress !== null ? await data.web3.eth.getBalance(data.selectedAddress) : null;
				data = { ...data, selectedAddressEthBalance }
			} catch (error) {
				console.error('[WALLET] error accessing contract ' + error); // tslint:disable-line
				// this.setState(data);
			}
		}

		this.props.walletConnectAction(data); this.props.walletChangeAction(data); this.props.walletBalanceAction(data);
		// this.setState(data);
	};

	subscribeToProviderEvents = async (provider) => {
		if (!provider.on) {
			return;
		}
		provider.on('close', () => {
			console.log('[DEBUG][WALLET] PROVIDER: closed');
			// this.props.walletChangeAction({ selectedAddress: null, selectedNetwork: null, selectedChainId: null });
			// this.props.walletChangeBalance({ selectedAddressEthBalance: null });
			this.resetProvider();
		});
		provider.on('accountsChanged', async (accounts) => {
			await this.updateProviderDataState(provider);
			window.location.reload(1);
		});
		provider.on('chainChanged', async (selectedChainId) => {
			await this.updateProviderDataState(provider);
			window.location.reload(1);
		});
		provider.on('networkChanged', async (selectedNetwork) => {
			await this.updateProviderDataState(provider);
			window.location.reload(1);
		});
	};

	resetProvider = async () => {
		const { web3 } = this.props;
		if (web3 && web3.currentProvider && web3.currentProvider.close) {
			await web3.currentProvider.close();
		}
		this.web3Modal.clearCachedProvider();
		this.props.walletResetAction();
		this.setState({ ...INITIAL_STATE });
	};

	onClickCloseModal = () => {
		this.setState({ modal: { ...this.state.modal, show: false } });
	};


	render() {
		const { modal } = this.state;

		return (
			!this.state.isThisComponentLoading && (
				<Fragment>
					<Button className='w-100' id="btn-connect-button" variant="outline-primary" onClick={this.onUserWantsToConnectWallet} style={{ width: 170 }}>
						{this.props.children}
					</Button>

					<CustomModal
						show={modal.show}
						title={modal.title}
						showLoading={modal.showLoading}
						showDismissButton={modal.showDismissButton}
						onDismissButtonCallback={modal.callbackOnDismissButton}
						showCloseButton={modal.showCloseButton}
						closeButtonText={modal.closeButtonText}
						onCloseButtonCallback={modal.callbackOnCloseButton}>
						{modal.text}
					</CustomModal>
				</Fragment>
			)
		);
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
}

const mapDispatchToProps = {
	walletConnectAction,
	walletChangeAction,
	walletBalanceAction,
	walletResetAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletConnectButton);
