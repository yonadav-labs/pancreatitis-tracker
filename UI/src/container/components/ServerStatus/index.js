import React from 'react';

const ServerStatus = (props) => {
	const {isOffline, text, contact_email} = props;
	const title = text ? text : 'ADAPT software is currently not available for general use. For questions, please contact';
	const msg = isOffline ? title : 'ADAPT is currently undergoing site maintenance. For questions, please contact';
	const email = contact_email ? ` ${contact_email}.`: null;
	return (
		<div className="blank-content d-flex">
			<div className="container m-auto">
				<h2 className="page-title p-3 text-center">
					{msg}{email}
				</h2>
			</div>
		</div>
	);
};

export default ServerStatus;