import React from 'react';
import {checkValidity} from '../../utils/utils';
import ReactTooltip from 'react-tooltip';
import GreenButton from "../../components/GreenButton";

class Hematology extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hematology: {
				wbc: this.props.data.wbc,
				platelet_count: this.props.data.platelet_count,
				hematocrit: this.props.data.hematocrit,
				crp: this.props.data.crp
			},
			units: {
				wbc: this.props.units.wbc,
				platelet_count: this.props.units.platelet_count,
				hematocrit: this.props.units.hematocrit,
				crp: this.props.units.crp
			},
			rules: {
				wbc: {
					name: 'wbc',
					type: 'float',
					range: [
						{ min: 1, max: 50, unit: '10^9 cells/L'}
					]
				},
				platelet_count: {
					name: 'platelet_count',
					type: 'float',
					range: [
						{ min: 50, max: 450, unit: '10^3 units/µL'},
						{ min: 50000, max: 450000, unit: 'units/µL'}
					]
				},
				hematocrit: {
					name: 'hematocrit',
					type: 'float',
					range: [
						{ min: 36.1, max: 50.3, unit: '%'}
					]
				},
				crp: {
					name: 'crp',
					type: 'float',
					range: [
						{ min: 0, max: 2, unit: 'mg/dL' },
						{ min: 0, max: 20, unit: 'mg/L' }
					]
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

		this.setState({ hematology: params });
		this.props.updateInfo(params, this.state.units);
	}

	changeUnit = (id, value) => {
		let { units } = this.state;
		units[id] = value;

		this.setState({ units });
	}

	isValidated = () => {
		let isPageValidated = false;
		const errors = {};
		const {rules, hematology, units} = this.state;
		console.log(hematology);
		Object.keys(hematology).forEach((data) => {
			if (rules[data]) {
				const validateResponse = checkValidity(rules[data], hematology[data], units[data]);
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
			let temp = Object.assign({}, hematology);
			
			Object.keys(hematology).forEach((attr) => {
				if (rules[attr] && (rules[attr].type === "integer" || rules[attr].type === "float")) {
					if (!isNaN(parseFloat(hematology[attr]))) {
						temp[attr] = parseFloat(hematology[attr]);
					}
				}
			});

			let crp = { ...temp.crp };
			let platelet_count = { ...temp.platelet_count };

			if (units.platelet_count === 'units/µL') {
				platelet_count.calculatedValue = platelet_count / 1000;
			} else {
				platelet_count.calculatedValue = platelet_count;
			}

			if (units.crp === 'mg/L') {
				crp.calculatedValue = crp / 10;
			} else {
				crp.calculatedValue = crp;
			}

			temp.platelet_count = platelet_count;
			temp.crp = crp;

			isPageValidated = true;
			this.props.updateInfo(temp, this.state.units);
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
		const {hematology, errors, units} = this.state;

		return (
			<div>
				<ReactTooltip  effect='solid' className="tooltop-bar" />
				<div className="row">
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label" data-tip="White Blood Cell Count">WBC</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="wbc"
										maxLength="7"
										className="round-input"
										value={hematology.wbc}
										onChange={this.changeInfo}
									/>
									<select className="input-inline-select">
										<option value="10^9 cells/L">10^9 cells/L</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.wbc && errors.wbc.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label" data-tip="Platelet Count">PLT</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="platelet_count"
										maxLength="7"
										className="round-input"
										value={hematology.platelet_count}
										onChange={this.changeInfo}
									/>
									<select
										className="input-inline-select"
										defaultValue={units.platelet_count}
										onChange={e => this.changeUnit('platelet_count', e.target.value)}
									>
										<option>10^3 units/µL</option>
										<option>units/µL</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.platelet_count && errors.platelet_count.msg}
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
									data-tip="For future version (Not MVP) may capture patient's baseline HCT for comparison"
								>
									HCT
								</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="hematocrit"
										maxLength="7"
										className="round-input"
										value={hematology.hematocrit}
										onChange={this.changeInfo}
									/>
									<select className="input-inline-select">
										<option value="%">%</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.hematocrit && errors.hematocrit.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">CRP</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="crp"
										maxLength="7"
										className="round-input"
										value={hematology.crp}
										onChange={this.changeInfo}
									/>
									<select
										className="input-inline-select"
										defaultValue={units.crp}
										onChange={e => this.changeUnit('crp', e.target.value)}
									>
										<option>mg/dL</option>
										<option>mg/L</option>
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