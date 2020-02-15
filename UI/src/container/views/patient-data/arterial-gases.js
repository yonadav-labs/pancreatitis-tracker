import React from 'react';
import {validateStep} from '../../utils/utils';
import GreenButton from "../../components/GreenButton";
import { toast } from "react-toastify";

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
					range: [{ min: 10, max: 500, unit: 'mmHg'}]
				},
				paCO2: {
					name: 'paCO2',
					type: 'float',
					range: [
						{ min: 10, max: 150, unit: 'mmHg' }
					]
				},
				hco3_artieral: {
					name: 'hco3_artieral',
					type: 'float',
					range: [
						{ min: 0, max: 60, unit: 'mmol/L' }
					]
				},
				fiO2: {
					name: 'fiO2',
					type: 'float',
					range: [
						{ min: 0, max: 100, unit: '%' }
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
		params[e.target.id] = e.target.value;

		this.setState({ arterialGases: params });
	}

	isValidated = () => {
		const {rules, arterialGases, units} = this.state;
		const {data, errors} = validateStep(arterialGases, units, rules);
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

	submit = () => {
		if (this.isValidated()) {
			setTimeout(() => {
				this.props.savePatientData();
				this.props.history.push('/outputs');
			}, 100);
		}
	}

	gotoStep = (delta) => {
		if (this.isValidated()) {
			this.props.jumpToStep(this.props.step+delta);
		}
	}

	changeDate = (id, date) => {
		const params = { ...this.state.arterialGases };
		params[id] = date ? date.toISOString() : '';
		this.setState({arterialGases: params});
	}

	handleKeyPress = (e) => {
		if (e.keyCode === 13) {
			this.submit();
		}
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
									onKeyDown={event => this.handleKeyPress(event)}
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
										onKeyDown={event => this.handleKeyPress(event)}
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
										onKeyDown={event => this.handleKeyPress(event)}
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
										onKeyDown={event => this.handleKeyPress(event)}
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
								<div className="d-flex">
									<input
										type="text"
										maxLength="7"
										id="fiO2"
										className="round-input"
										value={arterialGases.fiO2}
										onChange={this.changeInfo}
										onKeyDown={event => this.handleKeyPress(event)}
									/>
									<select className="input-inline-select">
										<option>%</option>
									</select>
								</div>
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
										onKeyDown={event => this.handleKeyPress(event)}
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
				<div className="pt-3 text-center docking-footer">
					<div className="d-flex justify-content-between">
						<GreenButton
							text="Back"
							className="mt-3"
							onClick={() => this.gotoStep(-1)}
						/>
						<GreenButton
							text="Submit"
							className="mt-3"
							onClick={this.submit}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default ArterialGases;