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
						<p>Welcome to the ADAPT demonstration site.</p>
						<p>This research-only tool leverages manual-entry data to demonstrate state-of-art
						guidelines for acute pancreatitis management.</p>
						<p>For interest in a clinical-use enterprise version of ADAPT software with health record integration, submit your contact information using our Feedback survey and we
						will contact you regarding a potential collaboration as a pilot center.</p>
						<p>This quality-improvement tool is designed to aid in caring for patients in
						the emergency department suffering from acute pancreatitis (AP).</p>
						<p>Using <Link to="/patient">clinical information and lab results</Link>, ADAPT
						automatically computes clinical scoring systems--including SIRS, HAPS, Panc 3,
						BISAP, POP, Ranson, Glasgow, APACHE-II, and JSS--and predicts persistent organ
						failure.</p>
						<p>Please enter as much information as possible. ADAPT has been designed to work
						with all levels of patient data.</p>
						<p><strong>For the most informative set of results, please order a complete
						chemistry profile, complete blood count, and arterial blood gas.</strong></p>
						<p>Calculator tools function as presented at Digestive Disease Week 2019,
						Paragomi et al., Dynamic Analysis of Patients with Acute Pancreatitis:
						Validation of a New Predictive Tool for Severity Assessment in a Large
						Prospective Cohort, Gastroenterology, 2019, Volume 156, Issue 6, Supplement 1,
						Pages S-122–S-123. DOI: <a href="https://doi.org/10.1016/S0016-5085(19)37098-2"
							target="_blank">https://doi.org/10.1016/S0016-5085(19)37098-2</a></p>
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

