import React from "react";
import { withRouter } from "react-router";
import {Link} from 'react-router-dom';
import Title from '../../components/Title';
import GreenButton from "../../components/GreenButton";

class DynamicTracker extends React.Component {
	constructor(props) {
		super(props);
	}

	goToPatientData = () => {
		this.props.history.push('/patient');
	}

	render () {
		return (
			<div className="app-content">
				<Title title="DynamicTracker" />
				<div className="container">
					<div className="page-description">
						<p>Welcome to the Ariel Dynamic Acute Pancreatitis Tracker (ADAPT).</p>
					</div>
					<div className="text-center mb-5">
						<GreenButton text="Patient Data" onClick={this.goToPatientData} />
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(DynamicTracker);

