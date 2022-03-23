import React, { Fragment } from "react";
import "../styles/loader.style.css";
import { Modal, Button } from "react-bootstrap";
import { Loader } from "./loader.component";

export default function CustomModal({
		show, 
		title, 
		showLoading = false, 
		onHideCallback = () => null,
		showDismissButton = false, 
		onDismissButtonCallback = () => null, 
		showCloseButton = false, 
		closeButtonText = "Close", 
		onCloseButtonCallback = () => null,
		children,
		...attrs 
	}) {
	return (
		<Fragment>
			<Modal show={ show } onHide={ onHideCallback } aria-labelledby="contained-modal-title-vcenter" centered {...attrs }>
				<Modal.Header closeButton={true} className="modal-alert border-bottom-0">
					<Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
					{ showDismissButton && (<img src="images/close.svg" alt='' className='img-close-modal' onClick={() => { onDismissButtonCallback(); }}/>) }
				</Modal.Header>
				<Modal.Body>
					{ children }
					{showLoading && (
						<div className="d-flex justify-content-center align-items-center w-100 mt-5">
							<Loader size={45} />
						</div>
					)}
				</Modal.Body>
				<Modal.Footer className="border-top-0 justify-content-center">
	          { showCloseButton && (<Button className='w-100' variant="primary" size="" onClick={() => { onCloseButtonCallback(); }}>{ closeButtonText }</Button> )}
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
};

