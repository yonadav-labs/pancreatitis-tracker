import React from 'react';
import {checkValidity} from '../../utils/utils';
import GreenButton from "../../components/GreenButton";

class ArterialGases extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			arterialGases: {
				ph: this.props.data.ph,
				paO2: this.props.data.paO2,
				paCO2: this.props.data.paCO2,
				hco3_artieral: this.props.data.hco3_artieral,
				fiO2: this.props.data.fiO2,
				base_excess: this.props.data.base_excess
			},
			units: {
				ph: this.props.units.ph,
				paO2: this.props.units.paO2,
				paCO2: this.props.units.paCO2,
				hco3_artieral: this.props.units.hco3_artieral,
				fiO2: this.props.units.fiO2,
				base_excess: this.props.units.base_excess
			},
			rules: {
				ph: {
					name: 'ph',
					type: 'float',
					range: [
						{ min: 7.14, max: 7.65, unit: ''}
					]
				},
				paO2: {
					name: 'paO2',
					type: 'float',
					range: [{ min: 50, max: 75, unit: 'mmHg'}]
				},
				paCO2: {
					name: 'paCO2',
					type: 'float',
					range: [
						{ min: 30, max: 50, unit: 'mmHg' }
					]
				},
				hco3_artieral: {
					name: 'hco3_artieral',
					type: 'float',
					range: [
						{ min: 13, max: 55, unit: 'mmol/L' }
					]
				},
				fiO2: {
					name: 'fiO2',
					type: 'float',
					range: [
						{ min: 0.2, max: 1, unit: '%' }
					]
				},
				base_excess: {
					name: 'base_excess',
					type: 'float',
					range: [
						{ min: -5, max: 3, unit: 'mEq/L' }
					]
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
				params[e.target.id] = parseFloat(e.target.value);
			} else {
				params[e.target.id] = e.target.value;
			}
		} else {
			params[e.target.id] = e.target.value;
		}

		this.setState({ arterialGases: params });
	}

	isValidated = () => {
		const errors = {};
		const {rules, arterialGases, units} = this.state;
		let isPageValid = true;

		Object.keys(arterialGases).forEach((attr) => {
			if (rules[attr]) {
				const res = checkValidity(rules[attr], arterialGases[attr], units[attr]);
				if (res.isValid) {
					arterialGases[attr] = res.val;
				} else {
					errors[attr] = { msg: res.msg };
				}
			}
		});

		if (Object.keys(errors).length > 0) {
			this.setState({ errors });
			isPageValid = false;
		} else {
			this.props.updateInfo(arterialGases, this.state.units);
			this.setState({ errors: {} });
		}

		return isPageValid;
	}

	next = () => {
		if (this.isValidated()) {
			this.props.savePatientData();
			this.props.history.push('/outputs');
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
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">pH</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<input
									type="text"
									id="ph"
									className="round-input"
									maxLength="7"
									value={arterialGases.ph}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.ph && errors.ph.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">PaO₂</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="paO2"
										maxLength="7"
										className="round-input"
										value={arterialGases.paO2}
										onChange={this.changeInfo}
									/>
									<select className="input-inline-select">
										<option value="mmHg">mmHg</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.paO2 && errors.paO2.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">PaCO₂</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="paCO2"
										maxLength="7"
										className="round-input"
										value={arterialGases.paCO2}
										onChange={this.changeInfo}
									/>
									<select className="input-inline-select">
										<option value="mmHg">mmHg</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.paCO2 && errors.paCO2.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">HCO₃⁻ (arterial)</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="hco3_artieral"
										className="round-input"
										maxLength="7"
										value={arterialGases.hco3_artieral}
										onChange={this.changeInfo}
									/>
									<select className="input-inline-select">
										<option value="mmol/L">mmol/L</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.hco3_artieral && errors.hco3_artieral.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">FiO₂</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<input
									type="text"
									maxLength="7"
									id="fiO2"
									className="round-input"
									value={arterialGases.fiO2}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.fiO2 && errors.fiO2.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">Base Excess</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="base_excess"
										maxLength="7"
										className="round-input"
										value={arterialGases.base_excess}
										onChange={this.changeInfo}
									/>
									<select className="input-inline-select">
										<option value="mEq/L">mEq/L</option>
									</select>
								</div>
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