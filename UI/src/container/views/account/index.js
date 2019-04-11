import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Title from '../../components/Title';
import GreenButton from "../../components/GreenButton";
import {validateAccount} from '../../utils/utils';
import {createAccount} from '../../actions';
import { ToastContainer, toast } from "react-toastify";


class Account extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			physician: {
				name: '',
				email: ''
			},
			patient: {
				name: '',
				email: ''
			},
			rules: {
				name: {
					name: 'name',
					type: 'text',
					required: true
				},
				email: {
					name: 'email',
					type: 'email',
					required: true
				}
			},
			errors: {}
		};

		this.changeInfo = this.changeInfo.bind(this);
		this.changePatient = this.changePatient.bind(this);
	}

	changeInfo(e) {
		let params = this.state.physician;
		params[e.target.id] = e.target.value;

		this.setState({ physician: params });
	}

	changePatient(e) {
		let params = this.state.patient;
		params[e.target.id] = e.target.value;

		this.setState({ patient: params });
	}

	createAccount = () => {
		const errors = {};
		const {rules, physician} = this.state;

		Object.keys(physician).forEach((data) => {
			if (rules[data]) {
				if (!validateAccount(rules[data], physician[data])) {
					errors[data] = {
						msg: 'Please enter valid data.'
					};
				}
			}
		});

		if (Object.keys(errors).length > 0) {
			this.setState({ errors });
		} else {
			this.setState({ errors });
			this.props.createAccount({
				username: physician.name,
				email: physician.email
			}).then((res) => {
				if (res.success) {
					toast.success('Successfully created!', {
						position: toast.POSITION.TOP_CENTER
					});

					this.props.history.push('/patient');
				} else {
					toast.error('Account creation failed!', {
						position: toast.POSITION.TOP_CENTER
					});
				}
			});
		}
	}

	render () {
		const {physician, patient, errors} = this.state;

		return (
			<div className="app-content">
				<Title title="Account Info" />
				<div className="container">
					<div className="page-section no-margin">
						<div className="row p-5">
							<div className="col-sm-12 col-md-3">
								<img src="/assets/images/circle.svg" />
							</div>
							<div className="col-sm-12 col-md-9 align-self-center">
								<div className="row mb-5">
									<div className="col-xs-12 col-sm-12 col-md-4">
										<div className="round-btn grey-label">Physician Name</div>
									</div>
									<div className="col-xs-12 col-sm-12 col-md-8">
										<input
											type="text"
											id="name"
											className="round-input"
											placeholder="John Doe"
											value={physician.name}
											onChange={this.changeInfo}
										/>
										<label className="color-danger pt-2 text-danger text-center warning-message">
											{errors.name && errors.name.msg}
										</label>
									</div>
								</div>
								<div className="row mb-5">
									<div className="col-xs-12 col-sm-12 col-md-4">
										<div className="round-btn grey-label">Email</div>
									</div>
									<div className="col-xs-12 col-sm-12 col-md-8">
										<input
											type="text"
											id="email"
											className="round-input"
											placeholder="johndoe@abc.com"
											value={physician.email}
											onChange={this.changeInfo}
										/>
										<label className="color-danger pt-2 text-danger text-center warning-message">
											{errors.email && errors.email.msg}
										</label>
									</div>
								</div>
							</div>
						</div>
						<div className="row p-5 d-none">
							<div className="col-sm-12 col-md-3">
								<img src="/assets/images/circle.svg" />
							</div>
							<div className="col-sm-12 col-md-9 align-self-center">
								<div className="row mb-5">
									<div className="col-xs-12 col-sm-12 col-md-4">
										<div className="round-btn grey-label">Patient Name</div>
									</div>
									<div className="col-xs-12 col-sm-12 col-md-8">
										<input
											type="text"
											id="name"
											className="round-input"
											placeholder="John Doe"
											value={patient.name}
											onChange={this.changePatient}
										/>
										<label className="color-danger pt-2 text-danger text-center warning-message">
											{errors.name && errors.name.msg}
										</label>
									</div>
								</div>
								<div className="row mb-5">
									<div className="col-xs-12 col-sm-12 col-md-4">
										<div className="round-btn grey-label">Email</div>
									</div>
									<div className="col-xs-12 col-sm-12 col-md-8">
										<input
											type="text"
											id="email"
											className="round-input"
											placeholder="johndoe@abc.com"
											value={patient.email}
											onChange={this.changePatient}
										/>
										<label className="color-danger pt-2 text-danger text-center warning-message">
											{errors.email && errors.email.msg}
										</label>
									</div>
								</div>
							</div>
						</div>
						
						<div className="pt-3 text-center">
							<div>
								<GreenButton
									text="Continue"
									className="mt-3"
									onClick={this.createAccount}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStatetoProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return Object.assign(
		{ dispatch },
		bindActionCreators({
			createAccount
		}, dispatch)
	);
};
	
export default connect(mapStatetoProps, mapDispatchToProps)(Account);

