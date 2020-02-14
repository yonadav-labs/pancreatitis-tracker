import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Title from '../../components/Title';
import GreenButton from "../../components/GreenButton";
import { checkValidity } from '../../utils/utils';
import { createAccountAction, resetAccountAction, loginAccountAction } from '../../actions';
import { toast } from "react-toastify";


class Account extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			physician: {
				name: '',
				email: '',
				password: ''
			},
			rules: {
				name: {
					type: 'name',
					required: true
				},
				email: {
					type: 'email',
					required: true
				},
				password: {
					type: 'password',
					default: 'arielbeyondgenetics',
					isDefault: false,
					required: true
				}
			},
			errors: {},
			pageError: ''
		};

		this.changeInfo = this.changeInfo.bind(this);
	}

	changeInfo(e) {
		let params = this.state.physician;
		params[e.target.id] = e.target.value;

		this.setState({ physician: params });
	}

	_handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			this.createAccount();
		}
	}

	authenticateAccount = (actionType) => {
		const errors = {};
		const {physician} = this.state;

		this.setState({pageError: {}});

		let rules = Object.assign({}, this.state.rules);
		if (actionType !== 1) {
			delete rules['name'];
		}

		Object.keys(physician).forEach((field) => {
			const res = checkValidity(rules[field], physician[field], null);
			if (!res.isValid) {
				errors[field] = res.msg;
			}
		});

		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ errors });

			switch (actionType) {
				case 1:
					this.props.createAccountAction({
						name: physician.name,
						email: physician.email,
						password: physician.password,
						url: window.location.href
					}).then((res) => {
						if (res.success) {
							toast.success('Welcome to ADAPT!', {
								position: toast.POSITION.TOP_CENTER
							});

							this.props.history.push('/about');
						} else {
							this.setState({ pageError: res });
						}
					});
					break;

				case 2:
					this.props.resetAccountAction({
						name: physician.name,
						email: physician.email,
						password: physician.password,
						url: window.location.href
					}).then((res) => {
						if (res.success) {
							// define codes after resetting
						} else {
							this.setState({ pageError: res });
						}
					});
					break;

				default:
					this.props.loginAccountAction({
						name: physician.name,
						email: physician.email,
						password: physician.password,
						url: window.location.href
					}).then((res) => {
						if (res.success || (!res.success
								&& res.status === "password_incorrect"
								&& rules.password.isDefault === true
								&& physician.password === rules.password.default)
						) {
							toast.success('Welcome to ADAPT!', {
								position: toast.POSITION.TOP_CENTER
							});

							this.props.history.push('/about');
						} else {
							this.setState({ pageError: res });
						}
					});


			}
		}
	}

	render () {
		const {physician, errors} = this.state;

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
											className="round-input capitalize"
											placeholder="John Doe"
											value={physician.name}
											onChange={this.changeInfo}
										/>
										<label className="color-danger pt-2 text-danger text-center warning-message">
											{errors.name}
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
											onKeyDown={this._handleKeyDown}
										/>
										<label className="color-danger pt-2 text-danger text-center warning-message">
											{errors.email}
										</label>
									</div>
								</div>
								<div className="row mb-5">
									<div className="col-xs-12 col-sm-12 col-md-4">
										<div className="round-btn grey-label">Password</div>
									</div>
									<div className="col-xs-12 col-sm-12 col-md-8">
										<input
											type="password"
											id="password"
											className="round-input"
											value={physician.password}
											onChange={this.changeInfo}
											onKeyDown={this._handleKeyDown}
										/>
										<label className="color-danger pt-2 text-danger text-center warning-message">
											{errors.password}
										</label>
									</div>
								</div>
							</div>
						</div>

						<div
							className={
								this.state.pageError && this.state.pageError.error
									? "pt-3 pb-3 text-danger text-center warning-message"
									: "pt-3 pb-3 text-success text-center warning-messag"
							}
						>
							{this.state.pageError ? this.state.pageError.msg: ''}
						</div>
						
						<div className="pt-3 text-center mb-5">
							<div>
								<GreenButton
									text="Continue"
									className="mt-3 mr-3"
									onClick={() => this.authenticateAccount(0)}
								/>
								<GreenButton
									text="New Account"
									className="mt-3 mr-3"
									onClick={() => this.authenticateAccount(1)}
								/>
								<GreenButton
									text="Reset Account"
									className="mt-3"
									onClick={() => this.authenticateAccount(2)}
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
		bindActionCreators({
			createAccountAction,
			loginAccountAction,
			resetAccountAction
		}, dispatch)
	);
};
	
export default connect(mapStatetoProps, mapDispatchToProps)(Account);

