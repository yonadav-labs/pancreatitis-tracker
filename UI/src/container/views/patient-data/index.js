import React from "react";
import Title from '../../components/Title';
import BasicInfo from './basic-info';
import PhysicalExam from "./physical-exam";
import VitalSigns from './vital-sign';
import XRayOther from './x-ray-other';
import ArterialGases from './arterial-gases';
import Chemistry from './chemistry';
import Hematology from './hematology';

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
				score: '',
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
			}
		};

		this.updateInfo = this.updateInfo.bind(this);
	}

	componentDidMount() {
		jQuery("ol.progtrckr li span").on("click", (event) => {
			event.preventDefault();
			console.log("ADFDSFDSFS");
		});
	}

	updateInfo(data) {
		let params = Object.assign({}, this.state.data, data);

		this.setState({ data: params });
	}

	changeStep = (step) => {
		console.log('AAAA: ', step);
	}

	render () {
		const steps = [
			{name: 'Basic info', component: <BasicInfo updateInfo={this.updateInfo} data={this.state.data} />},
			{name: 'Physical Exam', component: <PhysicalExam updateInfo={this.updateInfo} data={this.state.data} />},
			{name: 'Vital Signs', component: <VitalSigns updateInfo={this.updateInfo} data={this.state.data} />},
			{name: 'X-Ray/Other', component: <XRayOther updateInfo={this.updateInfo} data={this.state.data} />},
			{name: 'Arterial Gases', component: <ArterialGases updateInfo={this.updateInfo} data={this.state.data} />},
			{name: 'Chemistry', component: <Chemistry updateInfo={this.updateInfo} data={this.state.data} />},
			{name: 'Hematology', component: <Hematology updateInfo={this.updateInfo} data={this.state.data} />}
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

export default PatientData;

