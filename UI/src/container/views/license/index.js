import React from "react";
import Title from '../../components/Title';
import GreenButton from "../../components/GreenButton";

class License extends React.Component {
	goBack = () => {
		this.props.history.goBack();
	}

	render () {
		return (
			<div className="app-content">
				<Title title="License" />
				<div className="container">
					<div className="page-description">
						License Description
					</div>
					<div className="d-flex justify-content-between">
						<GreenButton text="Go Back" onClick={this.goBack} />
						<GreenButton text="Email PDF" />
					</div>
				</div>
			</div>
		);
	}
}

export default License;

