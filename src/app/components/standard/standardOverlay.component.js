import React from "react";
import "./standardOverlay.style.css"

export const CustomOverlay = (props) => {

	const { show, children, callbackOnClose } = props;

	return (
		show &&
		(
			<div className="modal-overlay" id="modal-overlay" onClick={callbackOnClose}>
				<div className="modal-overlay-wrp">
					{children}
				</div>
			</div>
		)
	);
};

export default CustomOverlay;