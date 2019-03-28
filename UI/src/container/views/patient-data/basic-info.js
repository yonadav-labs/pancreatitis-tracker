import React from 'react';
import GreenButton from "../../components/GreenButton";
import RadioGroup from "../../components/RadioGroup";

const sexOption = [
	{ value: 'm', label: 'M' },
	{ value: 's', label: 'S' }
];

class BasicInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			basicInfo: {
				sex: this.props.data.sex || {value: ''},
				age: this.props.data.age || {value: '', unit: 'years'},
				height: this.props.data.height || {value: '', unit: 'cm'},
				weight: this.props.data.weight || {value: '', unit: 'kg'},
				bmi: this.props.data.bmi || {value: '', unit: 'kg/m2'}
			},
			rules: {
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
						{ min: 13, max: 100, unit: 'lb' }
					]
				},
				bmi: {
					name: 'bmi',
					type: 'integer',
					range: [
						{ min: 13, max: 100, unit: 'kg/m2' }
					]
				}
			}
		};

		this.changeInfo = this.changeInfo.bind(this);
	}

	changeInfo(e) {
		let params = this.state.basicInfo;
		params[e.target.id].value = e.target.value;

		this.setState({ basicInfo: params });
		this.props.updateInfo(params);
	}

	changeUnit = (id, value) => {
		let params = this.state.basicInfo;
		params[id].unit = value;

		this.setState({basicInfo: params});
	}

	validateForm = (rule, data) => {
		let isValidate = true;
			
		if (rule) {
			if (!data || data.value === '') {
				isValidate = false;
			} else if (rule.type === 'integer') {
				rule.range.forEach((range) => {
					/* eslint-disable no-debugger */
					// debugger;
					if (
						range.unit === data.unit &&
						(
							range.min > parseInt(data.value, 10)
							|| range.max < parseInt(data.value, 10)
						)
					) {
						isValidate = false;
					}
				});
			}
		}

		return isValidate;
	}

	next = () => {
		const errors = [];
		const {rules, basicInfo} = this.state;

		Object.keys(basicInfo).forEach((data) => {
			if (rules[data]) {
				if (!this.validateForm(rules[data], basicInfo[data])) {
					errors.push({
						msg: `${data} is not valid!`
					});
				}
			}
		});

		this.props.jumpToStep(this.props.step+1);
	}

	changeSex = (val) => {
		console.log('change sex: ', val);
		let {basicInfo} = this.state;
		basicInfo.sex.value = val;

		this.setState({ basicInfo });
	}

	render() {
		const {basicInfo} = this.state;

		return (
			<div>
				<div className="row">
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Sex</div>
							</div>
							<div className="col-xs-12 col-sm-6 d-flex">
								{/* <input
									type="text"
									id="sex"
									className="round-input"
									value={basicInfo.sex.value}
									onChange={this.changeInfo}
								/> */}
								<RadioGroup
									options={sexOption}
									onChange={this.changeSex}
									value={basicInfo.sex.value}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Age</div>
							</div>
							<div className="col-xs-12 col-sm-6 d-flex">
								<input
									type="text"
									id="age"
									className="round-input"
									value={basicInfo.age.value}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Height</div>
							</div>
							<div className="col-xs-12 col-sm-6 d-flex">
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
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Weight</div>
							</div>
							<div className="col-xs-12 col-sm-6 d-flex">
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
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
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
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="pt-3 text-center">
					<div className="d-flex justify-content-between">
						<GreenButton text="Load Data" className="mt-3" />
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