import React from "react";
import {Link} from 'react-router-dom';
import Title from '../../components/Title';
import GreenButton from "../../components/GreenButton";

class Order extends React.Component {
	goBack = () => this.props.history.goBack()

	render () {
		return (
			<div className="app-content">
				<Title title="Order" />
				<div className="container">
					<div className="page-section text-center">
						<div className="order-title">Ariel</div>
						<div className="order-subtitle">Ariel Sign Up</div>
						<div className="order-description">
							<span>
								Clinicians, nurses, genetic counselors and other healthcare providers can
								can sign up here for an Ariel Medicine account for access to our services.
							</span>
							<span>
								If you are a patient and interested in accessing Ariel services,
								<Link to="#"> click here </Link> to find out how to get started with Ariel.
							</span>
						</div>
						<div className="d-flex">
							<div className="provider-section">
								<h4 className="mb-3">Personal Info</h4>
								<div>Healthcare Provider Type</div>
								<select className="provider-select">
									<option>Enter healthcare provider type</option>
									<option>Clinician</option>
									<option>Nurse</option>
									<option>Genetic Counselor</option>
								</select>
							</div>
						</div>
					</div>
					<div className="d-flex justify-content-center">
						<GreenButton text="Go Back" onClick={this.goBack} />
					</div>
				</div>
			</div>
		);
	}
}

export default Order;

