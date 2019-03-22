import React from "react";
import Title from '../../components/Title';
import GreenButton from "../../components/GreenButton";
import { Link } from "react-router-dom";

class AccountInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			physician: {
				firstName: '',
				lastName: '',
				email: '',
				confirmEmail: '',
				phone: '',
				confirmPhone: ''
			},
			patient: {
				firstName: '',
				lastName: '',
				email: '',
				confirmEmail: ''
			}
		};

		this.changePhysician = this.changePhysician.bind(this);
		this.changePatient = this.changePatient.bind(this);
	}

	changePhysician(e) {
		let params = this.state.physician;
		params[e.target.id] = e.target.value;

		this.setState({ physician: params });
	}

	changePatient(e) {
		let params = this.state.patient;
		params[e.target.id] = e.target.value;

		this.setState({ patient: params });
	}

	render () {
		const {physician, patient} = this.state;
		return (
			<div className="app-content">
				<Title title="Account Info" />
				<div className="container">
					<div className="page-section">
						<div className="row">
							<div className="col-xs-12 col-sm-6">
								<div className="row justify-content-center mb-3 pb-3">
									<GreenButton text="Physician" />
								</div>
								<div className="row mb-5">
									<div className="col-xs-12 col-sm-6">
										<div className="round-btn grey-label">First Name</div>
									</div>
									<div className="col-xs-12 col-sm-6">
										<input
											type="text"
											id="firstName"
											className="round-input"
											value={physician.firstName}
											onChange={this.changePhysician}
										/>
									</div>
								</div>
								<div className="row mb-5">
									<div className="col-xs-12 col-sm-6">
										<div className="round-btn grey-label">Last Name</div>
									</div>
									<div className="col-xs-12 col-sm-6">
										<input
											type="text"
											id="lastName"
											className="round-input"
											value={physician.lastName}
											onChange={this.changePhysician}
										/>
									</div>
								</div>
								<div className="row mb-5">
									<div className="col-xs-12 col-sm-6">
										<div className="round-btn grey-label">Email</div>
									</div>
									<div className="col-xs-12 col-sm-6">
										<input
											type="text"
											id="email"
											className="round-input"
											value={physician.email}
											onChange={this.changePhysician}
										/>
									</div>
								</div>
								<div className="row mb-5">
									<div className="col-xs-12 col-sm-6">
										<div className="round-btn grey-label">Confirm Email</div>
									</div>
									<div className="col-xs-12 col-sm-6">
										<input
											type="text"
											id="confirmEmail"
											className="round-input"
											value={physician.confirmEmail}
											onChange={this.changePhysician}
										/>
									</div>
								</div>
								<div className="row mb-5">
									<div className="col-xs-12 col-sm-6">
										<div className="round-btn grey-label">Phone Number</div>
									</div>
									<div className="col-xs-12 col-sm-6">
										<input
											type="text"
											id="phone"
											className="round-input"
											value={physician.phone}
											onChange={this.changePhysician}
										/>
									</div>
								</div>
								<div className="row mb-5">
									<div className="col-xs-12 col-sm-6">
										<div className="round-btn grey-label">Confirm Phone</div>
									</div>
									<div className="col-xs-12 col-sm-6">
										<input
											type="text"
											id="confirmPhone"
											className="round-input"
											value={physician.confirmPhone}
											onChange={this.changePhysician}
										/>
									</div>
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<div className="row justify-content-center mb-3 pb-3">
									<GreenButton text="Patient" />
								</div>
								<div className="row mb-5">
									<div className="col-xs-12 col-sm-6">
										<div className="round-btn grey-label">First Name</div>
									</div>
									<div className="col-xs-12 col-sm-6">
										<input
											type="text"
											id="firstName"
											className="round-input"
											value={patient.firstName}
											onChange={this.changePatient}
										/>
									</div>
								</div>
								<div className="row mb-5">
									<div className="col-xs-12 col-sm-6">
										<div className="round-btn grey-label">Last Name</div>
									</div>
									<div className="col-xs-12 col-sm-6">
										<input
											type="text"
											id="lastName"
											className="round-input"
											value={patient.lastName}
											onChange={this.changePatient}
										/>
									</div>
								</div>
								<div className="row mb-5">
									<div className="col-xs-12 col-sm-6">
										<div className="round-btn grey-label">Email</div>
									</div>
									<div className="col-xs-12 col-sm-6">
										<input
											type="text"
											id="email"
											className="round-input"
											value={patient.email}
											onChange={this.changePatient}
										/>
									</div>
								</div>
								<div className="row mb-5">
									<div className="col-xs-12 col-sm-6">
										<div className="round-btn grey-label">Confirm Email</div>
									</div>
									<div className="col-xs-12 col-sm-6">
										<input
											type="text"
											id="confirmEmail"
											className="round-input"
											value={patient.confirmEmail}
											onChange={this.changePatient}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="pt-3 text-center">
							<div>
								<Link to="/license" className="grey-link">
									Creation of an account verifies that you have read the EULA, click here to read this documentation.
								</Link>
							</div>
							<div>
								<GreenButton text="Submit" className="mt-3" />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AccountInfo;

