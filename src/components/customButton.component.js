import React from 'react';
import '../styles/loader.style.css';
import { Button } from 'react-bootstrap';

const CustomButtom = ({ text, callbackOnClick = () => {}, disabled = false, svg, widthSVG = 15, colorText = 'white', outlined = false, backgroundColor = 'transparent' }) => {
	return (
		<Button disabled={disabled} onClick={callbackOnClick} outlined={outlined} style={{ backgroundColor: backgroundColor, width: '100%' }}>
			<div className='w-100 d-flex align-items-center justify-content-center'>
				<span style={{ color: colorText }}>{text}</span>
				{svg && <img src={svg} alt='' style={{ width: widthSVG, marginLeft: 15 }} />}
			</div>
		</Button>
	);
};

export default CustomButtom;
