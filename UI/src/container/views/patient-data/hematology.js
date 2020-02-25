import React from 'react';
import {validateStep} from '../../utils/utils';
import ReactTooltip from 'react-tooltip';
import GreenButton from "../../components/GreenButton";
import { toast } from "react-toastify";

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
						{ min: 0, max: 70, unit: '10^9 cells/L'}
					]
				},
				platelet_count: {
					name: 'platelet_count',
					type: 'float',
					range: [
						{ min: 0, max: 450, unit: '10^3 units/µL'},
						{ min: 0, max: 450000, unit: 'units/µL'}
					]
				},
				hematocrit: {
					name: 'hematocrit',
					type: 'float',
					range: [
						{ min: 18, max: 62, unit: '%'}
					]
				},
				crp: {
					name: 'crp',
					type: 'float',
					range: [
						{ min: 0, max: 200, unit: 'mg/dL' },
						{ min: 0, max: 400, unit: 'mg/L' }
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

	changeInfo = (e) => {
		let params = this.state.hematology;
		params[e.target.id] = e.target.value;

		this.setState({ hematology: params });
	}

	changeUnit = (id, value) => {
		let { units } = this.state;
		units[id] = value;

		this.setState({ units });
	}

	isValidated = () => {
		const {rules, hematology, units} = this.state;
		const {data, errors} = validateStep(hematology, units, rules);
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
		const {hematology, errors, units} = this.state;

		return (
			<div>
				<ReactTooltip  effect='solid' className="tooltop-bar" />
				<div className="row">
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label" data-tip="White Blood Cell Count" data-event="click">
									WBC
									<img src="/assets/images/info-w.png" className="ml-3" style={{ height: '17px', marginTop: '-4px' }} />
								</div>
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
										onKeyDown={event => this.handleKeyPress(event)}
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
								<div className="round-btn grey-label" data-tip="Platelet Count" data-event="click">
									PLT
									<img src="/assets/images/info-w.png" className="ml-3" style={{ height: '17px', marginTop: '-4px' }} />
								</div>
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
										onKeyDown={event => this.handleKeyPress(event)}
									/>
									<select
										className="input-inline-select"
										defaultValue={units.platelet_count}
										onChange={e => this.changeUnit('platelet_count', e.target.value)}
									>
										<option>10^3 cells/µL</option>
										<option>cells/µL</option>
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
										onKeyDown={event => this.handleKeyPress(event)}
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
										onKeyDown={event => this.handleKeyPress(event)}
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

export default Hematology;