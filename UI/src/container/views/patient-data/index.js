import React from "react";
import Title from '../../components/Title';
import BasicInfo from './basic-info';
import PhysicalExam from "./physical-exam";
import VitalSigns from './vital-sign';
import ArterialGases from './arterial-gases';
import Chemistry from './chemistry';
import Hematology from './hematology';

import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import {
	setUpdatesPerPagePatientAction,
	loadPatientDataAction,
	savePatientDataAction
} from '../../actions/index';

import StepZilla from "react-stepzilla";
import 'react-stepzilla/src/css/main.css';
import { toast } from "react-toastify";


class PatientData extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				sex: this.props.patient.sex || {value: '', label: ''},
				age: this.props.patient.age || {value: '', label: ''},
				height: this.props.patient.height || {value: '', label: ''},
				weight: this.props.patient.weight || {value: '', label: ''},
				bmi: this.props.patient.bmi || {value: '', label: ''},
				chronic_health: this.props.patient.chronic_health || {value: '', label: ''},
				ph: this.props.patient.ph || {value: '', label: ''},
				paO2: this.props.patient.paO2 || {value: '', label: ''},
				paCO2: this.props.patient.paCO2 || {value: '', label: ''},
				hco3_artieral: this.props.patient.hco3_artieral || {value: '', label: ''},
				spO2: this.props.patient.spO2 || {value: '', label: ''},
				fiO2: this.props.patient.fiO2 || {value: '', label: ''},
				base_excess: this.props.patient.base_excess || {value: '', label: ''},
				sodium: this.props.patient.sodium || {value: '', label: ''},
				potassium: this.props.patient.potassium || {value: '', label: ''},
				chloride: this.props.patient.chloride || {value: '', label: ''},
				hco3_serum: this.props.patient.hco3_serum || {value: '', label: ''},
				bun: this.props.patient.bun || {value: '', label: ''},
				creatinine: this.props.patient.creatinine || {value: '', label: ''},
				glucose: this.props.patient.glucose || {value: '', label: ''},
				calcium: this.props.patient.calcium || {value: '', label: ''},
				albumin: this.props.patient.albumin || {value: '', label: ''},
				ast: this.props.patient.ast || {value: '', label: ''},
				alt: this.props.patient.alt || {value: '', label: ''},
				ldh: this.props.patient.ldh || {value: '', label: ''},
				wbc: this.props.patient.wbc || {value: '', label: ''},
				platelet_count: this.props.patient.platelet_count || {value: '', label: ''},
				hematocrit: this.props.patient.hematocrit || {value: '', label: ''},
				crp: this.props.patient.crp || {value: '', label: ''},
				guarding: this.props.patient.guarding || { value: '', label: '' },
				tenderness: this.props.patient.tenderness || { value: '', label: '' },
				eye_score: this.props.patient.eye_score || {value: '', label: ''},
				verbal_score: this.props.patient.verbal_score || {value: '', label: ''},
				motor_score: this.props.patient.motor_score || {value: '', label: ''},
				pleural_eff: this.props.patient.pleural_eff || {value: '', label: ''},
				temperature: this.props.patient.temperature || {value: '', label: ''},
				bp_systolic: this.props.patient.bp_systolic || {value: '', label: ''},
				bp_diastolic: this.props.patient.bp_diastolic || {value: '', label: ''},
				heart_rate: this.props.patient.heart_rate || {value: '', label: ''},
				resp_rate: this.props.patient.resp_rate || {value: '', label: ''}
			},
			error: {

			},
			units: { ...this.props.units },
			step: 0
		};

		this.updateInfo = this.updateInfo.bind(this);
	}

	getState = () => {
		return this.state.data;
	}

	componentDidMount() {
		jQuery("ol.progtrckr li span").on("click", (event) => {
			event.preventDefault();
			event.stopPropagation();
		});
	}

	componentWillReceiveProps(nextProps) {
		/* eslint-disable eqeqeq */
		if (this.state.data != nextProps.patient) {
			this.setState({ data: nextProps.patient });
		}
	}

	updateInfo(data, units) {
		let params = Object.assign({}, this.state.data, data);
		let unitParams = Object.assign({}, this.state.units, units);

		this.setState({ data: params, units: unitParams });
		this.props.setUpdatesPerPagePatientAction({
			data: params,
			units: unitParams,
			step: this.state.step + 1
		});
	}

	changeStep = (step) => {
		this.setState({ step });
	}

	loadPatientData = (files) => {
		this.props.loadPatientDataAction(files);
	}

	savePaientData = () => {
		this.props.savePatientDataAction(this.state.data)
			.then(res => {
				if (res && res.success && res.data.is_approx_paO2) {
					toast.warn('PaO2 approximation was used.', {
						position: toast.POSITION.TOP_CENTER
					});
				}
			});
	}

	render () {
		const steps = [
			{name: 'Basic info', component: <BasicInfo step={0} getState={this.getState} updateInfo={this.updateInfo} data={this.state.data} units={this.state.units} loadData={this.loadPatientData} />},
			{name: 'Vital Signs', component: <VitalSigns step={1} getState={this.getState} updateInfo={this.updateInfo} data={this.state.data} units={this.state.units} />},
			{name: 'Physical Exam', component: <PhysicalExam step={2} updateInfo={this.updateInfo} data={this.state.data} units={this.state.units} />},
			{name: 'Chemistry', component: <Chemistry step={3} updateInfo={this.updateInfo} data={this.state.data} units={this.state.units} />},
			{name: 'Hematology', component: <Hematology step={4} updateInfo={this.updateInfo} data={this.state.data} units={this.state.units} />},
			{name: 'Arterial Gases', component: <ArterialGases step={5} updateInfo={this.updateInfo} data={this.state.data} units={this.state.units} savePatientData={this.savePaientData} history={this.props.history} />}
		];

		return (
			<div className="app-content">
				<Title title="Patient Data" />
				<div className="container">
					<div className="page-subtitle text-center">
						Please enter as much patient information as possible and
						currently available to ensure the most accurate characterization
					</div>
					<div className="page-section">
						<div className="mb-5">
							<div className='example'>
								<div className='step-progress'>
									<StepZilla
										steps={steps}
										onStepChange={(step) => this.changeStep(step)}
										stepsNavigation={true}
										showNavigation={false}
										preventEnterSubmission={true}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStatetoProps = state => {
	return {
		patient: state.patient,
		units: state.units
	};
};

const mapDispatchToProps = dispatch => {
	return Object.assign(
		{ dispatch },
		bindActionCreators({
			setUpdatesPerPagePatientAction,
			loadPatientDataAction,
			savePatientDataAction
		}, dispatch)
	);
};
	
export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PatientData));
