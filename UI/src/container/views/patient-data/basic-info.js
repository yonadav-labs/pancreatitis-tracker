import React from 'react';
import ReactTooltip from 'react-tooltip';
import GreenButton from "../../components/GreenButton";
import Select from 'react-select';
import {
	checkValidity,
	lbToKgConvert,
	inchTomConvert
} from '../../utils/utils';
import DropdownMenu from '../../components/DropdownMenu';

const sexOption = [
	{ value: 'm', label: 'Male' },
	{ value: 'f', label: 'Female' }
];

const chronicHealthProblemsOption = [
	{ value: 0, label: 'No chronic health problems' },
	{ value: 1, label: 'Nonsurgical' },
	{ value: 2, label: 'Elective postoperative' },
	{ value: 3, label: 'Emergency postoperative' }
];

class BasicInfo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			basicInfo: {
				sex: this.props.data.sex,
				age: this.props.data.age,
				height: this.props.data.height,
				weight: this.props.data.weight,
				bmi: this.props.data.bmi,
				chronic_health: this.props.data.chronic_health
			},
			units: {
				sex: this.props.units.sex,
				age: this.props.units.age,
				height: this.props.units.height,
				weight: this.props.units.weight,
				bmi: this.props.units.bmi,
				chronic_health: this.props.units.chronic_health
			},
			rules: {
				sex: {
					name: 'sex',
					type: 'text'
				},
				age: {
					name: 'age',
					type: 'integer',
					range: [{ min: 0, max: 120, unit: null}]
				},
				height: {
					name: 'height',
					type: 'float',
					range: [
						{ min: 20, max: 214, unit: 'cm' },
						{ min: 19.8, max: 84, unit: 'inch' }
					]
				},
				weight: {
					name: 'weight',
					type: 'float',
					range: [
						{ min: 2.5, max: 227, unit: 'kg' },
						{ min: 5.5, max: 500, unit: 'lb' }
					]
				}
			},
			errors: {},
			historyDate: this.props.historyData && this.props.historyData[0]
				? this.props.historyData[0].run_at : ''
		};

	}

	componentWillReceiveProps(nextProps) {
		const params = {...this.state.basicInfo, ...nextProps.data};
		this.setState({ basicInfo: params });
	}

	calculateBMI = (params) => {
		const {units} = this.state;
		let bmi = '';
		
		if (params.weight && params.height) {
			let weight = parseFloat(params.weight);
			if (units.weight === 'lb') {
				weightVal = lbToKgConvert(weight);
			}

			let height = parseFloat(params.height);
			if (units.height === 'inch') {
				height = inchTomConvert(height);
			} else {
				height = height / 100;
			}

			if (!isNaN(weight) && !isNaN(height)) {
				bmi = (weight / Math.pow(height, 2)).toFixed(2);
			}
		}

		return isFinite(bmi) ? bmi : '';
	}

	isValidated = () => {
		const errors = {};
		const {rules, basicInfo, units} = this.state;
		let isPageValidate = true;

		Object.keys(basicInfo).forEach((attr) => {
			if (rules[attr]) {
				const res = checkValidity(rules[attr], basicInfo[attr], units[attr]);
				if (res.isValid) {
					basicInfo[attr] = res.val;
				} else {
					errors[attr] = { msg: res.msg };
				}
			}
		});

		if (Object.keys(errors).length > 0) {
			isPageValidate = false;
			this.setState({ errors });
		} else {
			this.props.updateInfo(basicInfo, this.state.units);
		}

		return isPageValidate;
	}

	changeInfo = (e) => {
		let params = {...this.state.basicInfo};
		params[e.target.id] = e.target.value;

		if (e.target.id === 'weight' || e.target.id === 'height') {
			params.bmi = this.calculateBMI(params);
		}

		this.setState({ basicInfo: params });
	}

	changeUnit = (id, value) => {
		let {units, basicInfo} = this.state;
		units[id] = value;

		if (id === 'weight' || id === 'height') {
			basicInfo.bmi = this.calculateBMI(basicInfo);
		}

		this.setState({basicInfo, units});
	}

	next = () => {
		if (this.isValidated()) {
			this.props.jumpToStep(this.props.step+1);
		}
	}

	changeOption = (id, val) => {
		let {basicInfo} = this.state;
		basicInfo[id] = val.value;

		this.setState({ basicInfo });
	}

	loadHisotryData = () => {
		this.props.loadInputHistoryAction(e.target.files);
	}

	getHistoryByDate = (date) => {
		this.props.getHistoryByDate(date);
		this.setState({ historyDate: date });
	}

	render() {
		const {basicInfo, errors, units} = this.state;
		const {historyData} = this.props;

		return (
			<div>
				<ReactTooltip  effect='solid' className="tooltop-bar" />
				<div className="row">
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">Age</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<input
									type="text"
									id="age"
									className="round-input"
									maxLength="7"
									value={basicInfo.age}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.age && errors.age.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">Sex</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<Select
									options={sexOption}
									className="patient-select"
									classNamePrefix="newselect"
									onChange={(e) => this.changeOption('sex', e)}
									value={sexOption.filter(option => option.value === basicInfo.sex)}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.sex && errors.sex.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">Height</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="height"
										maxLength=""
										className="round-input"
										value={basicInfo.height}
										onChange={this.changeInfo}
									/>
									<select
										className="input-inline-select"
										defaultValue={units.height}
										onChange={e => this.changeUnit('height', e.target.value)}
									>
										<option>cm</option>
										<option>inch</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.height && errors.height.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">Weight</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="weight"
										className="round-input"
										maxLength="5"
										value={basicInfo.weight}
										onChange={this.changeInfo}
									/>
									<select
										className="input-inline-select"
										defaultValue={units.weight}
										onChange={e => this.changeUnit('weight', e.target.value)}
									>
										<option>kg</option>
										<option>lb</option>
									</select>
								</div>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.weight && errors.weight.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">BMI</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="d-flex">
									<input
										type="text"
										id="bmi"
										maxLength="7"
										className="round-input"
										value={basicInfo.bmi}
										disabled
									/>
									<select className="input-inline-select">
										<option value="kg/m2">kg/m2</option>
									</select>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div
									className="round-btn grey-label"
									data-multiline="true"
									data-tip="1) Liver: biopsy-proven cirrhosis<br>2) Cardiovascular: NYHA class IV heart failure<br>3) Respiratory: documented chronic hypoxia; <br> hypercapnia; <br> secondary polycythemia; <br> severe pulmonary hypertension; <br> COPD; <br> respirator dependency<br>4) Renal: on dialysis or <br>5) Immunocompromised"
								>
									Chronic Health Problems
								</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<Select
									options={chronicHealthProblemsOption}
									className="patient-select"
									classNamePrefix="newselect"
									onChange={(e) => this.changeOption('chronic_health', e)}
									value={chronicHealthProblemsOption.filter(option => option.value === basicInfo.chronic_health)}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.chronic_health && errors.chronic_health.msg}
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
									Onset Date
								</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<input
									type="text"
									id="onset_date"
									className="round-input"
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.chronic_health && errors.chronic_health.msg}
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
									Admission Date
								</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<input
									type="text"
									id="admission_date"
									className="round-input"
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.chronic_health && errors.chronic_health.msg}
								</label>
							</div>
						</div>
					</div>
				</div>
				<div className="pt-3 text-center">
					<div className="d-flex justify-content-between">
						<DropdownMenu
							onClick={this.getHistoryByDate}
							text="Load Data"
							data={historyData}
						/>
						<GreenButton
							text="Next"
							className="mt-3 ml-auto"
							onClick={this.next}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default BasicInfo;