import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown } from 'react-bootstrap';
import { toChecksumAddress, numberToHex } from "web3-utils";
import { getChainData } from 'utils/utilities';
import { walletConnectAction, walletChangeAction, walletBalanceAction, walletResetAction } from '../../store/actions/wallet.actions';
import Web3Modal, { getInjectedProvider, getInjectedProviderName, verifyInjectedProvider, checkInjectedProviders, getProviderInfo, getProviderInfoById } from 'web3modal';

import MetamaskLogo from 'assets/images/app/metamask.svg';
import MetaMaskOnboarding from '@metamask/onboarding';
import WalletConnectProvider from "@walletconnect/web3-provider";
import Torus from '@toruslabs/torus-embed';
import WalletLink from 'walletlink';
import Web3 from 'web3';

import config from '../../config/config.json';
import CustomModal from '../standard/standardModal.component';
import { shortWeb3Acount } from 'utils/formaters';

const INITIAL_STATE = {
	// isProviderConnected: false,
	// provider: null,
	// providerName: null,
	// providerLogo: MetamaskLogo,
	// web3: null,
	// selectedChainId: 1,
	// selectedNetwork: 1,
	// selectedAddress: null,
	isThisComponentLoading: true,
	showDropdown: false,

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
			console.log("[DEBUG] acounts are " + accounts);
			return accounts;
		})
		.catch((error) => {
			// Some unexpected error.
			// For backwards compatibility reasons, if no accounts are available,
			// eth_accounts will return an empty array.
			console.error('[WALLET] error detected while accesing provider ', error);
		});
}

