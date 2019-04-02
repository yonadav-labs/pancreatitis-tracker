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
				sex: this.props.patient.sex || {value: '', unit: '', label: ''},
				age: this.props.patient.age || {value: '', unit: '', label: ''},
				height: this.props.patient.height || {value: '', unit: '', label: ''},
				weight: this.props.patient.weight || {value: '', unit: '', label: ''},
				bmi: this.props.patient.bmi || {value: '', unit: '', label: ''},
				ph: this.props.patient.ph || {value: '', unit: '', label: ''},
				pao2: this.props.patient.pao2 || {value: '', unit: '', label: ''},
				paco2: this.props.patient.paco2 || {value: '', unit: '', label: ''},
				hco3: this.props.patient.hco3 || {value: '', unit: '', label: ''},
				spo2: this.props.patient.spo2 || {value: '', unit: '', label: ''},
				fio2: this.props.patient.fio2 || {value: '', unit: '', label: ''},
				baseExcess: this.props.patient.baseExcess || {value: '', unit: '', label: ''},
				sodium: this.props.patient.sodium || {value: '', unit: '', label: ''},
				potassium: this.props.patient.potassium || {value: '', unit: '', label: ''},
				chloride: this.props.patient.chloride || {value: '', unit: '', label: ''},
				bicarbonate: this.props.patient.bicarbonate || {value: '', unit: '', label: ''},
				bun: this.props.patient.bun || {value: '', unit: '', label: ''},
				creatinine: this.props.patient.creatinine || {value: '', unit: '', label: ''},
				glucose: this.props.patient.glucose || {value: '', unit: '', label: ''},
				calcium: this.props.patient.calcium || {value: '', unit: '', label: ''},
				albumin: this.props.patient.albumin || {value: '', unit: '', label: ''},
				ast: this.props.patient.ast || {value: '', unit: '', label: ''},
				ldh: this.props.patient.ldh || {value: '', unit: '', label: ''},
				whiteBloodCellCount: this.props.patient.whiteBloodCellCount || {value: '', unit: '', label: ''},
				plateletCount: this.props.patient.plateletCount || {value: '', unit: '', label: ''},
				hematocrit: this.props.patient.hematocrit || {value: '', unit: '', label: ''},
				crp: this.props.patient.crp || {value: '', unit: '', label: ''},
				peritonitis: this.props.patient.peritonitis || {value: '', unit: '', label: ''},
				glasgowComaScore: this.props.patient.glasgowComaScore || {value: '', unit: '', label: ''},
				eyeResponse: this.props.patient.eyeResponse || {value: '', unit: '', label: ''},
				verbalResponse: this.props.patient.verbalResponse || {value: '', unit: '', label: ''},
				motorResponse: this.props.patient.motorResponse || {value: '', unit: '', label: ''},
				temperature: this.props.patient.temperature || {value: '', unit: '', label: ''},
				systolicBp: this.props.patient.systolicBp || {value: '', unit: '', label: ''},
				DiastolicBp: this.props.patient.DiastolicBp || {value: '', unit: '', label: ''},
				Map: this.props.patient.Map || {value: '', unit: '', label: ''},
				heartRate: this.props.patient.heartRate || {value: '', unit: '', label: ''},
				RespiratoryRate: this.props.patient.RespiratoryRate || {value: '', unit: '', label: ''},
				pleuralEffusion: this.props.patient.pleuralEffusion || {value: '', unit: '', label: ''},
				oliguria: this.props.patient.oliguria || {value: '', unit: '', label: ''},
				respiratoryFailure: this.props.patient.respiratoryFailure || {value: '', unit: '', label: ''},
				chronicHealthPoints: this.props.patient.chronicHealthPoints || {value: '', unit: '', label: ''},
				fluidReponsivity: this.props.patient.fluidReponsivity ||{value: '', unit: '', label: ''}
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
