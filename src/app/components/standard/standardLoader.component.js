import React, { Fragment } from "react";
import "./standardLoader.style.css";

const Loader = ({ size }) => {
	return (
		<Fragment>
			<div className="loader" style={{ width: size, height: size }}></div>
		</Fragment>
	);
};

export default Loader;
