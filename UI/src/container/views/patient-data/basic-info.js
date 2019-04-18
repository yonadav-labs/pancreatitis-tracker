import React from 'react';
import ReactTooltip from 'react-tooltip';
import GreenButton from "../../components/GreenButton";
import Select from 'react-select';
import {validateForm, lbToKgConvert, inchToCmConvert} from '../../utils/utils';
import { isAbsolute } from 'upath';

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
				sex: this.props.units.sex || '',
				age: this.props.units.age || 'years',
				height: this.props.units.height || 'cm',
				weight: this.props.units.weight || 'kg',
				bmi: this.props.units.bmi || 'kg/m2',
				chronic_health: this.props.units.chronic_health || ''
			},
			rules: {
				sex: {
					name: 'sex',
					type: 'text'
				},
				age: {
					name: 'age',
					type: 'integer',
					range: [{ min: 0, max: 120, unit: 'years'}]
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
			errors: {}
		};

	}

	componentWillReceiveProps(nextProps) {
		const params = Object.assign({}, this.state.basicInfo, nextProps.data);
		this.setState({ basicInfo: params });
	}

	calculateBMI = (params) => {
		const {units} = this.state;
		let bmiValue = '';
		
		if (
			(params.weight.value !== '' && params.weight.value !== 0) &&
			(params.height.value !== '' && params.height.value !== 0)
		) {
			let weightVal = parseFloat(params.weight.value);
			if (units.weight === 'lb') {
				weightVal = lbToKgConvert(weightVal);
			}

			let heightVal = parseFloat(params.height.value) / 100;
			if (units.height === 'inch') {
				heightVal = inchToCmConvert(heightVal);
			}

			bmiValue = (weightVal / Math.pow(heightVal, 2)).toFixed(2);
		}

		return bmiValue;
	}

	isValidated = () => {
		const errors = {};
		const {rules, basicInfo, units} = this.state;
		let isPageValidate = false;

		Object.keys(basicInfo).forEach((data) => {
			if (rules[data]) {
				const validateResponse = validateForm(rules[data], basicInfo[data], units[data]);
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
			let temp = Object.assign({}, basicInfo);
			
			Object.keys(basicInfo).forEach((attr) => {
				if (rules[attr] && (rules[attr].type === "integer" || rules[attr].type === "float")) {
					if (!isNaN(parseFloat(basicInfo[attr].value))) {
						temp[attr].value = parseFloat(basicInfo[attr].value);
					}
				}
			});

			let weight = { ...temp.weight };
			let height = { ...temp.height };

			if (units.weight === 'lb') {
				weight.calculatedValue = lbToKgConvert(weight.value);
			} else {
				weight.calculatedValue = weight.value;
			}
	
			if (units.height === 'inch') {
				height.calculatedValue = inchToCmConvert(height.value) / 100;
			} else {
				height.calculatedValue = height.value;
			}

			temp.weight = weight;
			temp.height = height;
			if (temp.bmi.value !== '') {
				temp.bmi.value = parseFloat(temp.bmi.value);
			}

			isPageValidate = true;
			this.props.updateInfo(temp, this.state.units);
		}

		return isPageValidate;
	}

	changeInfo = (e) => {
		let params = Object.assign({}, this.state.basicInfo);
		params[e.target.id].value = e.target.value;

		let bmiValue = '';
		if (e.target.id === 'weight' || e.target.id === 'height') {
			bmiValue = this.calculateBMI(params);
		}
		params.bmi.value = bmiValue;

		this.setState({ basicInfo: params });
	}

	changeUnit = (id, value) => {
		let {units, basicInfo} = this.state;
		units[id] = value;

		let bmiValue = '';
		if (id === 'weight' || id === 'height') {
			bmiValue = this.calculateBMI(basicInfo);
		}
		basicInfo.bmi.value = bmiValue;

		this.setState({basicInfo, units});
	}

	next = () => {
		if (this.isValidated()) {
			this.props.jumpToStep(this.props.step+1);
		}
	}

	changeOption = (id, val) => {
		let {basicInfo} = this.state;
		basicInfo[id] = {...basicInfo[id], ...val};

		this.setState({ basicInfo });
	}

	fileChange = (e) => {
		this.props.loadData(e.target.files);
	}

	showFileDialog = () => {
		const fileDialog = document.getElementById("upload_input");
		fileDialog.click();
	}

	render() {
		const {basicInfo, errors, units} = this.state;

		return (
			<div>
				<ReactTooltip  effect='solid' className="tooltop-bar" />
				<div className="row">
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Age</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="age"
									className="round-input"
									value={basicInfo.age && basicInfo.age.value}
									onChange={this.changeInfo}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.age && errors.age.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div
									className="round-btn grey-label"
								>
									Sex
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<Select
									options={sexOption}
									className="patient-select"
									classNamePrefix="newselect"
									onChange={(e) => this.changeOption('sex',e)}
									value={basicInfo.sex}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.sex && errors.sex.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">height</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<div className="d-flex">
									<input
										type="text"
										id="height"
										className="round-input"
										value={basicInfo.height && basicInfo.height.value}
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
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Weight</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<div className="d-flex">
									<input
										type="text"
										id="weight"
										className="round-input"
										value={basicInfo.weight && basicInfo.weight.value}
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
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">BMI</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<div className="d-flex">
									<input
										type="text"
										id="bmi"
										className="round-input"
										value={basicInfo.bmi && basicInfo.bmi.value}
										disabled
									/>
									<select className="input-inline-select">
										<option value="kg/m2">kg/m2</option>
									</select>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div
									className="round-btn grey-label"
									data-multiline="true"
									data-tip="1) Liver: biopsy-proven cirrhosis<br>2) Cardiovascular: NYHA class IV heart failure<br>3) Respiratory: documented chronic hypoxia; <br> hypercapnia; <br> secondary polycythemia; <br> severe pulmonary hypertension; <br> COPD; <br> respirator dependency<br>4) Renal: on dialysis or <br>5) Immunocompromised"
								>
									Chronic Health Problems
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<Select
									options={chronicHealthProblemsOption}
									className="patient-select"
									classNamePrefix="newselect"
									onChange={(e) => this.changeOption('chronic_health',e)}
									value={basicInfo.chronic_health}
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
						<GreenButton
							text="Load Data"
							className="mt-3 d-none"
							onClick={this.showFileDialog}
						/>
						<input type="file" id="upload_input" className="d-none" onChange={this.fileChange} />
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