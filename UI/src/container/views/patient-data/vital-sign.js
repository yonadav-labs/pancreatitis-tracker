import React from 'react';
import ReactTooltip from 'react-tooltip';
import { validateStep } from '../../utils/utils';
import GreenButton from "../../components/GreenButton";
import { toast } from "react-toastify";

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
				temperature: this.props.units.temperature,
				bp_systolic: this.props.units.bp_systolic,
				bp_diastolic: this.props.units.bp_diastolic,
				heart_rate: this.props.units.heart_rate,
				resp_rate: this.props.units.resp_rate,
				spO2: this.props.units.spO2
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
						{ min: 30, max: 150, unit: 'mmHg' }
					]
				},
				heart_rate: {
					name: 'heart_rate',
					type: 'float',
					range: [
						{ min: 35, max: 200, unit: 'bpm' }
					]
				},
				resp_rate: {
					name: 'resp_rate',
					type: 'float',
					range: [
						{ min: 5, max: 60, unit: 'bpm' }
					]
				},
				spO2: {
					name: 'spO2',
					type: 'float',
					range: [
						{ min: 60, max: 100, unit: '%' }
					]
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
		let params = {...this.state.vitalSigns};
		params[e.target.id] = e.target.value;

		this.setState({ vitalSigns: params });
	}

	changeUnit = (id, value) => {
		let {units} = this.state;
		units[id] = value;

		this.setState({ units });
	}

	isValidated = () => {
		const {vitalSigns, units, rules} = this.state;
		const {data, errors} = validateStep(vitalSigns, units, rules);
		let isPageValid = true;

		if (Object.keys(errors).length > 0) {
			isPageValid = false;
			this.setState({ errors });
			toast.warn('Please fix all errors.', {
				position: toast.POSITION.TOP_CENTER
			});
		} else {
			this.props.updateInfo(data, units);
		}

		return isPageValid;
	}

	gotoStep = (delta) => {
		if (this.isValidated()) {
			this.props.jumpToStep(this.props.step+delta);
		}
	}

	handleKeyPress = (e, isSelect=false) => {
		if (e.keyCode === 13) {
			this.gotoStep(1);
		}
	}

	render() {
		const {vitalSigns, errors, units} = this.state;

		return (
			<div>
				<ReactTooltip effect='solid' className="tooltop-bar" />
				<div className="row">
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">Temperature</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="temperature"
										maxLength="7"
										className="round-input"
										value={vitalSigns.temperature}
										onChange={this.changeInfo}
										onKeyDown={event => this.handleKeyPress(event)}
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
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div
									className="round-btn grey-label"
									data-multiline="true"
								>
									Systolic BP
								</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="bp_systolic"
										maxLength="7"
										className="round-input"
										value={vitalSigns.bp_systolic}
										onChange={this.changeInfo}
										onKeyDown={event => this.handleKeyPress(event)}
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
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">Diastolic BP</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="bp_diastolic"
										maxLength="7"
										className="round-input"
										value={vitalSigns.bp_diastolic}
										onChange={this.changeInfo}
										onKeyDown={event => this.handleKeyPress(event)}
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
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div
									className="round-btn grey-label"
									data-multiline="true"
								>
									Heart Rate
								</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="heart_rate"
										maxLength="7"
										className="round-input"
										value={vitalSigns.heart_rate}
										onChange={this.changeInfo}
										onKeyDown={event => this.handleKeyPress(event)}
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
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label" data-tip="Respiratory Rate" data-event="click">
									Resp. Rate
									<img src="/assets/images/info-w.png" className="ml-3" style={{ height: '17px', marginTop: '-4px' }} />
								</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="resp_rate"
										maxLength="7"
										className="round-input"
										value={vitalSigns.resp_rate}
										onChange={this.changeInfo}
										onKeyDown={event => this.handleKeyPress(event)}
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
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div
									className="round-btn grey-label"
									data-multiline="true"
									data-tip="O₂ saturation"
									data-event="click"
								>
									Pulse Oximetry
									<img src="/assets/images/info-w.png" className="ml-3" style={{ height: '17px', marginTop: '-4px' }} />
								</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="spO2"
										maxLength="7"
										className="round-input"
										value={vitalSigns.spO2}
										onChange={this.changeInfo}
										onKeyDown={event => this.handleKeyPress(event)}
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
				<div className="pt-3 text-center docking-footer">
					<div className="d-flex justify-content-between">
						<GreenButton
							text="Back"
							className="mt-3"
							onClick={() => this.gotoStep(-1)}
						/>
						<GreenButton
							text="Next"
							className="mt-3"
							onClick={() => this.gotoStep(1)}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default VitalSigns;