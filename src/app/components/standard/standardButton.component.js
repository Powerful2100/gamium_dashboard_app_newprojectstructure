import React from 'react';
import './standardButton.style.css';
import { Button } from 'react-bootstrap';

const CustomButtom = ({ text, callbackOnClick = () => { }, disabled = false, svg, widthSVG = 15, colorText = 'white', variant = "outline-primary", backgroundColor }) => {
	return (
		<Button disabled={disabled} onClick={callbackOnClick} variant={variant} style={{ backgroundColor: backgroundColor, width: '100%' }}>
			<div className='btn-wrapper'>
				<span style={{ color: colorText }}>{text}</span>
				{svg && <img src={svg} alt='' style={{ width: widthSVG, marginLeft: 15 }} />}
			</div>
		</Button>
	);
};

export default CustomButtom;
