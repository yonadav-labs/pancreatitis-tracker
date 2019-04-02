import React from 'react';
import ReactTooltip from 'react-tooltip';
import {validateForm} from '../../utils/utils';
import GreenButton from "../../components/GreenButton";

class VitalSigns extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			vitalSigns: {
				temperature: this.props.data.temperature || {value: '', unit: 'celcius'},
				systolicBp: this.props.data.systolicBp || {value: '', unit: 'mmHg'},
				DiastolicBp: this.props.data.DiastolicBp || {value: '', unit: 'mmHg'},
				heartRate: this.props.data.heartRate || {value: '', unit: 'bpm'},
				RespiratoryRate: this.props.data.RespiratoryRate || {value: '', unit: 'bpm'}
			},
			rules: {
				temperature: {
					name: 'temperature',
					type: 'integer',
					range: [
						{ min: 28, max: 42, unit: 'celcius'},
						{ min: 82.4, max: 107.6, unit: 'fahrenheit'}
					],
					required: true
				},
				systolicBp: {
					name: 'systolicBp',
					type: 'integer',
					range: [{ min: 70, max: 205, unit: 'mmHg'}],
					required: true
				},
				DiastolicBp: {
					name: 'DiastolicBp',
					type: 'integer',
					range: [
						{ min: 50, max: 130, unit: 'mmHg' }
					],
					required: true
				},
				heartRate: {
					name: 'heartRate',
					type: 'integer',
					range: [
						{ min: 40, max: 190, unit: 'bpm' }
					],
					required: true
				},
				RespiratoryRate: {
					name: 'RespiratoryRate',
					type: 'integer',
					range: [
						{ min: 5, max: 50, unit: 'bpm' }
					],
					required: true
				}
			},
			errors: {}
		};

		this.changeInfo = this.changeInfo.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const params = { ...this.state.vitalSigns, ...nextProps.data};
		this.setState({ vitalSigns: params });
	}

	changeInfo(e) {
		let params = this.state.vitalSigns;
		params[e.target.id].value = e.target.value;

		this.setState({ vitalSigns: params });
		this.props.updateInfo(params);
	}

	changeUnit = (id, value) => {
		let params = this.state.vitalSigns;
		params[id].unit = value;

		this.setState({vitalSigns: params});
	}

	next = () => {
		const errors = {};
		const {rules, vitalSigns} = this.state;

		Object.keys(vitalSigns).forEach((data) => {
			if (rules[data]) {
				if (!validateForm(rules[data], vitalSigns[data])) {
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
		const {vitalSigns, errors} = this.state;
		return (
			<div>
				<ReactTooltip  effect='solid' />
				<div className="row">
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Temperature</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<div className="d-flex">
									<input
										type="text"
										id="temperature"
										className="round-input"
										value={vitalSigns.temperature.value}
										onChange={this.changeInfo}
									/>
									<select
										className="input-inline-select"
										onChange={e => this.changeUnit('temperature', e.target.value)}
									>
										<option value="celcius">C</option>
										<option value="fahrenheit">F</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.temperature && errors.temperature.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div
									className="round-btn grey-label"
									data-multiline="true"
									data-tip="In future (not MVP) may differentiate between standing and supine BP readings.<br /> Also in future may record patients 'normal/average/baseline BP' to compare to current."
								>
									Systolic BP
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="systolicBp"
									className="round-input"
									value={vitalSigns.systolicBp.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.systolicBp && errors.systolicBp.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Diastolic BP</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="DiastolicBp"
									className="round-input"
									value={vitalSigns.DiastolicBp.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.DiastolicBp && errors.DiastolicBp.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div
									className="round-btn grey-label"
									data-multiline="true"
									data-tip="In future (not MVP) may differentiate between standing and supine HR readings"
								>
									Heart Rate
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="heartRate"
									className="round-input"
									value={vitalSigns.heartRate.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.heartRate && errors.heartRate.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label" data-tip="Respiratory Rate">Resp. Rate</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="RespiratoryRate"
									className="round-input"
									value={vitalSigns.RespiratoryRate.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.RespiratoryRate && errors.RespiratoryRate.msg}
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

export default VitalSigns;