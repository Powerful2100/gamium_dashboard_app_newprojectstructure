import React, { Component, Fragment } from 'react';

import '../styles/navbar.style.css';

import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

import PreprodLogo from '../logos/preprod.svg';
import GamiumLogo from '../logos/logo.svg';
import WalletAddressInfo from '../components/walletAddressInfo.component';

import config from '../config.json';

const INITIAL_STATE = {
	requestIp: '',
};

class NavBarComponent extends Component {
	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}

	componentDidMount = async () => {
	};

	render() {
		return (
			<Fragment>
				<Navbar variant='dark' expand='lg' className='navbar-container'>
					<div className='d-flex flex-row w-100'>
						<div className='navbar-logo-container'>
							<a href='/'>
								<img className='navbar-logo-gamium' src={config.mode == "STAGE" ? PreprodLogo : GamiumLogo} alt='GAMIUM' />
							</a>
						</div>
						<Nav className='navbar-line-wpr d-flex flex-row align-items-center'>
							<div>
								<Link className='nav-link no-padding' to={'/map'}>
									Map
								</Link>
							</div>
							<div>
								<Link className='nav-link no-padding ml-10' to={'/inventory'}>
									Inventory
								</Link>
							</div>
						</Nav>
						<div className='d-flex justify-content-end align-items-center w-50' style={{ height: 25 }}>
							<WalletAddressInfo />
						</div>
					</div>
				</Navbar>
			</Fragment>
		);
	}
}

export default NavBarComponent;
