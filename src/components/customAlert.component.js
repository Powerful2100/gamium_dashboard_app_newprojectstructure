import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";

/*  Possible values
dismissible (show close button or define auto-close) : true || false;
typeAlert (type of alert): 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light';
open (to show the alert) : true || false;
*/

const CustomAlert = ({ title = "", description = "", open = false, dismissible = false, timeAutoClose = 4000, typeAlert = "success", textButton = "Close", callbackOnCloseAlert }) => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		setShow(open);
		if (!dismissible) {
			if (open) {
				setTimeout(() => {
					callbackOnCloseAlert();
					setShow(false);
				}, timeAutoClose);
			}
		}
	}, [callbackOnCloseAlert, dismissible, open, timeAutoClose, typeAlert]);

	return (
		<Alert show={show} variant={typeAlert} className="mx-auto fixed-top w-50 mt-4" dismissible={dismissible}>
			<Alert.Heading>{title}</Alert.Heading>
			<p>{description}</p>
			{dismissible && (
				<>
					<div className="d-flex justify-content-end">
						<Button
							onClick={() => {
								setShow(false);
								callbackOnCloseAlert();
							}}
							variant={`outline-${typeAlert}`}>
							{textButton}
						</Button>
					</div>
				</>
			)}
		</Alert>
	);
};

export default CustomAlert;