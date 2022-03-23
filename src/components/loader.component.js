import React, { Fragment } from "react";
import "../styles/loader.style.css";

export const Loader = ({ size }) => {
	return (
		<Fragment>
			<div className="loader" style={{ width: size, height: size }}></div>
		</Fragment>
	);
};
