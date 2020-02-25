import React from 'react';
import {validateStep} from '../../utils/utils';
import GreenButton from "../../components/GreenButton";
import { toast } from "react-toastify";

class Chemistry extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			chemistry: {
				sodium: this.props.data.sodium,
				potassium: this.props.data.potassium,
				chloride: this.props.data.chloride,
				hco3_serum: this.props.data.hco3_serum,
				bun: this.props.data.bun,
				creatinine: this.props.data.creatinine,
				glucose: this.props.data.glucose,
				calcium: this.props.data.calcium,
				albumin: this.props.data.albumin,
				ast: this.props.data.ast,
				alt: this.props.data.alt,
				ldh: this.props.data.ldh
			},
			units: {
				sodium: this.props.units.sodium,
				potassium: this.props.units.potassium,
				chloride: this.props.units.chloride,
				hco3_serum: this.props.units.hco3_serum,
				bun: this.props.units.bun,
				creatinine: this.props.units.creatinine,
				glucose: this.props.units.glucose,
				calcium: this.props.units.calcium,
				albumin: this.props.units.albumin,
				ast: this.props.units.ast,
				alt: this.props.units.alt,
				ldh: this.props.units.ldh
			},
			rules: {
				sodium: {
					name: 'sodium',
					type: 'float',
					range: [
						{ min: 100, max: 190, unit: 'mmol/L'}
					]
				},
				potassium: {
					name: 'potassium',
					type: 'float',
					range: [{ min: 1, max: 8, unit: 'mmol/L'}]
				},
				chloride: {
					name: 'chloride',
					type: 'float',
					range: [
						{ min: 40, max: 150, unit: 'mmol/L' }
					]
				},
				hco3_serum: {
					name: 'hco3_serum',
					type: 'float',
					range: [
						{ min: 10, max: 60, unit: 'mmol/L' }
					]
				},
				bun: {
					name: 'bun',
					type: 'float',
					range: [
						{ min: 5, max: 90, unit: 'mg/dL' }
					]
				},
				creatinine: {
					name: 'creatinine',
					type: 'float',
					range: [
						{ min: 0, max: 10, unit: 'mg/dL' }
					]
				},
				glucose: {
					name: 'glucose',
					type: 'float',
					range: [
						{ min: 20, max: 1000, unit: 'mg/dL' },
						{ min: 1.1, max: 55.5, unit: 'mmol/L' }
					]
				},
				calcium: {
					name: 'calcium',
					type: 'float',
					range: [
						{ min: 0, max: 4.5, unit: 'mmol/L' },
						{ min: 0, max: 9, unit: 'mEq/L' },
						{ min: 0, max: 18, unit: 'mg/dL' }
					]
				},
				albumin: {
					name: 'albumin',
					type: 'float',
					range: [
						{ min: 30, max: 60, unit: 'g/L' },
						{ min: 3, max: 6, unit: 'g/dL' }
					]
				},
				ast: {
					name: 'ast',
					type: 'float',
					range: [
						{ min: 8, max: 600, unit: 'U/L' }
					]
				},
				alt: {
					name: 'alt',
					type: 'float',
					range: [
						{ min: 8, max: 600, unit: 'U/L' }
					]
				},
				ldh: {
					name: 'ldh',
					type: 'float',
					range: [
						{ min: 40, max: 600, unit: 'U/L' }
					]
				}
			},
			errors: {}
		};

		this.changeInfo = this.changeInfo.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const params = { ...this.state.chemistry, ...nextProps.data};
		this.setState({ chemistry: params });
	}

	changeInfo = (e) => {
		let params = this.state.chemistry;
		params[e.target.id] = e.target.value;

		this.setState({ chemistry: params });
	}

	changeUnit = (id, value) => {
		let {units, chemistry} = this.state;
		units[id] = value;

		this.setState({ units });
	}

	isValidated = () => {
		const {rules, chemistry, units} = this.state;
		const {data, errors} = validateStep(chemistry, units, rules);
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
		const {chemistry, errors, units} = this.state;

		return (
			<div>
				<h2 className="section-title">Chem 7 BMP + Calcium</h2>
				<div className="row">
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">Sodium</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="sodium"
										maxLength="7"
										className="round-input"
										value={chemistry.sodium}
										onChange={this.changeInfo}
										onKeyDown={event => this.handleKeyPress(event)}
									/>
									<select
										className="input-inline-select"
										defaultValue={units.sodium}
										onChange={e => this.changeUnit('sodium', e.target.value)}
									>
										<option>mmol/L</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.sodium && errors.sodium.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">Chloride</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="chloride"
										maxLength="7"
										className="round-input"
										value={chemistry.chloride}
										onChange={this.changeInfo}
										onKeyDown={event => this.handleKeyPress(event)}
									/>
									<select className="input-inline-select">
										<option value="mmol/L">mmol/L</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.chloride && errors.chloride.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">Potassium</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="potassium"
										maxLength="7"
										className="round-input"
										value={chemistry.potassium}
										onChange={this.changeInfo}
										onKeyDown={event => this.handleKeyPress(event)}
									/>
									<select className="input-inline-select">
										<option value="mmol/L">mmol/L</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.potassium && errors.potassium.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">HCO₃⁻ (serum)</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="hco3_serum"
										maxLength="7"
										className="round-input"
										value={chemistry.hco3_serum}
										onChange={this.changeInfo}
										onKeyDown={event => this.handleKeyPress(event)}
									/>
									<select className="input-inline-select">
										<option value="mmol/L">mmol/L</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.hco3_serum && errors.hco3_serum.msg}
								</label>
							</div>
						</div>
					</div>
				</div>
				<h2 className="section-title">
					<hr></hr>
				</h2>
				<div className="row">
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">BUN</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="bun"
										maxLength="7"
										className="round-input"
										value={chemistry.bun}
										onChange={this.changeInfo}
										onKeyDown={event => this.handleKeyPress(event)}
									/>
									<select className="input-inline-select">
										<option value="mg/dL">mg/dL</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.bun && errors.bun.msg}
								</label>
							</div>
						</div>
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">Creatinine</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="creatinine"
										maxLength="7"
										className="round-input"
										value={chemistry.creatinine}
										onChange={this.changeInfo}
										onKeyDown={event => this.handleKeyPress(event)}
									/>
									<select className="input-inline-select">
										<option value="mg/dL">mg/dL</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.creatinine && errors.creatinine.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">Glucose</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="glucose"
										maxLength="7"
										className="round-input"
										value={chemistry.glucose}
										onChange={this.changeInfo}
										onKeyDown={event => this.handleKeyPress(event)}
									/>
									<select
										className="input-inline-select"
										defaultValue={units.glucose}
										onChange={e => this.changeUnit('glucose', e.target.value)}
									>
										<option>mg/dL</option>
										<option>mmol/L</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.glucose && errors.glucose.msg}
								</label>
							</div>
						</div>
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">Total Calcium</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="calcium"
										maxLength="7"
										className="round-input"
										value={chemistry.calcium}
										onChange={this.changeInfo}
										onKeyDown={event => this.handleKeyPress(event)}
									/>
									<select
										className="input-inline-select"
										defaultValue={units.calcium}
										onChange={e => this.changeUnit('calcium', e.target.value)}
									>
										<option>mg/dL</option>
										<option>mmol/L</option>
										<option>mEq/L</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.calcium && errors.calcium.msg}
								</label>
							</div>
						</div>
					</div>
				</div>
				<h2 className="section-title">Liver Function Panel</h2>
				<div className="row">
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">Albumin</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="albumin"
										maxLength="7"
										className="round-input"
										value={chemistry.albumin}
										onChange={this.changeInfo}
										onKeyDown={event => this.handleKeyPress(event)}
									/>
									<select
										className="input-inline-select"
										defaultValue={units.albumin}
										onChange={e => this.changeUnit('albumin', e.target.value)}
									>
										<option>g/dL</option>
										<option>g/L</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.albumin && errors.albumin.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">LDH</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="ldh"
										maxLength="7"
										className="round-input"
										value={chemistry.ldh}
										onChange={this.changeInfo}
										onKeyDown={event => this.handleKeyPress(event)}
									/>
									<select className="input-inline-select">
										<option value="U/L">U/L</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.ldh && errors.ldh.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">AST</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="ast"
										maxLength="7"
										className="round-input"
										value={chemistry.ast}
										onChange={this.changeInfo}
										onKeyDown={event => this.handleKeyPress(event)}
									/>
									<select className="input-inline-select">
										<option value="U/L">U/L</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.ast && errors.ast.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">ALT</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="alt"
										maxLength="7"
										className="round-input"
										value={chemistry.alt}
										onChange={this.changeInfo}
										onKeyDown={event => this.handleKeyPress(event)}
									/>
									<select className="input-inline-select">
										<option value="U/L">U/L</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.alt && errors.alt.msg}
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

export default Chemistry;