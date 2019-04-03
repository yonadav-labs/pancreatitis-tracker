import React from "react";
import Title from '../../components/Title';
import GreenButton from "../../components/GreenButton";
import { Link } from "react-router-dom";
import {validateAccount} from '../../utils/utils';

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
			},
			rules: {
				firstName: {
					name: 'sex',
					type: 'text',
					required: true
				},
				lastName: {
					name: 'lastName',
					type: 'text',
					required: true
				},
				email: {
					name: 'email',
					type: 'email',
					required: true
				},
				confirmEmail: {
					name: 'confirmEmail',
					type: 'email',
					required: true
				},
				phone: {
					name: 'phone',
					type: 'phone',
					required: true
				},
				confirmPhone: {
					name: 'confirmPhone',
					type: 'phone',
					required: true
				}
			},
			errors: {},
			patientErrors: {}
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

	saveAccount = () => {
		const errors = {};
		const patientErrors = {};
		const {rules, physician, patient} = this.state;

		Object.keys(physician).forEach((data) => {
			if (rules[data]) {
				if (!validateAccount(rules[data], physician[data])) {
					errors[data] = {
						msg: 'Please provide a valid data'
					};
				}
			}
		});

		Object.keys(patient).forEach((data) => {
			if (rules[data]) {
				if (!validateAccount(rules[data], patient[data])) {
					patientErrors[data] = {
						msg: 'Please provide a valid data'
					};
				}
			}
		});

		if (physician.email !== physician.confirmEmail) {
			errors.confirmEmail = { msg: 'Email is not matching'};
			errors.email = { msg: 'Email is not matching'};
		}

		if (patient.email !== patient.confirmEmail) {
			patientErrors.confirmEmail = { msg: 'Email is not matching'};
			patientErrors.email = { msg: 'Email is not matching'};
		}

		if (physician.phone !== physician.confirmPhone) {
			errors.phone = { msg: 'Phone number is not matching'};
			errors.confirmPhone = { msg: 'Phone number is not matching'};
		}

		if (
			Object.keys(errors).length > 0 ||
			Object.keys(patientErrors).length > 0
		) {
			this.setState({ errors: errors, patientErrors: patientErrors });
		} else {
		}
	}

	render () {
		const {physician, patient, errors, patientErrors} = this.state;

		return (
			<div className="app-content">
				<Title title="Account Info" />
				<div className="container">
					<div className="page-section">
						<div className="row">
							<div className="col-xs-12 col-md-6">
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
										<label className="color-danger pt-2 text-danger text-center warning-message">
											{errors.firstName && errors.firstName.msg}
										</label>
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
										<label className="color-danger pt-2 text-danger text-center warning-message">
											{errors.lastName && errors.lastName.msg}
										</label>
									</div>
								</div>
								<div className="row mb-5">
									<div className="col-xs-12 col-sm-6">
										<div className="round-btn grey-label">Email</div>
									</div>
									<div className="col-xs-12 col-sm-6">
										<input
											type="email"
											id="email"
											className="round-input"
											value={physician.email}
											onChange={this.changePhysician}
										/>
										<label className="color-danger pt-2 text-danger text-center warning-message">
											{errors.email && errors.email.msg}
										</label>
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
										<label className="color-danger pt-2 text-danger text-center warning-message">
											{errors.confirmEmail && errors.confirmEmail.msg}
										</label>
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
										<label className="color-danger pt-2 text-danger text-center warning-message">
											{errors.phone && errors.phone.msg}
										</label>
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
										<label className="color-danger pt-2 text-danger text-center warning-message">
											{errors.confirmPhone && errors.confirmPhone.msg}
										</label>
									</div>
								</div>
							</div>
							<div className="col-xs-12 col-md-6">
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
										<label className="color-danger pt-2 text-danger text-center warning-message">
											{patientErrors.firstName && patientErrors.firstName.msg}
										</label>
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
										<label className="color-danger pt-2 text-danger text-center warning-message">
											{patientErrors.lastName && patientErrors.lastName.msg}
										</label>
									</div>
								</div>
								<div className="row mb-5">
									<div className="col-xs-12 col-sm-6">
										<div className="round-btn grey-label">Email</div>
									</div>
									<div className="col-xs-12 col-sm-6">
										<input
											type="email"
											id="email"
											className="round-input"
											value={patient.email}
											onChange={this.changePatient}
										/>
										<label className="color-danger pt-2 text-danger text-center warning-message">
											{patientErrors.email && patientErrors.email.msg}
										</label>
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
										<label className="color-danger pt-2 text-danger text-center warning-message">
											{patientErrors.confirmEmail && patientErrors.confirmEmail.msg}
										</label>
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
								<GreenButton text="Submit" className="mt-3" onClick={this.saveAccount} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AccountInfo;

