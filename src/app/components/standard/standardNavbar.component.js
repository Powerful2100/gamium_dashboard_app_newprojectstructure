import React, { Fragment, useState } from 'react';
import './styles/standardNavbar.style.css';
import config from '../../config/config.json';
import { Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import WalletAddressInfo from '../wallet/walletAddressInfo.component';

export const NavBarComponent = ({ openMenu, callbackOpenMenu }) => {
	const isProviderConnected = useSelector((state) => state.wallet.isProviderConnected);
	const selectedAddress = useSelector((state) => state.wallet.selectedAddress);
	const [pathActive, setPathActive] = useState(window.location.pathname.length > 1 ? window.location.pathname : "/stake");

	const handlePathActive = (eventKey) => {
		setPathActive(eventKey);
		callbackOpenMenu(false);
	}

	return (
		<Fragment>
			<div className='navbar-container-desktop'>
				<Nav id='navId' className='navbar-wrp'>
					<div className='left-side-wrp'>
						<img src={openMenu ? "images/close_x.svg" : "images/burger-menu.svg"} alt="menu" className='burger-menu' onClick={() => { callbackOpenMenu(!openMenu) }} />
						<a href='https://gamium.world'>
							<img className='navbar-logo-gamium' src={config.mode === "STAGE" ? "images/preprod.svg" : "images/logo.svg"} alt='GAMIUM' />
						</a>
					</div>
					<div className='nav-links-container'>
						<Nav.Link
							to='/stake'
							as={Link}
							className={pathActive === "/stake" ? 'nav-link active' : 'nav-link'}
							onClick={() => { handlePathActive("/stake") }}>
							Stake
						</Nav.Link>
						{isProviderConnected === true && selectedAddress !== null && (
							<Nav.Link
								to='/yourStakes'
								as={Link}
								className={pathActive === "/yourStakes" ? 'nav-link active' : 'nav-link'}
								onClick={() => { handlePathActive("/yourStakes") }}>
								Your stakes
							</Nav.Link>
						)}
						<div className='spacer-vertical-line' />
						<Nav.Link
							to='/stake'
							as={Link}
							className='nav-link active'
							onClick={() => { handlePathActive("/stake") }}>
							Staking
						</Nav.Link>
						<a className='nav-link' href='https://explorer.gamium.world/' target="_blank" rel='noreferrer'>
							Map
						</a>
						<a className='nav-link' href='http://vote.gamium.world/' target="_blank" rel='noreferrer'>
							DAO
						</a>
						<WalletAddressInfo />
					</div>
				</Nav>
			</div>
			<div className='navbar-container-mobile'>
				<Nav id='navId' className='navbar-wrp'>
					<div className='mobile-group-1'>
						<div>
							<img src={openMenu ? "images/close_x.svg" : "images/burger-menu.svg"} alt="menu" className='burger-menu' onClick={() => { callbackOpenMenu(!openMenu) }} />
							<a href='https://gamium.world' className='mobile-group-3'>
								<img className='navbar-logo-gamium' src={config.mode === "STAGE" ? "images/preprod.svg" : "images/logo.svg"} alt='GAMIUM' />
							</a>
						</div>
						<WalletAddressInfo />
					</div>
					<Col xs="12" md="3">
						<div className='mobile-group-2'>
							<Nav.Link
								to='/stake'
								as={Link}
								className='nav-link active'
								onClick={() => { handlePathActive("/stake") }}>
								Staking
							</Nav.Link>
							<div className='spacer-vertical-line' />
							<Nav.Link
								to='/stake'
								as={Link}
								className={pathActive === "/stake" ? 'nav-link active' : 'nav-link'}
								onClick={() => { handlePathActive("/stake") }}>
								Stake
							</Nav.Link>
							{isProviderConnected === true && selectedAddress !== null && (
								<Nav.Link
									to='/yourStakes'
									as={Link}
									className={pathActive === "/yourStakes" ? 'nav-link active m-0' : 'nav-link m-0'}
									onClick={() => { handlePathActive("/yourStakes") }}>
									Your stakes
								</Nav.Link>
							)}
							{/* 	<a className='nav-link' href='https://explorer.gamium.world/' target="_blank" rel='noreferrer'>
								Map
							</a>
							<a className='nav-link' href='http://vote.gamium.world/' target="_blank" rel='noreferrer'>
								DAO
							</a> */}
						</div>
					</Col>
					{/* 	<Col xs="12" md="8">
						<div className='mobile-group-2'>
							<Nav.Link
								to='/stake'
								as={Link}
								className={pathActive === "/stake" ? 'nav-link active' : 'nav-link'}
								onClick={() => { handlePathActive("/stake") }}>
								Stake
							</Nav.Link>
							{isProviderConnected === true && selectedAddress !== null && (
								<Nav.Link
									to='/yourStakes'
									as={Link}
									className={pathActive === "/yourStakes" ? 'nav-link active' : 'nav-link'}
									onClick={() => { handlePathActive("/yourStakes") }}>
									Your stakes
								</Nav.Link>
							)}
						</div>
					</Col> */}


				</Nav>
			</div>
		</Fragment>
	);
};

export default NavBarComponent;
