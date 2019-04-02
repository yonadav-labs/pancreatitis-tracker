import React from "react";
import {Link} from 'react-router-dom';
import Title from '../../components/Title';
import GreenButton from "../../components/GreenButton";

class About extends React.Component {
	constructor(props) {
		super(props);
	}

	goToOrder = () => {
		this.props.history.push('/order');
	}

	render () {
		return (
			<div className="app-content">
				<Title title="Contact Us" />
				<div className="container">
					<div className="page-description">
						<p>Welcome to Ariel Precision Medicine's Acute Pancreatitis Severity Calculator (APSC).</p>
						<p>This quality-improvement tool has been designed to aid in caring for patients who have arrived in the emergency department suffering from an acute pancreatitis (AP) attack.</p>
						<p>Using <Link to="/patient">clinical information and lab results</Link>, the APSC automatically computes several literature-backed clinical scoring systems, in addition to the Mounzer rules.</p>
						<p>Future versions of this tool will feature longitudinal data trends and integration via the electronic medical record (EMR) to eliminate the need to input data manually.</p>
						<p>Please enter as much information as possible. The APSC tool has been designed to work with all levels of patient data.</p>
						<p>For questions, please reach out and <Link to="/contact">contact us.</Link></p>
						<p>For feedback and suggestions, please enter your thoughts in the feedback area of this application.</p>
					</div>
					<div className="space-between-section">
						<GreenButton text="Email Us" />
						<GreenButton text="Order ArielDx" onClick={this.goToOrder} />
					</div>
				</div>
			</div>
		);
	}
}

export default About;

