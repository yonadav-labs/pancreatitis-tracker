import React from 'react';
import {validateForm} from '../../utils/utils';
import GreenButton from "../../components/GreenButton";

class ArterialGases extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			arterialGases: {
				o2Saturation: this.props.data.o2Saturation || {value: '', unit: '%'},
				ph: this.props.data.ph || {value: '', unit: ''},
				pao2: this.props.data.pao2 || {value: '', unit: 'mmHg'},
				paco2: this.props.data.paco2 || {value: '', unit: 'mmHg'},
				hco3_artieral: this.props.data.hco3_artieral || {value: '', unit: 'mmol/L'},
				spo2: this.props.data.spo2 || {value: '', unit: '%'},
				fio2: this.props.data.fio2 || {value: '', unit: '%'},
				baseExcess: this.props.data.baseExcess || {value: '', unit: 'mEq/L'}
			},
			units: {
				o2Saturation: this.props.units.o2Saturation || '%',
				ph: this.props.units.ph || '',
				pao2: this.props.units.pao2 || 'mmHg',
				paco2: this.props.units.paco2 || 'mmHg',
				hco3_artieral: this.props.units.hco3_artieral || 'mmol/L',
				spo2: this.props.units.spo2 || '%',
				fio2: this.props.units.fio2 || '%',
				baseExcess: this.props.units.baseExcess || 'mEq/L'
			},
			rules: {
				o2Saturation: {
					name: 'o2Saturation',
					type: 'integer',
					range: [
						{ min: 80, max: 100, unit: '%'}
					],
					required: true
				},
				ph: {
					name: 'ph',
					type: 'integer',
					range: [
						{ min: 7.14, max: 7.65, unit: ''}
					],
					required: true
				},
				pao2: {
					name: 'pao2',
					type: 'integer',
					range: [{ min: 50, max: 75, unit: 'mmHg'}],
					required: true
				},
				paco2: {
					name: 'paco2',
					type: 'integer',
					range: [
						{ min: 30, max: 50, unit: 'mmHg' }
					],
					required: true
				},
				hco3_artieral: {
					name: 'hco3_artieral',
					type: 'integer',
					range: [
						{ min: 13, max: 55, unit: 'mmol/L' }
					],
					required: true
				},
				spo2: {
					name: 'spo2',
					type: 'integer',
					range: [
						{ min: 80, max: 100, unit: '%' }
					],
					required: true
				},
				fio2: {
					name: 'fio2',
					type: 'integer',
					range: [
						{ min: 0.2, max: 1, unit: '%' }
					],
					required: true
				},
				baseExcess: {
					name: 'baseExcess',
					type: 'integer',
					range: [
						{ min: -5, max: 3, unit: 'mEq/L' }
					],
					required: true
				}
			},
			errors: {}
		};

		this.changeInfo = this.changeInfo.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const params = { ...this.state.arterialGases, ...nextProps.data};
		this.setState({ arterialGases: params });
	}

	changeInfo(e) {
		let params = this.state.arterialGases;
		params[e.target.id].value = e.target.value;

		this.setState({ arterialGases: params });
		this.props.updateInfo(params, this.state.units);
	}

	next = () => {
		const errors = {};
		const {rules, arterialGases, units} = this.state;

		Object.keys(arterialGases).forEach((data) => {
			if (rules[data]) {
				const validateResponse = validateForm(rules[data], arterialGases[data], units[data]);
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
			this.setState({ errors: {} });
			this.props.savePatientData(arterialGases, this.props.step);
			alert('Success');
		}

	}

	back = () => {
		this.props.jumpToStep(this.props.step-1);
	}

	render() {
		const {arterialGases, errors} = this.state;
		return (
			<div>
				<h2 className="section-title">Pulse Oximetry</h2>
				<div className="row">
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">O₂ saturation</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="o2Saturation"
									className="round-input"
									value={arterialGases.o2Saturation.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.o2Saturation && errors.o2Saturation.msg}
								</label>
							</div>
						</div>
					</div>
				</div>
				<h2 className="section-title">Arterial Gases</h2>
				<div className="row">
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">pH</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="ph"
									className="round-input"
									value={arterialGases.ph.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.ph && errors.ph.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">PaO₂</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="pao2"
									className="round-input"
									value={arterialGases.pao2.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.pao2 && errors.pao2.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">PaCO₂</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="paco2"
									className="round-input"
									value={arterialGases.paco2.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.paco2 && errors.paco2.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">HCO₃⁻ (arterial)</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="hco3_artieral"
									className="round-input"
									value={arterialGases.hco3_artieral.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.hco3_artieral && errors.hco3_artieral.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">SpO₂</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="spo2"
									className="round-input"
									value={arterialGases.spo2.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.spo2 && errors.spo2.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">FiO₂</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="fio2"
									className="round-input"
									value={arterialGases.fio2.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.fio2 && errors.fio2.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Base Excess</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="baseExcess"
									className="round-input"
									value={arterialGases.baseExcess.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.baseExcess && errors.baseExcess.msg}
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

export default ArterialGases;