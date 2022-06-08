import React from 'react';

const SizeDevices = () => {
	return (
		<div className="vw-100 vh-100 d-flex flex-column justify-content-center align-items-center p-5" style={{backgroundPosition: 'center center',
		backgroundRepeat: 'no-repeat' , backgroundImage: "url('images/avatar.png')"}}>
			<img src="images/tv.svg" alt='' width={100} className="mb-5"></img>
			<span className='h6' style={{textAlign:"center"}}> 
					Please, switch to a higher resolution device to live this interactive experience.
			</span>
		</div>
	);
};

export default SizeDevices;
