import React from 'react';
import ReactTooltip from 'react-tooltip';
import Select from 'react-select';
import {validateForm} from '../../utils/utils';
import GreenButton from "../../components/GreenButton";

const booleanOption = [
	{ value: true, label: 'Yes' },
	{ value: false, label: 'No' }
];

const eyeResponseOption = [
	{ value: 1, label: 'Does not open' },
	{ value: 2, label: 'Opens in response to pain' },
	{ value: 3, label: 'Open in response to voice' },
	{ value: 4, label: 'Opens eyes spontaneously' }
];

const verbalResponseOption = [
	{ value: 1, label: 'Makes no sound' },
	{ value: 2, label: 'Makes sounds' },
	{ value: 3, label: 'Inappropriate words' },
	{ value: 4, label: 'Confused, disoriented' },
	{ value: 5, label: 'Oriented, converses normally' }
];

const motorResponseOption = [
	{ value: 1, label: 'Makes no movement' },
	{ value: 2, label: 'Extension to painful stimuli' },
	{ value: 3, label: 'Abnormal flexion to painful stimuli' },
	{ value: 4, label: 'Flexion/withdrawal to painful stimuli' },
	{ value: 5, label: 'Localizes to painful stimuli' },
	{ value: 6, label: 'Obeys command' }
];

const pleural_effOption = [
	{ value: null, label: 'No CXR' },
	{ value: false, label: 'CXR with no effusion' },
	{ value: true, label: 'CXR with pleural effusion' }
];

class PhysicalExam extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			physicalExam: {
				abdominalGuarding: this.props.data.abdominalGuarding || { value: '', label: '' },
				abdominalTenderness: this.props.data.abdominalTenderness || { value: '', label: '' },
				eye_score: this.props.data.eye_score || {value: '', unit: 'a.u'},
				verbal_score: this.props.data.verbal_score || {value: '', unit: 'a.u'},
				motor_score: this.props.data.motor_score || {value: '', unit: 'a.u'},
				pleural_eff: this.props.data.pleural_eff || { value: '', label: '' }
			},
			units: {
				abdominalGuarding: '',
				eye_score: 'a.u',
				verbal_score: 'a.u',
				motor_score: 'a.u',
				pleural_eff: ''
			},
			rules: {
				abdominalGuarding: {
					name: 'abdominalGuarding',
					type: 'boolean'
				},
				abdominalTenderness: {
					name: 'abdominalTenderness',
					type: 'boolean'
				},
				pleural_eff: {
					name: 'pleural_eff',
					type: ''
				},
				glasgow_coma: {
					name: 'glasgow_coma',
					type: 'integer',
					range: [{ min: 3, max: 15, unit: 'a.u'}],
					required: true
				},
				eye_score: {
					name: 'eye_score',
					type: 'integer',
					range: [
						{ min: 1, max: 4, unit: 'a.u' }
					],
					required: true
				},
				verbal_score: {
					name: 'verbal_score',
					type: 'integer',
					range: [
						{ min: 1, max: 5, unit: 'a.u' }
					],
					required: true
				},
				motor_score: {
					name: 'motor_score',
					type: 'integer',
					range: [
						{ min: 1, max: 6, unit: 'a.u' }
					],
					required: true
				}
			},
			errors: {},
			glasgow_coma: 0
		};

		this.changeInfo = this.changeInfo.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const params = { ...this.state.physicalExam, ...nextProps.data};
		this.setState({ physicalExam: params });
	}

	changeInfo(e) {
		let params = this.state.physicalExam;
		const {rules} = this.state;
		if (rules[e.target.id] && rules[e.target.id].type === "integer") {
			if (!isNaN(parseFloat(e.target.value))) {
				params[e.target.id].value = parseFloat(e.target.value);
			} else {
				params[e.target.id].value = e.target.value;
			}
		} else {
			params[e.target.id].value = e.target.value;
		}

		this.setState({ physicalExam: params });
		this.props.updateInfo(params, this.state.units);
	}

	changeOption = (id, val) => {
		let {physicalExam, glasgow_coma} = this.state;
		physicalExam[id] = {...physicalExam[id], ...val};

		if (id === 'eye_score' || id === 'verbal_score' || id === 'motor_score') {
			glasgow_coma += val.value;
		}

		this.setState({ physicalExam, glasgow_coma });
		this.props.updateInfo(physicalExam, this.state.units);
	}

	next = () => {
		const errors = {};
		const {rules, physicalExam, units, glasgow_coma} = this.state;

		Object.keys(physicalExam).forEach((data) => {
			if (rules[data]) {
				const validateResponse = validateForm(rules[data], physicalExam[data], units[data]);
				if (!validateResponse.success) {
					errors[data] = {
						msg: validateResponse.msg
					};
				}
			}
		});

		if (glasgow_coma !== 0) {
			const msg = 'Value should be selected.';
			if (physicalExam.verbal_score.value === '') {
				errors.verbal_score = { msg: msg };
			}

			if (physicalExam.motor_score.value === '') {
				errors.motor_score = { msg: msg };
			}

			if (physicalExam.eye_score.value === '') {
				errors.eye_score = { msg: msg };
			}
		}

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
		const {physicalExam, errors} = this.state;

		return (
			<div>
				<ReactTooltip effect='solid' />
				<div className="row">
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div
									className="round-btn grey-label"
									data-multiline="true"
									data-tip="Contraction and tensing of the abdominal wall muscles in response to palpation"
								>
									Abdominal Guarding
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<Select
									options={booleanOption}
									className="patient-select"
									classNamePrefix="newselect"
									onChange={(e) => this.changeOption('abdominalGuarding', e)}
									value={physicalExam.abdominalGuarding}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.abdominalGuarding && errors.abdominalGuarding.msg}
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
									data-tip="Pain after slowly pressing on the abdomen and then suddenly releasing the pressure"
								>
									Abdominal Tenderness
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<Select
									options={booleanOption}
									className="patient-select"
									classNamePrefix="newselect"
									onChange={(e) => this.changeOption('abdominalTenderness', e)}
									value={physicalExam.abdominalTenderness}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.abdominalTenderness && errors.abdominalTenderness.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Pleural Effusion</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<Select
									options={pleural_effOption}
									id="pleural_eff"
									className="patient-select"
									classNamePrefix="newselect"
									onChange={(e) => this.changeOption('pleural_eff', e)}
									value={physicalExam.pleural_eff}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.physicalExam && errors.physicalExam.msg}
								</label>
							</div>
						</div>
					</div>
				</div>
				<h2 className="section-title">Glasgow Coma Score</h2>
				<div className="row">
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Eye Response</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<Select
									options={eyeResponseOption}
									className="patient-select"
									classNamePrefix="newselect"
									onChange={(e) => this.changeOption('eye_score', e)}
									value={physicalExam.eye_score}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.eye_score && errors.eye_score.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Verbal Response</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<Select
									options={verbalResponseOption}
									className="patient-select"
									classNamePrefix="newselect"
									onChange={(e) => this.changeOption('verbal_score', e)}
									value={physicalExam.verbal_score}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.verbal_score && errors.verbal_score.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-md-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Motor Response</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<Select
									options={motorResponseOption}
									className="patient-select"
									classNamePrefix="newselect"
									onChange={(e) => this.changeOption('motor_score', e)}
									value={physicalExam.motor_score}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.motor_score && errors.motor_score.msg}
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

export default PhysicalExam;