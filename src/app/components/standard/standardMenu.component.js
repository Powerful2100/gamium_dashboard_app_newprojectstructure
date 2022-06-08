import React, { useState } from 'react';
import './standardMenu.style.css';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { ReactComponent as TwitterIcon } from 'assets/images/app/logo-twitter.svg';
import { ReactComponent as InstagramIcon } from 'assets/images/app/logo-instagram.svg';
import { ReactComponent as MediumIcon } from 'assets/images/app/logo-medium.svg';
import { ReactComponent as DiscordIcon } from 'assets/images/app/logo-discord.svg';
import { ReactComponent as TelegramIcon } from 'assets/images/app/logo-paper-plane.svg';


export const MenuComponent = ({ openMenu }) => {
	const { t, i18n } = useTranslation();
	const regexpEmail = new RegExp("^[a-z0-9]+(.[_a-z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,15})$");
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [language, setlanguage] = useState("En");
	const [hasError, setHasError] = useState(false);
	const [messageError, setMessageError] = useState("");
	const [showMessageOK, setShowMessageOK] = useState(false);

	const changeLanguage = (event) => {
		if (language === "En") {
			setlanguage("Es");
			i18n.changeLanguage('es');
		} else {
			setlanguage("En");
			i18n.changeLanguage('en');
		}
	}

	const handleEmail = e => {
		setEmail(e.target.value)
		setHasError(false)
	};

	const handleSubmit = (event) => {
		setLoading(true);
		event.preventDefault();
		if (!regexpEmail.exec(email)) {
			setEmail("");
			setHasError(true);
			setMessageError("Invalid email")
		} else {
			setShowMessageOK(true)
			setEmail("");
			//here call to API register user email stay in loop
			setTimeout(() => {
				setShowMessageOK(false)
			}, 3000);
		}
		setLoading(false);
	};

	return (
		<div className={openMenu ? "show-menu overlay-menu-container" : "hide-menu overlay-menu-container"}>
			<div className='d-flex flex-column w-100'>
				<div className="menu_container-desktop">
					<div className="menu-section-form">
						<div className="menu-language" >
							<div className="language-wrp" onClick={changeLanguage} >
								<span>{language}</span>
								<img src="images/caret-down.svg" alt='Language' className='caret-down-img' />
							</div>
						</div>
						<div className="menu-content-section"> </div>
						<Form noValidate onSubmit={handleSubmit} className="form-style">
							<Row>
								<Col xs={12} md={3} className="d-flex align-items-center">
									<span className="menu-content-section-text">Stay in the loop</span>
								</Col>
								<Col xs={12} md={5}>
									<Form.Control type="text"
										placeholder={hasError ? messageError : "Email"}
										disabled={loading}
										className={hasError ? "input-text danger-border" : "input-text"}
										maxLength={50}
										value={email}
										onChange={handleEmail} />
								</Col>
								<Col xs={12} md={4}>
									<Button disabled={loading} variant="primary" type='submit'>
										<span className='btn-connect-span'>Sign up</span>
									</Button>
								</Col>
							</Row>
							<Row>
								<Col xs={0} md={3}>
								</Col>
								<Col xs={12} md={5}>
									<div className={showMessageOK ? "register-ok" : "not-show"}>
										Your registration has been submited. Thank you!
									</div>
								</Col>
								<Col xs={0} md={4}>
								</Col>
							</Row>
						</Form>
					</div>
					<hr className="show-hr-web hr-style margin-xy-25" />
					<div className="menu-section-info">
						<div className="menu-content-info-wrapper">
							<span className="menu-content-title">Tokens</span>
							<a rel="noreferrer" className='a-style-link' href="https://coinmarketcap.com/currencies/gamium/"
								target="_blank">
								<span className="menu-font-style">Governance token</span>
							</a>
							<a rel="noreferrer" className='a-style-link' href="https://coinmarketcap.com/currencies/gamium/">
								<span className="menu-font-style">Reward token</span>
							</a>
						</div>
						<div className="menu-content-section">
						</div>
						<div className="menu-content-items">
							<div className="menu-content-wrapper">
								<span className="menu-content-title">{t('menu.sections')}</span>
								<a rel="noreferrer" className='a-style-link' href="https://gamium.world/#intro_metaverse">
									<span id="intro_metaverse" className="menu-font-style">Gamium</span></a>
								<a rel="noreferrer" className='a-style-link' href="https://gamium.world/#intro_social_metaverse">
									<span id="intro_social_metaverse" className="menu-font-style">Social Metaverse</span></a>
								<a rel="noreferrer" className='a-style-link' href="https://gamium.world/#intro_avatar">
									<span id="intro_avatar" className="menu-font-style">Avatar</span></a>
								<a rel="noreferrer" className='a-style-link' href="https://gamium.world/#intro_social_features">
									<span id="intro_social_features" className="menu-font-style">Social Features</span></a>
								<a rel="noreferrer" className='a-style-link' href="https://gamium.world/#intro_economy">
									<span id="intro_economy" className="menu-font-style">Economy</span></a>
							</div>
							<div className="menu-content-wrapper">
								<span className="menu-content-title">{t('menu.resources')}</span>
								<a rel="noreferrer" className='a-style-link' href="https://whitepaper.gamium.world" target="_blank">
									<span className="menu-font-style">Whitepaper</span></a>
								<a rel="noreferrer" className='a-style-link' href="https://whitepaper.gamium.world/details/roadmap" target="_blank">
									<span className="menu-font-style">Roadmap</span></a>
								<a rel="noreferrer" className='a-style-link' href="https://whitepaper.gamium.world/details/tokenomics" target="_blank">
									<span className="menu-font-style">Tokenomics</span></a>
							</div>
							<div className="menu-content-wrapper">
								<span className="menu-content-title">{t("menu.social-media")}</span>
								<a rel="noreferrer" className='a-style-link' target="_blank" href="https://www.instagram.com/gamiumcorp/">
									<span className="menu-font-style">Instagram</span></a>
								<a rel="noreferrer" className='a-style-link' target="_blank" href="https://twitter.com/gamiumcorp">
									<span className="menu-font-style">Twitter</span></a>
								<a rel="noreferrer" className='a-style-link' target="_blank" href="https://discord.gg/eJZw3ASNh5">
									<span className="menu-font-style">Discord</span></a>
								<a rel="noreferrer" className='a-style-link' target="_blank" href="https://t.me/gamiumcorp">
									<span className="menu-font-style">Telegram</span></a>
								<a rel="noreferrer" className='a-style-link' target="_blank" href="https://medium.com/@gamium">
									<span className="menu-font-style">Medium</span></a>
							</div>
						</div>
					</div>
					<div className="menu-section-footer">
						<div className="menu-footer-wrapper">
							<div className="full-with-100">
								©️ 2022 - Gamium LTD, Malta
							</div>
							<div className="full-with-100 center-footer-menu">
								<a rel="noreferrer" target="_blank" href="https://www.instagram.com/gamiumcorp/">
									<InstagramIcon width={ 25 } height={ 25 } />
								</a>
								<a rel="noreferrer" className="a-img-footer" target="_blank" href="https://twitter.com/gamiumcorp">
									<TwitterIcon width={ 25 } height={ 25 } />
								</a>
								<a rel="noreferrer" className="a-img-footer" target="_blank" href="https://discord.gg/eJZw3ASNh5">
									<DiscordIcon width={ 25 } height={ 25 } />
								</a>
								<a rel="noreferrer" className="a-img-footer" target="_blank" href="https://t.me/gamiumcorp">
									<TelegramIcon width={ 25 } height={ 25 } />
								</a>
								<a rel="noreferrer" className="a-img-footer" target="_blank" href="https://medium.com/@gamium">
									<MediumIcon width={ 25 } height={ 25 } />
								</a>
							</div>
							<div className="full-with-100 right">
								<a rel="noreferrer" className='a-style-default' href="mailto:info@gamium.world">info@gamium.world</a>
							</div>
						</div>
					</div>
				</div>
				<div className="menu_container-mobile">
					<div className="menu-language d-flex justify-content-center w-100 mt-3" >
						<div className="language-wrp" onClick={changeLanguage} >
							<span>{language}</span>
							<img src="images/caret-down.svg" alt='Language' className='caret-down-img' />
						</div>
					</div>
					<Form noValidate onSubmit={handleSubmit} className="mr-35 ml-35">
						<Row>
							<Col xs={12} md={3} className="d-flex align-items-center justify-content-center mt-3">
								<span className="menu-content-section-text-mobile">Stay in the loop</span>
							</Col>
							<Col xs={12} md={5}>
								<Form.Control type="text"
									placeholder={hasError ? messageError : "Email"}
									disabled={loading}
									className={hasError ? "input-text danger-border mt-3" : "input-text mt-3"}
									maxLength={50}
									value={email}
									onChange={handleEmail} />
							</Col>
							<Col xs={12} md={4}>
								<Button className='w-100 mt-3' disabled={loading} variant="primary" type='submit'>
									<span className='btn-connect-span'>Sign up</span>
								</Button>
							</Col>
						</Row>
						<Row>
							<Col xs={0} md={3}>
							</Col>
							<Col xs={12} md={5}>
								<div className={showMessageOK ? "register-ok" : "not-show"}>
									Your registration has been submited. Thank you!
								</div>
							</Col>
							<Col xs={0} md={4}>
							</Col>
						</Row>
					</Form>
					<hr className="show-hr-web hr-style" />
					<Row>
						<Col xs="6" md="6" className="center" ><a className='nav-link m-0 nav-link' href='https://explorer.gamium.world/' target="_blank" rel='noreferrer'> <span>Map</span></a></Col>
						<Col xs="6" md="6" className="center" ><a className='nav-link m-0 nav-link' href='http://vote.gamium.world/' target="_blank" rel='noreferrer'> <span>DAO</span></a></Col>
					</Row>
					<hr className="show-hr-web hr-style" />
					<div className='mobile-content-wpr'>
						<div className="menu-content-info-wrapper-mobile">
							<span className="menu-content-title-mobile">Tokens</span>
							<a rel="noreferrer" className='a-style-link' href="https://coinmarketcap.com/currencies/gamium/"
								target="_blank">
								<span className="menu-font-style-mobile">Governance token</span>
							</a>
							<a rel="noreferrer" className='a-style-link' href="https://coinmarketcap.com/currencies/gamium/">
								<span className="menu-font-style-mobile">Reward token</span>
							</a>
						</div>
						<div className="menu-section-info">
							<div className="menu-content-items">
								<div className="menu-content-wrapper center">
									<span className="menu-content-title-mobile">{t('menu.sections')}</span>
									<a rel="noreferrer" className='a-style-link' href="https://gamium.world/#intro_metaverse">
										<span id="intro_metaverse" className="menu-font-style-mobile">Gamium</span></a>
									<a rel="noreferrer" className='a-style-link' href="https://gamium.world/#intro_social_metaverse">
										<span id="intro_social_metaverse" className="menu-font-style-mobile">Social Metaverse</span></a>
									<a rel="noreferrer" className='a-style-link' href="https://gamium.world/#intro_avatar">
										<span id="intro_avatar" className="menu-font-style-mobile">Avatar</span></a>
									<a rel="noreferrer" className='a-style-link' href="https://gamium.world/#intro_social_features">
										<span id="intro_social_features" className="menu-font-style-mobile">Social Features</span></a>
									<a rel="noreferrer" className='a-style-link' href="https://gamium.world/#intro_economy">
										<span id="intro_economy" className="menu-font-style-mobile">Economy</span></a>
								</div>
								<div className="menu-content-wrapper center">
									<span className="menu-content-title-mobile">{t('menu.resources')}</span>
									<a rel="noreferrer" className='a-style-link' href="https://whitepaper.gamium.world" target="_blank">
										<span className="menu-font-style-mobile">Whitepaper</span></a>
									<a rel="noreferrer" className='a-style-link' href="https://gamium.world/pdf/extended_roadmap.pdf" target="_blank">
										<span className="menu-font-style-mobile">Roadmap</span></a>
									<a rel="noreferrer" className='a-style-link' href="https://gamium.world/pdf/tokenomics.pdf" target="_blank">
										<span className="menu-font-style-mobile">Tokenomics</span></a>
								</div>
								<div className="menu-content-wrapper center">
									<span className="menu-content-title-mobile">{t("menu.social-media")}</span>
									<a rel="noreferrer" className='a-style-link' target="_blank" href="https://www.instagram.com/gamiumcorp/">
										<span className="menu-font-style-mobile">Instagram</span></a>
									<a rel="noreferrer" className='a-style-link' target="_blank" href="https://twitter.com/gamiumcorp">
										<span className="menu-font-style-mobile">Twitter</span></a>
									<a rel="noreferrer" className='a-style-link' target="_blank" href="https://discord.gg/eJZw3ASNh5">
										<span className="menu-font-style-mobile">Discord</span></a>
									<a rel="noreferrer" className='a-style-link' target="_blank" href="https://t.me/gamiumcorp">
										<span className="menu-font-style-mobile">Telegram</span></a>
									<a rel="noreferrer" className='a-style-link' target="_blank" href="https://medium.com/@gamium">
										<span className="menu-font-style-mobile">Medium</span></a>
								</div>
							</div>
						</div>
					</div>
					<div className="menu-section-footer">
						<div className="menu-footer-wrapper-mobile">
							<div className="full-with-100 center-footer-menu">
								<a rel="noreferrer" target="_blank" href="https://www.instagram.com/gamiumcorp/">
									<InstagramIcon width={ 25 } height={ 25 } />
								</a>
								<a rel="noreferrer" className="a-img-footer" target="_blank" href="https://twitter.com/gamiumcorp">
									<TwitterIcon width={ 25 } height={ 25 } />
								</a>
								<a rel="noreferrer" className="a-img-footer" target="_blank" href="https://discord.gg/eJZw3ASNh5">
									<DiscordIcon width={ 25 } height={ 25 } />
								</a>
								<a rel="noreferrer" className="a-img-footer" target="_blank" href="https://t.me/gamiumcorp">
									<TelegramIcon width={ 25 } height={ 25 } />
								</a>
								<a rel="noreferrer" className="a-img-footer" target="_blank" href="https://medium.com/@gamium">
									<MediumIcon width={ 25 } height={ 25 } />
								</a>
							</div>
						</div>
						<div className='d-flex mr-35 ml-35'>
							<div className="full-with-50">
								©️ 2022 - Gamium LTD, Malta
							</div>
							<div className="full-with-50 right">
								<a rel="noreferrer" className='a-style-default' href="mailto:info@gamium.world">info@gamium.world</a>
							</div>
						</div>
					</div>
				</div>
			</div >
		</div>)
}

export default MenuComponent;