async function getSelectedAddress(provider) {
	var selectedAddress = null;
	try {
		if (provider.selectedAddress) {
			selectedAddress = toChecksumAddress(provider.selectedAddress);
		} else {
			let presentAccounts = provider.accounts;
			if (!presentAccounts) {
				presentAccounts = await getWalletAccounts(provider);
			}
			selectedAddress = toChecksumAddress(presentAccounts[0]);
		}
		console.log("[DEBUG] selected address is %o", selectedAddress);
	} catch (error) {
		console.log("[Error] getSelectedAddress -  ", error)
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
			/*
			'custom-injected': {
				display: {
					logo: BinanceChainWalletLogo,
					name: 'Binance Custom',
					description: 'Binance Custom',
				},
				package: {},
				connector: ConnectToBinanceChainWallet,
			}, 
			*/
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
					chainId: config.chainId, // or 1
					darkMode: true,
				},
			},
			binancechainwallet: {
				/*
				display: {
					name: 'Binance Chain Wallet',
					logo: BinanceChainWalletLogo,
				},
				*/
				package: {},
			},
			walletconnect: {
				package: WalletConnectProvider, // required
				options: {
					// infuraId: "INFURA_ID" // required
					qrcode: true,
			 		rpc: {
			 			1: 'https://nd-863-734-578.p2pify.com/9e8249567528ca2f8ddd003d646c4463',
						3: 'https://nd-624-721-704.p2pify.com/294434fc760889347fa915ba56b61cd8',
						56: 'https://nd-873-525-166.p2pify.com/45ef6adb4f713cb88f6f2bf5a2d8c252',
						97: 'https://nd-472-585-582.p2pify.com/8868f9c2a7ab8721c787b62ea6ee86db',
					},
					chainId: config.chainId,
					network: 'binance',
				}
			},
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
			const storedProvider = localStorage.getItem('wallet_provider');
			if (storedProvider !== null) {
				try {
					const provider = await this.web3Modal.connectTo(storedProvider);
					// const provider = await this.web3Modal.connectTo('injected');
					// const provider = await this.web3Modal.connectTo(injectedProviderInfo.id);
					// console.log("[DEBUG] Provider: %o", provider);
					await this.subscribeToProviderEvents(provider);
					await this.updateProviderDataState(provider);
				} catch (error) {
					if (error.message === "No Binance Chain Wallet found") {
						window.open('https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp', '_blank');
					} else
					if (error.message === "User closed modal") {
						localStorage.removeItem('wallet_provider');
					}
					console.log(error.message);
				}
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

	getProviderInfo = (provider) => {
		// web3modal funcion does no return correct data so we intercept-like it
		if (typeof provider.bnbSign !== 'undefined') {
			// Suspect can be BinanceChainWallet ...
			return getProviderInfoById('binancechainwallet');
		}
		return getProviderInfo(provider);
	}

	onUserWantsToConnectWallet = async () => {
		this.web3Modal = new Web3Modal({
			cacheProvider: false,
			providerOptions: this.providerOptions,
			theme: 'dark',
		});

		this.web3Modal.clearCachedProvider();

		try {
			const provider = await this.web3Modal.connect();
			console.log("[DEBUG] connected to provider: %o", provider);
			if (provider !== null) {
				const providerInfo = this.getProviderInfo(provider); // TODO: Web3Modal Error
				console.log("[DEBUG] connected provider info: %o", providerInfo);
				localStorage.setItem('wallet_provider', providerInfo.id);
				await this.subscribeToProviderEvents(provider);
				// await provider.enable();
				await this.updateProviderDataState(provider);
			}
		} catch (error) {
			if (error.message === "No Binance Chain Wallet found") {
				window.open('https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp', '_blank');
			} else
			if (error.message === "Error: User closed modal") {
				localStorage.clearItem('wallet_provider');
			}
		}
	};

	onUserWantsToDisconnectWallet = async () => {
		await this.resetProvider();
	}

	/* 	onUserWantsWalletInfo = async () => {
			const { provider } = this.props;
			this.setState({
				modal: {
					show: true,
					showDismissButton: true,
					callbackOnDismissButton: this.onClickCloseModal,
					showCloseButton: true,
					closeButtonText: "DISCONNECT WALLET",
					callbackOnCloseButton: () => this.onUserWantsToDisconnectWallet(provider),
					title: 'Wallet info',
					text: "To disconnect your wallet, just press the button.",
				}
			});
		} */


	onUserWantsToChangeChain = async (provider) => {
		const { web3 } = this.props;
		console.log("[DEBUG] desired chain is ", config.chainId);
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
								chainId: numberToHex(config.chainId),
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

		// const chainId = await web3.eth.chainId();
		// console.log("[DEBUG][WALLET] chain id changed to " + chainId)
		// const network = await web3.eth.net.getId();
		// console.log("[DEBUG][WALLET] network changed to " + network)
		// We recommend reloading the page, unless you must do otherwise
		// window.location.reload(1);
		this.setState({ modal: { show: false } });
	};

	getNetwork = () => getChainData(parseInt(this.props.selectedChainId !== null ? this.props.selectedChainId : 1)).network;

	updateProviderDataState = async (provider) => {
		var data = { isProviderConnected: false, provider, providerName: null, providerLogo: null, web3: null, selectedAddress: null, isAddressWhitelisted: false, selectedChainId: 1, selectedNetwork: 1 };

		if (provider !== null) {
			try {
				const web3 = initWeb3(provider);
				console.log(provider);
				const providerInfo = this.getProviderInfo(provider); // TODO: Web3Modal Error
				console.log("[DEBUG] provider id is " + providerInfo.id + " and name is " + provider.name);
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

		this.props.walletConnectAction(data); this.props.walletChangeAction(data); this.props.walletBalanceAction(data);
	};

	resetProvider = async () => {
		try {
			const { web3, provider } = this.props;
			if (provider !== null) {
				/*
				if (web3 && web3.currentProvider && web3.currentProvider.close) {
					await web3.currentProvider.close();
				}
				*/
				
				if (typeof(provider.disconnect) !== 'undefined') {
					await provider.disconnect();
				}
				/*
				if (typeof(provider.close) !== 'undefined') {
					await provider.close();
				}
				*/
			}
			// If the cached provider is not cleared,
			// WalletConnect will default to the existing session
			// and does not allow to re-scan the QR code with a new wallet.
			// Depending on your use case you may want or want not his behaviour.
			await this.web3Modal.clearCachedProvider();
			await this.updateProviderDataState(null);
			// this.props.walletResetAction();
			localStorage.removeItem('wallet_provider');
			// this.setState({ ...INITIAL_STATE });
			console.log(" [WALLET] wallet disconnected")
		} catch (error) {
			console.log(" [ERROR] resetProvider -  ", error)
		}
	};

	subscribeToProviderEvents = async (provider) => {
		if (!provider.on) {
			return;
		}
		provider.on('close', () => {
			console.log('[DEBUG][WALLET] PROVIDER: closed');
			// this.props.walletChangeAction({ selectedAddress: null, selectedNetwork: null, selectedChainId: null });
			this.resetProvider();
			window.location.reload(1);
		});
		provider.on('disconnect', () => {
			console.log('[DEBUG][WALLET] PROVIDER: disconnect');
			// this.props.walletChangeAction({ selectedAddress: null, selectedNetwork: null, selectedChainId: null });
			this.resetProvider();
			// window.location.reload(1);
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

	onClickCloseModal = () => {
		this.setState({ modal: { ...this.state.modal, show: false } });
	};

	showDropdownWalletDisconnect = (e) => {
		this.setState({ showDropdown: !this.dropDown })
	}

	hideDropdownWalletDisconnect = e => {
		this.setState({ showDropdown: false })
	}

	render() {
		const { modal, showDropdown } = this.state;
		const { isProviderConnected, selectedAddress, providerLogo, providerName, provider } = this.props;

		return (
			!this.state.isThisComponentLoading && (
				<Fragment>
					{isProviderConnected === true && selectedAddress !== null ? (
						<Dropdown>
							<Dropdown.Toggle className='w-100'
								variant="outline-primary"
								style={{ width: 170 }}
								onMouseEnter={this.showDropdownWalletDisconnect}
								onMouseLeave={this.hideDropdownWalletDisconnect}>
								<span className='btn-connect-span'>
									{shortWeb3Acount(selectedAddress)}
									<img className='navbar-wallet-btn-img' src={providerLogo} alt={providerName} />
								</span>
							</Dropdown.Toggle>

							<Dropdown.Menu id="collasible-nav-dropdown"
								show={showDropdown}
								onMouseEnter={this.showDropdownWalletDisconnect}
								onMouseLeave={this.hideDropdownWalletDisconnect}>
								<Dropdown.Item onClick={this.onUserWantsToDisconnectWallet}>Disconnect</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					) : (
						<Button className='w-100' id="btn-connect-button" variant="outline-primary" onClick={this.onUserWantsToConnectWallet} style={{ width: 170 }}>
							{this.props.children}
						</Button>
					)}
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
		providerLogo: state.wallet.providerLogo,
		providerName: state.wallet.providerName,
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
