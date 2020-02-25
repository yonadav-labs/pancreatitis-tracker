import React from 'react';
import ReactTooltip from 'react-tooltip';
import Select from 'react-select';
import { validateStep } from '../../utils/utils';
import GreenButton from "../../components/GreenButton";
import { toast } from "react-toastify";

const booleanOption = [
	{ value: true, label: 'Yes' },
	{ value: false, label: 'No' },
	{ value: null, label: 'Unknown' }
];

const eyeResponseOption = [
	{ value: 1, label: 'Does not open' },
	{ value: 2, label: 'Opens in response to pain', background: '#eee' },
	{ value: 3, label: 'Open in response to voice' },
	{ value: 4, label: 'Opens eyes spontaneously', background: '#eee' }
];

const verbalResponseOption = [
	{ value: 1, label: 'Makes no sound' },
	{ value: 2, label: 'Makes sounds', background: '#eee' },
	{ value: 3, label: 'Inappropriate words' },
	{ value: 4, label: 'Confused, disoriented', background: '#eee' },
	{ value: 5, label: 'Oriented, converses normally' }
];

const motorResponseOption = [
	{ value: 1, label: 'Makes no movement' },
	{ value: 2, label: 'Extension to painful stimuli', background: '#eee' },
	{ value: 3, label: 'Abnormal flexion to painful stimuli' },
	{ value: 4, label: 'Flexion/withdrawal to painful stimuli', background: '#eee' },
	{ value: 5, label: 'Localizes to painful stimuli' },
	{ value: 6, label: 'Obeys command', background: '#eee' }
];

const pleural_effOption = [
	{ value: null, label: 'No CXR' },
	{ value: false, label: 'CXR with no effusion', background: '#eee' },
	{ value: true, label: 'CXR with pleural effusion' }
];

const colourStyles = {
	control: styles => ({ ...styles, backgroundColor: 'white' }),
	option: (styles, { data, isDisabled, isFocused, isSelected }) => {
		return {
			...styles,
			backgroundColor: isSelected ? '#007bff' : (isFocused ? '#dbf4fd' : data.background)
		};
	}
};

