import React from 'react';
import {validateForm} from '../../utils/utils';
import ReactTooltip from 'react-tooltip';
import GreenButton from "../../components/GreenButton";

class Hematology extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hematology: {
				wbc: this.props.data.wbc || { value: '', unit: '10^9 cells/L'},
				platelet_count: this.props.data.platelet_count || { value: '', unit: '10^3 units/mm^3'},
				hematocrit: this.props.data.hematocrit || { value: '', unit: '%'},
				crp: this.props.data.crp || { value: '', unit: 'mg/L'}
			},
			units: {
				wbc: this.props.units.wbc || '10^9 cells/L',
				platelet_count: this.props.units.platelet_count || '10^3 units/mm^3',
				hematocrit: this.props.units.hematocrit || '%',
				crp: this.props.units.crp || 'mg/L'
			},
			rules: {
				wbc: {
					name: 'wbc',
					type: 'integer',
					range: [
						{ min: 1, max: 50, unit: '10^9 cells/L'}
					],
					required: true
				},
				platelet_count: {
					name: 'platelet_count',
					type: 'integer',
					range: [
						{ min: 50, max: 450, unit: '10^3 units/mm^3'},
						{ min: 150000, max: 400000, unit: 'platelets/µL'}
					],
					required: true
				},
				hematocrit: {
					name: 'hematocrit',
					type: 'integer',
					range: [
						{ min: 36.1, max: 50.3, unit: '%'}
					],
					required: true
				},
				crp: {
					name: 'crp',
					type: 'integer',
					range: [
						{ min: 0, max: 20, unit: 'mg/L' },
						{ min: 1, max: 3, unit: 'g/L' }
					],
					required: true
				}
			},
			errors: {}
		};

		this.changeInfo = this.changeInfo.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const params = { ...this.state.hematology, ...nextProps.data};
		this.setState({ hematology: params });
	}

	changeInfo(e) {
		let params = this.state.hematology;
		params[e.target.id].value = e.target.value;

		this.setState({ hematology: params });
		this.props.updateInfo(params, this.state.units);
	}

	changeUnit = (id, value) => {
		let { units, hematology } = this.state;
		units[id] = value;

		this.setState({ units });
		this.props.updateInfo(hematology, units);
	}

	next = () => {
		const errors = {};
		const {rules, hematology, units} = this.state;

		Object.keys(hematology).forEach((data) => {
			if (rules[data]) {
				const validateResponse = validateForm(rules[data], hematology[data], units[data]);
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
			this.props.jumpToStep(this.props.step+1);
		}
	}

	back = () => {
		this.props.jumpToStep(this.props.step-1);
	}

	render() {
		const {hematology, errors, units} = this.state;

		return (
			<div>
				<ReactTooltip  effect='solid' />
				<div className="row">
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label" data-tip="White Blood Cell Count">WBC</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="wbc"
									className="round-input"
									value={hematology.wbc.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.wbc && errors.wbc.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label" data-tip="Platelet Count">PLT</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<div className="d-flex">
									<input
										type="text"
										id="platelet_count"
										className="round-input"
										value={hematology.platelet_count.value}
										onChange={this.changeInfo}
									/>
									<select
										className="input-inline-select"
										defaultValue={units.platelet_count}
										onChange={e => this.changeUnit('platelet_count', e.target.value)}
									>
										<option>10^3 units/mm^3</option>
										<option>platelets/µL</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.platelet_count && errors.platelet_count.msg}
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
									data-tip="For future version (Not MVP) may capture patient's baseline HCT for comparison"
								>
									HCT
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="hematocrit"
									className="round-input"
									value={hematology.hematocrit.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.hematocrit && errors.hematocrit.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">CRP</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<div className="d-flex">
									<input
										type="text"
										id="crp"
										className="round-input"
										value={hematology.crp.value}
										onChange={this.changeInfo}
									/>
									<select
										className="input-inline-select"
										defaultValue={units.crp}
										onChange={e => this.changeUnit('crp', e.target.value)}
									>
										<option>mg/L</option>
										<option>q/L</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.crp && errors.crp.msg}
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

export default Hematology;