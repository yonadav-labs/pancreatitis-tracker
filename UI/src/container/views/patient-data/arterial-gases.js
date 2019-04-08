import React from 'react';
import {validateForm} from '../../utils/utils';
import GreenButton from "../../components/GreenButton";

class ArterialGases extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			arterialGases: {
				ph: this.props.data.ph || {value: '', unit: ''},
				paO2: this.props.data.paO2 || {value: '', unit: 'mmHg'},
				paCO2: this.props.data.paCO2 || {value: '', unit: 'mmHg'},
				hco3_artieral: this.props.data.hco3_artieral || {value: '', unit: 'mmol/L'},
				fiO2: this.props.data.fiO2 || {value: '', unit: '%'},
				base_excess: this.props.data.base_excess || {value: '', unit: 'mEq/L'}
			},
			units: {
				ph: this.props.units.ph || '',
				paO2: this.props.units.paO2 || 'mmHg',
				paCO2: this.props.units.paCO2 || 'mmHg',
				hco3_artieral: this.props.units.hco3_artieral || 'mmol/L',
				fiO2: this.props.units.fiO2 || '%',
				base_excess: this.props.units.base_excess || 'mEq/L'
			},
			rules: {
				ph: {
					name: 'ph',
					type: 'integer',
					range: [
						{ min: 7.14, max: 7.65, unit: ''}
					],
					required: true
				},
				paO2: {
					name: 'paO2',
					type: 'integer',
					range: [{ min: 50, max: 75, unit: 'mmHg'}],
					required: true
				},
				paCO2: {
					name: 'paCO2',
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
				fiO2: {
					name: 'fiO2',
					type: 'integer',
					range: [
						{ min: 0.2, max: 1, unit: '%' }
					],
					required: true
				},
				base_excess: {
					name: 'base_excess',
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
			this.props.savePatientData(arterialGases);
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
									id="paO2"
									className="round-input"
									value={arterialGases.paO2.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.paO2 && errors.paO2.msg}
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
									id="paCO2"
									className="round-input"
									value={arterialGases.paCO2.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.paCO2 && errors.paCO2.msg}
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
								<div className="round-btn grey-label">FiO₂</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="fiO2"
									className="round-input"
									value={arterialGases.fiO2.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.fiO2 && errors.fiO2.msg}
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
									id="base_excess"
									className="round-input"
									value={arterialGases.base_excess.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.base_excess && errors.base_excess.msg}
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
							text="Submit"
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