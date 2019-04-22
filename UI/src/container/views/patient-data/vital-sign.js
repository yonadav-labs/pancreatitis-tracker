import React from 'react';
import ReactTooltip from 'react-tooltip';
import {validateForm} from '../../utils/utils';
import GreenButton from "../../components/GreenButton";
import {
	fToC
} from '../../utils/utils';

class VitalSigns extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			vitalSigns: {
				temperature: this.props.data.temperature,
				bp_systolic: this.props.data.bp_systolic,
				bp_diastolic: this.props.data.bp_diastolic,
				heart_rate: this.props.data.heart_rate,
				resp_rate: this.props.data.resp_rate,
				spO2: this.props.data.spO2
			},
			units: {
				temperature: this.props.units.temperature || 'celcius',
				bp_systolic: this.props.units.bp_systolic || 'mmHg',
				bp_diastolic: this.props.units.bp_diastolic || 'mmHg',
				heart_rate: this.props.units.heart_rate || 'bpm',
				resp_rate: this.props.units.resp_rate || 'bpm',
				spO2: this.props.units.spO2 || '%'
			},
			rules: {
				temperature: {
					name: 'temperature',
					type: 'float',
					range: [
						{ min: 28, max: 42, unit: 'celcius'},
						{ min: 82.4, max: 107.6, unit: 'fahrenheit'}
					]
				},
				bp_systolic: {
					name: 'bp_systolic',
					type: 'float',
					range: [{ min: 70, max: 205, unit: 'mmHg'}]
				},
				bp_diastolic: {
					name: 'bp_diastolic',
					type: 'float',
					range: [
						{ min: 50, max: 130, unit: 'mmHg' }
					]
				},
				heart_rate: {
					name: 'heart_rate',
					type: 'float',
					range: [
						{ min: 40, max: 190, unit: 'bpm' }
					]
				},
				resp_rate: {
					name: 'resp_rate',
					type: 'float',
					range: [
						{ min: 5, max: 50, unit: 'bpm' }
					]
				},
				spO2: {
					name: 'spO2',
					type: 'float',
					range: [
						{ min: 80, max: 100, unit: '%' }
					]
				}
			},
			errors: {},
			temperateOption: [
				{value: 'celcius', label: '°C'},
				{value: 'fahrenheit', label: '°F'}
			]
		};

		this.changeInfo = this.changeInfo.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const params = { ...this.state.vitalSigns, ...nextProps.data};
		this.setState({ vitalSigns: params });
	}

	changeInfo(e) {
		let params = this.state.vitalSigns;
		const {rules} = this.state;
		if (rules[e.target.id] && rules[e.target.id].type === "integer") {
			if (!isNaN(parseFloat(e.target.value))) {
				params[e.target.id].value = parseFloat(e.target.value);
			} else {
				params[e.target.id].value = e.target.value;
			}

		} else {
			params[e.target.id].value = e.target.value;
		}

		this.setState({ vitalSigns: params });
	}

	changeUnit = (id, value) => {
		let {units} = this.state;
		units[id] = value;

		this.setState({ units });
	}

	isValidated = () => {
		let isPageValidated = false;
		const {vitalSigns, units, rules} = this.state;
		const errors = {};

		Object.keys(vitalSigns).forEach((data) => {
			if (rules[data]) {
				const validateResponse = validateForm(rules[data], vitalSigns[data], units[data]);
				if (!validateResponse.success) {
					errors[data] = {
						msg: validateResponse.msg
					};
				}
			}
		});

		if (Object.keys(errors).length > 0) {
			this.setState({ errors });
		} else {
			let temp = Object.assign({}, vitalSigns);
			
			Object.keys(vitalSigns).forEach((attr) => {
				if (rules[attr] && (rules[attr].type === "integer" || rules[attr].type === "float")) {
					if (!isNaN(parseFloat(vitalSigns[attr].value))) {
						temp[attr].value = parseFloat(vitalSigns[attr].value);
					}
				}
			});

			if (units.temperature === 'fahrenheit') {
				let temperature = Object.assign({}, temp.temperature);
				
				temperature.calculatedValue = fToC(temperature.value);
				temp.temperature = temperature;
			}

			isPageValidated = true;
			this.props.updateInfo(temp, units);
		}

		return isPageValidated;
	}

	next = () => {
		if (this.isValidated()) {
			this.props.jumpToStep(this.props.step+1);
		}
	}

	back = () => {
		this.props.jumpToStep(this.props.step-1);
	}

	render() {
		const {vitalSigns, errors, units} = this.state;

		return (
			<div>
				<ReactTooltip effect='solid' className="tooltop-bar" />
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
										maxLength="7"
										className="round-input"
										value={units.temperature && vitalSigns.temperature.value}
										onChange={this.changeInfo}
									/>
									<select
										className="input-inline-select"
										defaultValue={units.temperature}
										onChange={e => this.changeUnit('temperature', e.target.value)}
									>
										<option value="celcius">°C</option>
										<option value="fahrenheit">°F</option>
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
								<div className="d-flex">
									<input
										type="text"
										id="bp_systolic"
										maxLength="7"
										className="round-input"
										value={vitalSigns.bp_systolic && vitalSigns.bp_systolic.value}
										onChange={this.changeInfo}
									/>
									<select className="input-inline-select">
										<option value="mmHg">mmHg</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.bp_systolic && errors.bp_systolic.msg}
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
								<div className="d-flex">
									<input
										type="text"
										id="bp_diastolic"
										maxLength="7"
										className="round-input"
										value={vitalSigns.bp_diastolic && vitalSigns.bp_diastolic.value}
										onChange={this.changeInfo}
									/>
									<select className="input-inline-select">
										<option value="mmHg">mmHg</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.bp_diastolic && errors.bp_diastolic.msg}
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
								<div className="d-flex">
									<input
										type="text"
										id="heart_rate"
										maxLength="7"
										className="round-input"
										value={vitalSigns.heart_rate && vitalSigns.heart_rate.value}
										onChange={this.changeInfo}
									/>
									<select className="input-inline-select">
										<option value="bpm">bpm</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.heart_rate && errors.heart_rate.msg}
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
								<div className="d-flex">
									<input
										type="text"
										id="resp_rate"
										maxLength="7"
										className="round-input"
										value={vitalSigns.resp_rate && vitalSigns.resp_rate.value}
										onChange={this.changeInfo}
									/>
									<select className="input-inline-select">
										<option value="bpm">bpm</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.resp_rate && errors.resp_rate.msg}
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
									data-tip="O₂ saturation"
								>
									Pulse Oximetry
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<div className="d-flex">
									<input
										type="text"
										id="spO2"
										maxLength="7"
										className="round-input"
										value={vitalSigns.spO2 && vitalSigns.spO2.value}
										onChange={this.changeInfo}
									/>
									<select className="input-inline-select">
										<option value="%">%</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.spO2 && errors.spO2.msg}
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