import React from 'react';
import Select from 'react-select';
import {validateForm} from '../../utils/utils';
import GreenButton from "../../components/GreenButton";

const peritonitisOption = [
	{ value: true, label: 'Yes' },
	{ value: false, label: 'No' }
];

class PhysicalExam extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			physicalExam: {
				peritonitis: this.props.data.peritonitis || { value: true, label: 'Yes' },
				glasgowComaScore: this.props.data.glasgowComaScore || {value: '', unit: 'a.u'},
				eyeResponse: this.props.data.eyeResponse || {value: '', unit: 'a.u'},
				verbalResponse: this.props.data.verbalResponse || {value: '', unit: 'a.u'},
				motorResponse: this.props.data.motorResponse || {value: '', unit: 'a.u'}
			},
			rules: {
				peritonitis: {
					name: 'peritonitis',
					type: 'boolean',
					required: true
				},
				glasgowComaScore: {
					name: 'glasgowComaScore',
					type: 'integer',
					range: [{ min: 3, max: 15, unit: 'a.u'}],
					required: true
				},
				eyeResponse: {
					name: 'eyeResponse',
					type: 'integer',
					range: [
						{ min: 1, max: 4, unit: 'a.u' }
					],
					required: true
				},
				verbalResponse: {
					name: 'verbalResponse',
					type: 'integer',
					range: [
						{ min: 1, max: 5, unit: 'a.u' }
					],
					required: true
				},
				motorResponse: {
					name: 'motorResponse',
					type: 'integer',
					range: [
						{ min: 1, max: 6, unit: 'a.u' }
					],
					required: true
				}
			},
			errors: {}
		};

		this.changeInfo = this.changeInfo.bind(this);
	}

	changeInfo(e) {
		let params = this.state.physicalExam;
		params[e.target.id].value = e.target.value;

		this.setState({ physicalExam: params });
		this.props.updateInfo(params);
	}

	changeOption = (val) => {
		let {physicalExam} = this.state;
		physicalExam.peritonitis = val;

		this.setState({ physicalExam });
	}

	next = () => {
		const errors = {};
		const {rules, physicalExam} = this.state;

		Object.keys(physicalExam).forEach((data) => {
			if (rules[data]) {
				if (!validateForm(rules[data], physicalExam[data])) {
					errors[data] = {
						msg: 'Value is invalid!'
					};
				}
			}
		});

		if (Object.keys(errors).length > 0) {
			this.setState({ errors });
		} else {
			this.props.jumpToStep(this.props.step+1);
		}

	}

	back = () => {
		this.props.jumpToStep(this.props.step-1);
	}

	render() {
		const {physicalExam, errors} = this.state;
		return (
			<div>
				<div className="row">
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Peritonitis</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<Select
									options={peritonitisOption}
									className="patient-select"
									onChange={this.changeOption}
									value={physicalExam.peritonitis}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.peritonitis && errors.peritonitis.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Glasgow Coma Score</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="glasgowComaScore"
									className="round-input"
									value={physicalExam.glasgowComaScore.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.glasgowComaScore && errors.glasgowComaScore.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Eye Response</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="eyeResponse"
									className="round-input"
									value={physicalExam.eyeResponse.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.eyeResponse && errors.eyeResponse.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Verbal Response</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="verbalResponse"
									className="round-input"
									value={physicalExam.verbalResponse.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.verbalResponse && errors.verbalResponse.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Motor Response</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="motorResponse"
									className="round-input"
									value={physicalExam.motorResponse.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.motorResponse && errors.motorResponse.msg}
								</label>
							</div>
						</div>
					</div>
				</div>
				<div className="pt-3 text-center">
					<div className="d-flex justify-content-between">
						<GreenButton
							text="Back"
							className="mt-3"
							onClick={this.back}
						/>
						<GreenButton
							text="Next"
							className="mt-3"
							onClick={this.next}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default PhysicalExam;