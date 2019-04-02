import React from 'react';
import GreenButton from "../../components/GreenButton";
import Select from 'react-select';
import {validateForm, lbToKgConvert, inchToCmConvert} from '../../utils/utils';

const sexOption = [
	{ value: 'm', label: 'Male' },
	{ value: 'f', label: 'Female' }
];

const chronicHealthProblemsOption = [
	{ value: 0, label: 'no chronic health problems' },
	{ value: 1, label: 'nonsurgical' },
	{ value: 2, label: 'elective postoperative' },
	{ value: 3, label: 'emergency postoperative' }
];

class BasicInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			basicInfo: {
				sex: this.props.data.sex || { value: 'm', label: 'Male' },
				age: this.props.data.age || {value: '', unit: 'years'},
				height: this.props.data.height || {value: '', unit: 'cm'},
				weight: this.props.data.weight || {value: '', unit: 'kg'},
				bmi: this.props.data.bmi || {value: '', unit: 'kg/m2'},
				chronicHealthProblems: this.props.data.chronicHealthProblems || {value: ''}
			},
			rules: {
				sex: {
					name: 'sex',
					type: 'text',
					required: true
				},
				age: {
					name: 'age',
					type: 'integer',
					range: [{ min: 0, max: 120, unit: 'years'}]
				},
				height: {
					name: 'height',
					type: 'integer',
					range: [
						{ min: 20, max: 214, unit: 'cm' },
						{ min: 19.8, max: 84, unit: 'inch' }
					]
				},
				weight: {
					name: 'weight',
					type: 'integer',
					range: [
						{ min: 2.5, max: 227, unit: 'kg' },
						{ min: 5.5, max: 500, unit: 'lb' }
					]
				}
			},
			errors: {}
		};

		this.changeInfo = this.changeInfo.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const params = { ...this.state.basicInfo, ...nextProps.data};
		this.setState({ basicInfo: params });
	}

	calculateBMI(params) {
		let bmiValue = '';
		
		if (
			(params.weight.value !== '' && params.weight.value !== 0) &&
			(params.height.value !== '' && params.height.value !== 0)
		) {
			let weightVal = parseFloat(params.weight.value);
			if (params.weight.unit === 'lb') {
				weightVal = lbToKgConvert(weightVal);
			}

			let heightVal = parseFloat(params.height.value) / 100;
			if (params.height.unit === 'inch') {
				heightVal = inchToCmConvert(heightVal);
			}

			bmiValue = (weightVal / Math.pow(heightVal, 2)).toFixed(2);
		}

		return bmiValue;
	}

	changeInfo(e) {
		let params = this.state.basicInfo;
		params[e.target.id].value = e.target.value;

		let bmiValue = '';
		if (e.target.id === 'weight' || e.target.id === 'height') {
			bmiValue = this.calculateBMI(params);
		}
		params.bmi.value = bmiValue;

		this.setState({ basicInfo: params });
	}

	changeUnit = (id, value) => {
		let params = this.state.basicInfo;
		params[id].unit = value;

		let bmiValue = '';
		if (id === 'weight' || id === 'height') {
			bmiValue = this.calculateBMI(params);
		}
		params.bmi.value = bmiValue;

		this.setState({basicInfo: params});
	}

	next = () => {
		const errors = {};
		const {rules, basicInfo} = this.state;

		Object.keys(basicInfo).forEach((data) => {
			if (rules[data]) {
				if (!validateForm(rules[data], basicInfo[data])) {
					errors[data] = {
						msg: 'Value is invalid!'
					};
				}
			}
		});

		if (Object.keys(errors).length > 0) {
			this.setState({ errors });
		} else {
			this.props.updateInfo(this.state.basicInfo);
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
		const {basicInfo, errors} = this.state;

		return (
			<div>
				<div className="row">
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
								<div className="round-btn grey-label">Age</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="age"
									className="round-input"
									value={basicInfo.age.value}
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
								<div className="round-btn grey-label">Height</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<div className="d-flex">
									<input
										type="text"
										id="height"
										className="round-input"
										value={basicInfo.height.value}
										onChange={this.changeInfo}
									/>
									<select
										className="input-inline-select"
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
										value={basicInfo.weight.value}
										onChange={this.changeInfo}
									/>
									<select
										className="input-inline-select"
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
								<input
									type="text"
									id="bmi"
									className="round-input"
									value={basicInfo.bmi.value}
									disabled
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div
									className="round-btn grey-label"
								>
									Chronic Health Problems
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<Select
									options={chronicHealthProblemsOption}
									className="patient-select"
									classNamePrefix="newselect"
									onChange={(e) => this.changeOption('chronicHealthProblems',e)}
									value={basicInfo.chronicHealthProblems}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.chronicHealthProblems && errors.chronicHealthProblems.msg}
								</label>
							</div>
						</div>
					</div>
				</div>
				<div className="pt-3 text-center">
					<div className="d-flex justify-content-between">
						<GreenButton
							text="Load Data"
							className="mt-3"
							onClick={this.showFileDialog}
						/>
						<input type="file" id="upload_input" className="d-none" onChange={this.fileChange} />
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

export default BasicInfo;