import React from 'react';
import {validateForm} from '../../utils/utils';
import GreenButton from "../../components/GreenButton";

class Hematology extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hematology: {
				whiteBloodCellCount: this.props.data.whiteBloodCellCount || { value: '', unit: '10^9 cells/L'},
				plateletCount: this.props.data.plateletCount || { value: '', unit: '10^3 units/mm^3'},
				hematocrit: this.props.data.hematocrit || { value: '', unit: '%'},
				crp: this.props.data.crp || { value: '', unit: 'mg/L'}
			},
			rules: {
				whiteBloodCellCount: {
					name: 'whiteBloodCellCount',
					type: 'integer',
					range: [
						{ min: 1, max: 50, unit: '10^9 cells/L'}
					],
					required: true
				},
				plateletCount: {
					name: 'plateletCount',
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

	changeInfo(e) {
		let params = this.state.hematology;
		params[e.target.id].value = e.target.value;

		this.setState({ hematology: params });
		this.props.updateInfo(params);
	}

	changeUnit = (id, value) => {
		let params = this.state.hematology;
		params[id].unit = value;

		this.setState({basicInfo: params});
	}

	next = () => {
		const errors = {};
		const {rules, hematology} = this.state;

		Object.keys(hematology).forEach((data) => {
			if (rules[data]) {
				debugger;
				if (!validateForm(rules[data], hematology[data])) {
					errors[data] = {
						msg: 'Value is invalid!'
					};
				}
			}
		});

		if (Object.keys(errors).length > 0) {
			this.setState({ errors });
		} else {
			this.setState({ errors: {} });
			alert('Sucess!');
		}
	}

	back = () => {
		this.props.jumpToStep(this.props.step-1);
	}

	render() {
		const {hematology, errors} = this.state;
		return (
			<div>
				<div className="row">
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">WBC</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="whiteBloodCellCount"
									className="round-input"
									value={hematology.whiteBloodCellCount.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.whiteBloodCellCount && errors.whiteBloodCellCount.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">PLC</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<div className="d-flex">
									<input
										type="text"
										id="plateletCount"
										className="round-input"
										value={hematology.plateletCount.value}
										onChange={this.changeInfo}
									/>
									<select
										className="input-inline-select"
										onChange={e => this.changeUnit('plateletCount', e.target.value)}
									>
										<option>10^3 units/mm^3</option>
										<option>platelets/µL</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.plateletCount && errors.plateletCount.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">HCT</div>
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
					<div className="col-xs-12 col-sm-6">
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

export default Hematology;