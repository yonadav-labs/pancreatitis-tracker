import React from "react";
import { withRouter } from "react-router";
import {Link} from 'react-router-dom';
import Title from '../../components/Title';
import GreenButton from "../../components/GreenButton";

class About extends React.Component {
	constructor(props) {
		super(props);
	}

	goToPatientData = () => {
		this.props.history.push('/patient');
	}

	render () {
		return (
			<div className="app-content">
				<Title title="About" />
				<div className="container">
					<div className="page-description">
						<p>Welcome to Ariel Precision Medicine's Acute Pancreatitis Severity Calculator (ADAPT).</p>
						<p>This quality-improvement tool has been designed to aid in caring for patients who have arrived in the emergency department suffering from an acute pancreatitis (AP) attack.</p>
						<p>Using <Link to="/patient">clinical information and lab results</Link>, ADAPT automatically computes several literature-backed clinical scoring systems, in addition to the Mounzer rules.</p>
						<p>Future versions of this tool will feature longitudinal data trends and integration via the electronic medical record (EMR) to eliminate the need to input data manually.</p>
						<p>Please enter as much information as possible. The ADAPT tool has been designed to work with all levels of patient data.</p>
						<p><strong>For the most informative set of results, please order a complete chemistry profile, complete blood count, and arterial blood gas.</strong></p>
						<p>For questions, please reach out and <Link to="/contact">contact us.</Link></p>
						<p>For feedback and suggestions, please enter your thoughts in the feedback area of this application.</p>
					</div>
					<div className="text-center">
						<GreenButton text="Patient Data" onClick={this.goToPatientData} />
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(About);