class PhysicalExam extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			physicalExam: {
				guarding: this.props.data.guarding,
				tenderness: this.props.data.tenderness,
				eye_score: this.props.data.eye_score,
				verbal_score: this.props.data.verbal_score,
				motor_score: this.props.data.motor_score,
				pleural_eff: this.props.data.pleural_eff
			},
			units: {
				guarding: this.props.units.guarding,
				eye_score: this.props.units.eye_score,
				verbal_score: this.props.units.verbal_score,
				motor_score: this.props.units.motor_score,
				pleural_eff: this.props.units.pleural_eff
			},
			rules: {
				guarding: {
					name: 'guarding',
					type: 'boolean'
				},
				tenderness: {
					name: 'tenderness',
					type: 'boolean'
				},
				pleural_eff: {
					name: 'pleural_eff',
					type: ''
				},
				eye_score: {
					name: 'eye_score',
					type: 'integer'
				},
				verbal_score: {
					name: 'verbal_score',
					type: 'integer'
				},
				motor_score: {
					name: 'motor_score',
					type: 'integer'
				}
			},
			errors: {}
		};

		this.changeInfo = this.changeInfo.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const params = { ...this.state.physicalExam, ...nextProps.data};
		this.setState({ physicalExam: params });
	}

	changeInfo(e) {
		let params = this.state.physicalExam;
		params[e.target.id] = e.target.value;

		this.setState({ physicalExam: params });
	}

	changeOption = (id, val) => {
		let {physicalExam} = this.state;
		physicalExam[id] = val.value;

		this.setState({ physicalExam });
	}

	isValidated = () => {
		const {rules, physicalExam, units} = this.state;
		let isPageValid = true;
		let {data, errors} = validateStep(physicalExam, units, rules);

		if (Object.keys(errors).length === 0) {
			if (data['guarding'] !== '' && data['tenderness'] === '') {
				errors.tenderness = { msg: 'Please enter Rebound Tenderness to proceed.'};
			} else if (data['guarding'] === '' && data['tenderness'] !== '') {
				errors.guarding = { msg: 'Please enter Abdominal Guarding to proceed.' };
			}
		}

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

	handleKeyPress = async (e, isSelect=false) => {
		if (e.keyCode === 13) {
			if (isSelect) {
				await setTimeout(() => {}, 50);
			}
			this.gotoStep(1);
		}
	}

	render() {
		const {physicalExam, errors} = this.state;

		return (
			<div>
				<ReactTooltip effect='solid' className="tooltop-bar" />
				<div className="row">
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div
									className="round-btn grey-label"
									data-multiline="true"
									data-tip="Contraction and tensing of the abdominal wall muscles in response to palpation"
									data-event="click"
								>
									Abdominal Guarding
									<img src="/assets/images/info-w.png" className="ml-3" style={{ height: '17px', marginTop: '-4px' }} />
								</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<Select
									options={booleanOption}
									className="patient-select"
									classNamePrefix="newselect"
									onChange={(e) => this.changeOption('guarding', e)}
									onKeyDown={event => this.handleKeyPress(event, true)}
									value={booleanOption.filter(option => option.value === physicalExam.guarding)}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.guarding && errors.guarding.msg}
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
									data-tip="Pain after slowly pressing on the abdomen and then suddenly releasing the pressure"
									data-event="click"
								>
									Rebound Tenderness
									<img src="/assets/images/info-w.png" className="ml-3" style={{ height: '17px', marginTop: '-4px' }} />
								</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<Select
									options={booleanOption}
									className="patient-select"
									classNamePrefix="newselect"
									onChange={(e) => this.changeOption('tenderness', e)}
									onKeyDown={event => this.handleKeyPress(event, true)}
									value={booleanOption.filter(option => option.value === physicalExam.tenderness)}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.tenderness && errors.tenderness.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">Pleural Effusion</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<Select
									options={pleural_effOption}
									id="pleural_eff"
									className="patient-select"
									classNamePrefix="newselect"
									styles={colourStyles}
									onChange={(e) => this.changeOption('pleural_eff', e)}
									onKeyDown={event => this.handleKeyPress(event, true)}
									value={pleural_effOption.filter(option => option.value === physicalExam.pleural_eff)}
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
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">Eye Response</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<Select
									options={eyeResponseOption}
									className="patient-select"
									classNamePrefix="newselect"
									styles={colourStyles}
									onChange={(e) => this.changeOption('eye_score', e)}
									onKeyDown={event => this.handleKeyPress(event, true)}
									value={eyeResponseOption.filter(option => option.value === physicalExam.eye_score)}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.eye_score && errors.eye_score.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">Verbal Response</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<Select
									options={verbalResponseOption}
									className="patient-select"
									classNamePrefix="newselect"
									styles={colourStyles}
									onChange={(e) => this.changeOption('verbal_score', e)}
									onKeyDown={event => this.handleKeyPress(event, true)}
									value={verbalResponseOption.filter(option => option.value === physicalExam.verbal_score)}
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.verbal_score && errors.verbal_score.msg}
								</label>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-lg-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<div className="round-btn grey-label">Motor Response</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<Select
									options={motorResponseOption}
									className="patient-select"
									classNamePrefix="newselect"
									styles={colourStyles}
									onChange={(e) => this.changeOption('motor_score', e)}
									onKeyDown={event => this.handleKeyPress(event, true)}
									value={motorResponseOption.filter(option => option.value === physicalExam.motor_score)}
									
								/>
								<label className="color-danger pt-2 text-danger text-center warning-message">
									{errors.motor_score && errors.motor_score.msg}
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

export default PhysicalExam;