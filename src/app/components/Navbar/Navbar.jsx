import React from 'react';
import { PropTypes } from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Nav, Navbar as BoostrapNavbar } from 'react-bootstrap';

import PreprodLogo from 'assets/images/app/preprod.svg';
import GamiumLogo from 'assets/images/app/logo.svg';

import config from 'app/config/config.json';

import WalletAddressInfoComponent from '../wallet/walletAddressInfo.component';
import { ReactComponent as CloseIcon } from 'assets/images/app/close.svg';
import { ReactComponent as BurgerIcon } from 'assets/images/app/burger-menu.svg';

import styles from './Navbar.module.scss';
import '../standard/standardNavbar.style.css';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  isMenuOpened: PropTypes.bool,
  callbackOpenMenu: PropTypes.func,
};

const defaultProps = {
  className: '',
  id: undefined,
  isMenuOpened: false,
  callbackOpenMenu: () => {},
};

const NavBar = ({ id, className, isMenuOpened, callbackOpenMenu }) => {
	const toggleMenuOpened = () => callbackOpenMenu(!isMenuOpened);

	const MenuIcon = isMenuOpened ? CloseIcon : BurgerIcon;
    const navbarClassNames = classnames(styles.Navbar, className);

	return (
		<BoostrapNavbar 
			variant='dark' 
			expand='lg'
			className={ navbarClassNames }
		>
			<div className='navbar-wrp'>
				<MenuIcon className='burger-menu' onClick={ toggleMenuOpened }/>
				<div className={ styles.Logo }>
					<a href='/'>
						<img 
						className={ styles.LogoGamium } 
						src={ config.mode === "STAGE" ? PreprodLogo : GamiumLogo } 
						alt='GAMIUM' 
						/>
					</a>
				</div>
				<Nav className='LineWpr d-flex flex-row align-items-center'>
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
					<WalletAddressInfoComponent />
				</div>
			</div>
		</BoostrapNavbar>
	);
};

NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;

export default NavBar;
