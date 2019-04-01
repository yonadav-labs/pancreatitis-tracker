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
import { setUpdatesPerPagePatientAction, loadPatientDataAction } from '../../actions/index';

import StepZilla from "react-stepzilla";
import 'react-stepzilla/src/css/main.css';

class PatientData extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				sex: '',
				age: '',
				height: '',
				weight: '',
				bmi: '',
				ph: '',
				pao2: '',
				paco2: '',
				hco3: '',
				spo2: '',
				fio2: '',
				baseExcess: '',
				sodium: '',
				potassium: '',
				chloride: '',
				bicarbonate: '',
				bun: '',
				creatinine: '',
				glucose: '',
				calcium: '',
				albumin: '',
				ast: '',
				ldh: '',
				whiteBloodCellCount: '',
				plateletCount: '',
				hematocrit: '',
				crp: '',
				peritonitis: '',
				glasgowComaScore: '',
				eyeResponse: '',
				verbalResponse: '',
				motorResponse: '',
				temperature: '',
				systolicBp: '',
				DiastolicBp: '',
				Map: '',
				heartRate: '',
				RespiratoryRate: '',
				pleuralEffusion: '',
				oliguria: '',
				respiratoryFailure: '',
				chronicHealthPoints: '',
				fluidReponsivity:  ''
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
			{name: 'Hematology', component: <Hematology step={5} updateInfo={this.updateInfo} data={this.state.data} />}
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
									stepsNavigation={false}
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
		bindActionCreators({setUpdatesPerPagePatientAction, loadPatientDataAction}, dispatch)
	);
};
  
export default connect(mapStatetoProps, mapDispatchToProps)(PatientData);
