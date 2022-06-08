import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { walletConnectAction, walletChangeAction, walletBalanceAction, walletResetAction } from 'app/store/actions/wallet.actions';
import WalletButton from './walletButton.component';

const INITIAL_STATE = {
	isThisComponentLoading: true,
};

class WalletAddressInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...INITIAL_STATE,
		};
	}

	componentDidMount = async () => {
		// console.log('[DEBUG][WALLET] WALLET CONNECT BUTTON initialized ...');
		this.setState({ isThisComponentLoading: false });
	};

	render() {
		const { isThisComponentLoading } = this.state;
		const { isProviderConnected, selectedAddress, providerLogo, providerName } = this.props;

		return (
			!isThisComponentLoading && (
				<Fragment>
					<div className='navbar-wallet-btn'>
						<WalletButton>
							<span id="span-connect-wallet" className="btn-connect-span"> Connect Wallet </span>
						</WalletButton>
					</div>
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
		isAuthenticated: state.session.isAuthenticated,
	};
};

const mapDispatchToProps = {
	walletConnectAction,
	walletChangeAction,
	walletBalanceAction,
	walletResetAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletAddressInfo);
