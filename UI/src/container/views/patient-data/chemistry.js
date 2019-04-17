import React from 'react';
import {
	validateForm,
	sodiumConvert,
	glucoseConvert,
	calciumConvert,
	albuminConvert
} from '../../utils/utils';
import GreenButton from "../../components/GreenButton";

class Chemistry extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			chemistry: {
				sodium: this.props.data.sodium || { value: '', unit: 'mmol/L'},
				potassium: this.props.data.potassium || { value: '', unit: 'mmol/L'},
				chloride: this.props.data.chloride || { value: '', unit: 'mmol/L'},
				hco3_serum: this.props.data.hco3_serum || { value: '', unit: 'mmol/L'},
				bun: this.props.data.bun || { value: '', unit: 'mg/dL'},
				creatinine: this.props.data.creatinine || { value: '', unit: 'mg/dL'},
				glucose: this.props.data.glucose || { value: '', unit: 'mmol/L'},
				calcium: this.props.data.calcium || { value: '', unit: 'mmol/L'},
				albumin: this.props.data.albumin || { value: '', unit: 'mg/dL'},
				ast: this.props.data.ast || { value: '', unit: 'U/L'},
				alt: this.props.data.alt || { value: '', unit: 'U/L'},
				ldh: this.props.data.ldh || { value: '', unit: 'IU/L'}
			},
			units: {
				sodium: this.props.units.sodium || 'mmol/L',
				potassium: this.props.units.potassium || 'mmol/L',
				chloride: this.props.units.chloride || 'mmol/L',
				hco3_serum: this.props.units.hco3_serum || 'mmol/L',
				bun: this.props.units.bun || 'mg/dL',
				creatinine: this.props.units.creatinine || 'mg/dL',
				glucose: this.props.units.glucose || 'mmol/L',
				calcium: this.props.units.calcium || 'mmol/L',
				albumin: this.props.units.albumin || 'mg/dL',
				ast: this.props.units.ast || 'U/L',
				alt: this.props.units.alt || 'U/L',
				ldh: this.props.units.ldh || 'IU/L'
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
					range: [{ min: 2.2, max: 7.5, unit: 'mmol/L'}]
				},
				chloride: {
					name: 'chloride',
					type: 'float',
					range: [
						{ min: 60, max: 120, unit: 'mmol/L' }
					]
				},
				hco3_serum: {
					name: 'hco3_serum',
					type: 'float',
					range: [
						{ min: 13, max: 55, unit: 'mmol/L' }
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
						{ min: 0.5, max: 5.0, unit: 'mg/dL' }
					]
				},
				glucose: {
					name: 'glucose',
					type: 'float',
					range: [
						{ min: 60, max: 250, unit: 'mmol/L' },
						{ min: 3.3, max: 13.9, unit: 'mg/dL' }
					]
				},
				calcium: {
					name: 'calcium',
					type: 'float',
					range: [
						{ min: 1, max: 3, unit: 'mmol/L' }
					]
				},
				albumin: {
					name: 'albumin',
					type: 'float',
					range: [
						{ min: 3, max: 6, unit: 'g/L' },
						{ min: 30, max: 60, unit: 'g/dL' }
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
						{ min: 48, max: 600, unit: 'IU/L' }
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

	changeInfo(e) {
		let params = this.state.chemistry;
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

		this.setState({ chemistry: params });
		this.props.updateInfo(params, this.state.units);
	}

	changeUnit = (id, value) => {
		let {units, chemistry} = this.state;
		units[id] = value;

		let calculatedValue = chemistry[id].value;
		chemistry[id].value = calculatedValue;

		this.setState({ units });
		this.props.updateInfo(chemistry, units);
	}

	next = () => {
		const errors = {};
		const {rules, chemistry, units} = this.state;

		Object.keys(chemistry).forEach((data) => {
			if (rules[data]) {
				const validateResponse = validateForm(rules[data], chemistry[data], units[data]);
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
			let temp = Object.assign({}, chemistry);
			
			Object.keys(chemistry).forEach((attr) => {
				if (rules[attr] && (rules[attr].type === "integer" || rules[attr].type === "float")) {
					if (!isNaN(parseFloat(chemistry[attr].value))) {
						temp[attr].value = parseFloat(chemistry[attr].value);
					}
				}
			});

			let glucose= { ...temp.glucose };
			let albumin = { ...temp.albumin };

			if (units.glucose === 'mg/dL') {
				glucose.calculatedValue = glucoseConvert(glucose.value);
			} else {
				glucose.calculatedValue = glucose.value;
			}

			if (units.albumin === 'g/dL') {
				albumin.calculatedValue = albumin.value * 10;
			} else {
				albumin.calculatedValue = albumin.value;
			}

			temp.glucose = glucose;
			temp.albumin = albumin;

			this.props.updateInfo(temp, this.state.units);
			this.props.jumpToStep(this.props.step+1);
		}
	}

	back = () => {
		this.props.jumpToStep(this.props.step-1);
	}

	render() {
		const {chemistry, errors, units} = this.state;

		return (
			<div>
				<h2 className="section-title">Chem 7 BMP + Calcium</h2>
				<div className="row">
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Sodium</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<div className="d-flex">
									<input
										type="text"
										id="sodium"
										className="round-input"
										value={chemistry.sodium.value}
										onChange={this.changeInfo}
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

					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Chloride</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<div className="d-flex">
									<input
										type="text"
										id="chloride"
										className="round-input"
										value={chemistry.chloride.value}
										onChange={this.changeInfo}
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
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Potassium</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<div className="d-flex">
									<input
										type="text"
										id="potassium"
										className="round-input"
										value={chemistry.potassium.value}
										onChange={this.changeInfo}
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
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">HCO₃⁻ (serum)</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<div className="d-flex">
									<input
										type="text"
										id="hco3_serum"
										className="round-input"
										value={chemistry.hco3_serum.value}
										onChange={this.changeInfo}
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
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">BUN</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<div className="d-flex">
									<input
										type="text"
										id="bun"
										className="round-input"
										value={chemistry.bun.value}
										onChange={this.changeInfo}
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
					</div>
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Glucose</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<div className="d-flex">
									<input
										type="text"
										id="glucose"
										className="round-input"
										value={chemistry.glucose.value}
										onChange={this.changeInfo}
									/>
									<select
										className="input-inline-select"
										defaultValue={units.glucose}
										onChange={e => this.changeUnit('glucose', e.target.value)}
									>
										<option>mmol/L</option>
										<option>mg/dL</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.glucose && errors.glucose.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Creatinine</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<div className="d-flex">
									<input
										type="text"
										id="creatinine"
										className="round-input"
										value={chemistry.creatinine.value}
										onChange={this.changeInfo}
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
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Calcium</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<div className="d-flex">
									<input
										type="text"
										id="calcium"
										className="round-input"
										value={chemistry.calcium.value}
										onChange={this.changeInfo}
									/>
									<select
										className="input-inline-select"
										defaultValue={units.calcium}
										onChange={e => this.changeUnit('calcium', e.target.value)}
									>
										<option>mmol/L</option>
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
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Albumin</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<div className="d-flex">
									<input
										type="text"
										id="albumin"
										className="round-input"
										value={chemistry.albumin.value}
										onChange={this.changeInfo}
									/>
									<select
										className="input-inline-select"
										defaultValue={units.albumin}
										onChange={e => this.changeUnit('albumin', e.target.value)}
									>
										<option>g/L</option>
										<option>g/dL</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.albumin && errors.albumin.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">LDH</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<div className="d-flex">
									<input
										type="text"
										id="ldh"
										className="round-input"
										value={chemistry.ldh.value}
										onChange={this.changeInfo}
									/>
									<select className="input-inline-select">
										<option value="lU/L">lU/L</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.ldh && errors.ldh.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">AST</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<div className="d-flex">
									<input
										type="text"
										id="ast"
										className="round-input"
										value={chemistry.ast.value}
										onChange={this.changeInfo}
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
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">ALT</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<div className="d-flex">
									<input
										type="text"
										id="alt"
										className="round-input"
										value={chemistry.alt.value}
										onChange={this.changeInfo}
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

export default Chemistry;