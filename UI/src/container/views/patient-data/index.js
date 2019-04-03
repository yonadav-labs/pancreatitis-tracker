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
import {
	setUpdatesPerPagePatientAction,
	loadPatientDataAction,
	savePatientDataAction
} from '../../actions/index';

import StepZilla from "react-stepzilla";
import 'react-stepzilla/src/css/main.css';

class PatientData extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				sex: this.props.patient.sex || { value: 'm', label: 'Male' },
				age: this.props.patient.age || {value: '', unit: 'years'},
				height: this.props.patient.height || {value: '', unit: 'cm'},
				weight: this.props.patient.weight || {value: '', unit: 'kg'},
				bmi: this.props.patient.bmi || {value: '', unit: 'kg/m2'},
				chronicHealthProblems: this.props.patient.chronicHealthProblems || {value: ''},
				o2Saturation: this.props.patient.o2Saturation || {value: '', unit: '%'},
				ph: this.props.patient.ph || {value: '', unit: ''},
				pao2: this.props.patient.pao2 || {value: '', unit: 'mmHg'},
				paco2: this.props.patient.paco2 || {value: '', unit: 'mmHg'},
				hco3_artieral: this.props.patient.hco3_artieral || {value: '', unit: 'mmol/L'},
				spo2: this.props.patient.spo2 || {value: '', unit: '%'},
				fio2: this.props.patient.fio2 || {value: '', unit: '%'},
				baseExcess: this.props.patient.baseExcess || {value: '', unit: 'mEq/L'},
				sodium: this.props.patient.sodium || { value: '', unit: 'mmol/L'},
				potassium: this.props.patient.potassium || { value: '', unit: 'mmol/L'},
				chloride: this.props.patient.chloride || { value: '', unit: 'mmol/L'},
				hco3_serum: this.props.patient.hco3_serum || { value: '', unit: 'mmol/L'},
				bun: this.props.patient.bun || { value: '', unit: 'mg/dL'},
				creatinine: this.props.patient.creatinine || { value: '', unit: 'mg/dL'},
				glucose: this.props.patient.glucose || { value: '', unit: 'mmol/L'},
				calcium: this.props.patient.calcium || { value: '', unit: 'mmol/L'},
				albumin: this.props.patient.albumin || { value: '', unit: 'mg/dL'},
				ast: this.props.patient.ast || { value: '', unit: 'U/L'},
				alt: this.props.patient.alt || { value: '', unit: 'U/L'},
				ldh: this.props.patient.ldh || { value: '', unit: 'IU/L'},
				whiteBloodCellCount: this.props.patient.whiteBloodCellCount || { value: '', unit: '10^9 cells/L'},
				plateletCount: this.props.patient.plateletCount || { value: '', unit: '10^3 units/mm^3'},
				hematocrit: this.props.patient.hematocrit || { value: '', unit: '%'},
				crp: this.props.patient.crp || { value: '', unit: 'mg/L'},
				peritonitis: this.props.patient.peritonitis || { value: '', label: '' },
				glasgowComaScore: this.props.patient.glasgowComaScore || {value: '', unit: 'a.u'},
				eyeResponse: this.props.patient.eyeResponse || {value: '', unit: 'a.u'},
				verbalResponse: this.props.patient.verbalResponse || {value: '', unit: 'a.u'},
				motorResponse: this.props.patient.motorResponse || {value: '', unit: 'a.u'},
				pleuralEffusion: this.props.patient.pleuralEffusion || { value: '', label: '' },
				temperature: this.props.patient.temperature || {value: '', unit: 'celcius'},
				systolicBp: this.props.patient.systolicBp || {value: '', unit: 'mmHg'},
				DiastolicBp: this.props.patient.DiastolicBp || {value: '', unit: 'mmHg'},
				heartRate: this.props.patient.heartRate || {value: '', unit: 'bpm'},
				RespiratoryRate: this.props.patient.RespiratoryRate || {value: '', unit: 'bpm'},
				Map: this.props.patient.Map ||  {value: '', label: '', unit: ''},
				oliguria: this.props.patient.oliguria ||  {value: '', label: '', unit: ''},
				respiratoryFailure: this.props.patient.respiratoryFailure ||  {value: '', label: '', unit: ''},
				chronicHealthPoints: this.props.patient.chronicHealthPoints ||  {value: '', label: '', unit: ''},
				fluidReponsivity: this.props.patient.fluidReponsivity || {value: '', label: '', unit: ''}
			},
			error: {

			},
			step: 0
		};

		this.updateInfo = this.updateInfo.bind(this);
	}

	componentDidMount() {
		jQuery("ol.progtrckr li span").on("click", (event) => {
			event.preventDefault();
		});
	}

	componentWillReceiveProps(nextProps) {
		/* eslint-disable eqeqeq */
		if (this.state.data != nextProps.patient) {
			this.setState({ data: nextProps.patient });
		}
	}

	updateInfo(data) {
		let params = Object.assign({}, this.state.data, data);

		this.setState({ data: params });
		this.props.setUpdatesPerPagePatientAction({ data: params, step: this.state.step + 1 });
	}

	changeStep = (step) => {
		this.setState({ step });
	}

	loadPatientData = (files) => {
		this.props.loadPatientDataAction(files);
	}

	render () {
		const steps = [
			{name: 'Basic info', component: <BasicInfo step={0} updateInfo={this.updateInfo} data={this.state.data} loadData={this.loadPatientData} />},
			{name: 'Physical Exam', component: <PhysicalExam step={1} updateInfo={this.updateInfo} data={this.state.data} />},
			{name: 'Vital Signs', component: <VitalSigns step={2} updateInfo={this.updateInfo} data={this.state.data} />},
			{name: 'Arterial Gases', component: <ArterialGases step={3} updateInfo={this.updateInfo} data={this.state.data} />},
			{name: 'Chemistry', component: <Chemistry step={4} updateInfo={this.updateInfo} data={this.state.data} />},
			{name: 'Hematology', component: <Hematology step={5} updateInfo={this.updateInfo} data={this.state.data} savePatientData={this.props.savePatientDataAction} />}
		];

		console.log(this.state.data);

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
							<div className='step-progress'>
								<StepZilla
									steps={steps}
									onStepChange={this.changeStep}
									stepsNavigation={true}
									nextButtonCls="d-none"
									backButtonCls="d-none"
								/>
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
	  patient: state.patient
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
  
export default connect(mapStatetoProps, mapDispatchToProps)(PatientData);
