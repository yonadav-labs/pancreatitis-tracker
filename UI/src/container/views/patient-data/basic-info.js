import React from 'react';
import ReactTooltip from 'react-tooltip';
import GreenButton from "../../components/GreenButton";
import Select from 'react-select';
import {validateStep} from '../../utils/utils';
import {
	lbToKgConvert,
	inchTomConvert
} from '../../utils/conversions';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import DropdownMenu from '../../components/DropdownMenu';
import moment from 'moment';
import { toast } from "react-toastify";

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
				chronic_health: this.props.data.chronic_health,
				admission_date: this.props.data.admission_date,
				onset_date: this.props.data.onset_date
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
						{ min: 7.9, max: 84.3, unit: 'inch' }
					]
				},
				weight: {
					name: 'weight',
					type: 'float',
					range: [
						{ min: 2.5, max: 226.8, unit: 'kg' },
						{ min: 5.5, max: 500, unit: 'lb' }
					]
				},
				admission_date: {
					name: 'admission_date',
					type: 'text',
					required: true
				},
				onset_date: {
					name: 'onset_date',
					type: 'text',
					required: true
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
				weight = lbToKgConvert(weight);
			}

			let height = parseFloat(params.height);
			if (units.height === 'inch') {
				height = inchTomConvert(height);
			} else {
				height = height / 100;
			}

			if (!isNaN(weight) && !isNaN(height)) {
				bmi = parseFloat((weight / Math.pow(height, 2)).toFixed(2));
			}
		}

		return isFinite(bmi) ? bmi : '';
	}

	isValidated = () => {
		const {rules, basicInfo, units} = this.state;
		const {data, errors} = validateStep(basicInfo, units, rules);
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

	changeDate = (id, date) => {
		const params = { ...this.state.basicInfo };
		params[id] = date.toISOString();
		this.setState({basicInfo: params});
	}

	render() {
		const {basicInfo, errors, units} = this.state;
		const {historyData} = this.props;

		return (
			<div className="basic-info-step" >
				<ReactTooltip  effect='solid' className="tooltop-bar" />
				<div className="row">
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div
									className="round-btn grey-label"
								>
									Symptom Onset
								</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<DatePicker
									id="onset_date"
									showTimeSelect
									className="round-input w-100"
									timeFormat="HH:mm"
									timeIntervals={15}
									dateFormat="MM/dd/YYYY HH:mm"
									selected={
										basicInfo.onset_date
											? new Date(basicInfo.onset_date)
											: null
									}
									onChange={(date) => this.changeDate('onset_date', date)}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.onset_date && errors.onset_date.msg}
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
								<DatePicker
									showTimeSelect
									id="admission_date"
									className="round-input col-xs-12"
									timeFormat="HH:mm"
									timeIntervals={15}
									dateFormat="MM/dd/YYYY HH:mm"
									selected={
										basicInfo.admission_date
											? new Date(basicInfo.admission_date)
											: null
									}
									onChange={(date) => this.changeDate('admission_date', date)}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.admission_date && errors.admission_date.msg}
								</label>
							</div>
						</div>
					</div>
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
									data-event="click"
									data-tip="1) Liver: biopsy-proven cirrhosis<br>2) Cardiovascular: NYHA class IV heart failure<br>3) Respiratory: documented chronic hypoxia; hypercapnia; secondary polycythemia; severe pulmonary hypertension; COPD; respirator dependency<br>4) Renal: on dialysis or <br>5) Immunocompromised"
								>
									Chronic Health Problems
									<img src="/assets/images/info-w.png" className="ml-3" style={{ height: '18px' }} />
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
				</div>
				<div className="pt-3 text-center docking-footer">
					<div className="d-flex justify-content-between">
						<DropdownMenu
							onClick={this.getHistoryByDate}
							text="Reload Prev. Run"
							data={historyData}
						/>
						<GreenButton
							text="Next"
							className="ml-auto"
							onClick={this.next}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default BasicInfo;