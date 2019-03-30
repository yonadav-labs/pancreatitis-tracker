import React from 'react';
import {validateForm} from '../../utils/utils';
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
				ldh: this.props.data.ldh || { value: '', unit: 'IU/L'}
			},
			rules: {
				sodium: {
					name: 'sodium',
					type: 'integer',
					range: [
						{ min: 100, max: 190, unit: 'mmol/L'},
						{ min: 135, max: 145, unit: 'mEq/L' }
					],
					required: true
				},
				potassium: {
					name: 'potassium',
					type: 'integer',
					range: [{ min: 2.2, max: 7.5, unit: 'mmol/L'}],
					required: true
				},
				chloride: {
					name: 'chloride',
					type: 'integer',
					range: [
						{ min: 60, max: 120, unit: 'mmol/L' }
					],
					required: true
				},
				hco3_serum: {
					name: 'hco3_serum',
					type: 'integer',
					range: [
						{ min: 13, max: 55, unit: 'mmol/L' }
					],
					required: true
				},
				bun: {
					name: 'bun',
					type: 'integer',
					range: [
						{ min: 5, max: 90, unit: 'mg/dL' }
					],
					required: true
				},
				creatinine: {
					name: 'creatinine',
					type: 'integer',
					range: [
						{ min: 0.5, max: 5.0, unit: 'mg/dL' }
					],
					required: true
				},
				glucose: {
					name: 'glucose',
					type: 'integer',
					range: [
						{ min: 60, max: 250, unit: 'mmol/L' },
						{ min: 3.3, max: 13.9, unit: 'mg/dL' }
					],
					required: true
				},
				calcium: {
					name: 'calcium',
					type: 'integer',
					range: [
						{ min: 1, max: 3, unit: 'mmol/L' }
					],
					required: true
				},
				albumin: {
					name: 'albumin',
					type: 'integer',
					range: [
						{ min: 3, max: 6, unit: 'mg/dL' },
						{ min: 30, max: 60, unit: 'g/L' }
					],
					required: true
				},
				ast: {
					name: 'ast',
					type: 'integer',
					range: [
						{ min: 8, max: 350, unit: 'U/L' }
					],
					required: true
				},
				ldh: {
					name: 'ldh',
					type: 'integer',
					range: [
						{ min: 40, max: 450, unit: 'IU/L' }
					],
					required: true
				}
			},
			errors: {}
		};

		this.changeInfo = this.changeInfo.bind(this);
	}

	changeInfo(e) {
		let params = this.state.chemistry;
		params[e.target.id].value = e.target.value;

		this.setState({ chemistry: params });
		this.props.updateInfo(params);
	}

	changeUnit = (id, value) => {
		let params = this.state.chemistry;
		params[id].unit = value;

		this.setState({basicInfo: params});
	}

	next = () => {
		const errors = {};
		const {rules, chemistry} = this.state;

		Object.keys(chemistry).forEach((data) => {
			if (rules[data]) {
				if (!validateForm(rules[data], chemistry[data])) {
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
		const {chemistry, errors} = this.state;
		return (
			<div>
				<h2 className="section-title">Chem 7 BMP + Calcium</h2>
				<div className="row">
					<div className="col-xs-12 col-sm-6">
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
										onChange={e => this.changeUnit('sodium', e.target.value)}
									>
										<option>mmol/L</option>
										<option>mEq/L</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.sodium && errors.sodium.msg}
								</label>
							</div>
						</div>
					</div>

					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Chloride</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="chloride"
									className="round-input"
									value={chemistry.chloride.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.chloride && errors.chloride.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Potassium</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="potassium"
									className="round-input"
									value={chemistry.potassium.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.potassium && errors.potassium.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">HCO₃-(serum)</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="hco3_serum"
									className="round-input"
									value={chemistry.hco3_serum.value}
									onChange={this.changeInfo}
								/>
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
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">BUN</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="bun"
									className="round-input"
									value={chemistry.bun.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.bun && errors.bun.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
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
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Creatinine</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="creatinine"
									className="round-input"
									value={chemistry.creatinine.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.creatinine && errors.creatinine.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
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
										onChange={e => this.changeUnit('calcium', e.target.value)}
									>
										<option>mmol/L</option>
										<option>mg/dL</option>
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
					<div className="col-xs-12 col-sm-6">
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
										onChange={e => this.changeUnit('albumin', e.target.value)}
									>
										<option>mg/dL</option>
										<option>g/L</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.albumin && errors.albumin.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">AST</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="ast"
									className="round-input"
									value={chemistry.ast.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.ast && errors.ast.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">LDH</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="ldh"
									className="round-input"
									value={chemistry.ldh.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.ldh && errors.ldh.msg}
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