import React from "react";
import Title from '../../components/Title';
import GreenButton from "../../components/GreenButton";
// import { Link } from "react-router-dom";

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
			}
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

	render () {
		const {physician, patient} = this.state;
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
										<div className="round-btn grey-label">Patient Name</div>
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
											placeholder="joedoe@abc.com"
											value={physician.email}
											onChange={this.changeInfo}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="row p-5">
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
											placeholder="joedoe@abc.com"
											value={patient.email}
											onChange={this.changePatient}
										/>
									</div>
								</div>
							</div>
						</div>
						
						<div className="pt-3 text-center">
							<div>
								<GreenButton text="Load Data" className="mt-3" />
							</div>
						</div>

					</div>
				</div>
			</div>
		);
	}
}

export default Account;

