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
						<p>Welcome to the Ariel Dynamic Acute Pancreatitis Tracker (ADAPT).</p>
						<p>This quality-improvement tool is designed to aid in caring for patients in the emergency department suffering from acute pancreatitis (AP).</p>
						<p>Using <Link to="/patient">clinical information and lab results</Link>, ADAPT automatically computes clinical scoring systems--including SIRS, HAPS, Panc 3, BISAP, POP, Ranson, Glasgow, APACHE-II, and JSS--and predicts persistent organ failure.</p>
						<p>Future versions of this tool will feature longitudinal data trends and integration with electronic medical records (EMR) to eliminate manual data entry.</p>
						<p>Please enter as much information as possible. ADAPT has been designed to work with all levels of patient data.</p>
						<p><strong>For the most informative set of results, please order a complete chemistry profile, complete blood count, and arterial blood gas.</strong></p>
						<p>For questions, please reach out and <Link to="/contact">contact us</Link>.</p>
					</div>
					<div className="text-center mb-5">
						<GreenButton text="Patient Data" onClick={this.goToPatientData} />
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(About);

