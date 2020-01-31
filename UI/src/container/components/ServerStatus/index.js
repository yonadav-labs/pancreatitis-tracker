import React from 'react';

const ServerStatus = (props) => {
	const {data, isOffline, text} = props;
	const title = text ? text : 'ADAPT software is currently not available for general use.';
	const msg = isOffline ? title : 'ADAPT is currently undergoing site maintenance.';
	return (
		<div className="blank-content d-flex">
			<div className="container m-auto">
				<h2 className="page-title p-3 text-center">
					{msg}
				</h2>
			</div>
		</div>
	);
};

export default ServerStatus;