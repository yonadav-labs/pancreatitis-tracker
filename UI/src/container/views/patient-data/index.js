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
	getScoresAction,
	loadInputHistoryAction,
	getHistoryByDateAction,
	clearHistoryAction,
	changeFooterBoxStatus
} from '../../actions/index';

import StepZilla from "react-stepzilla";
import 'react-stepzilla/src/css/main.css';
import { toast } from "react-toastify";


class PatientData extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: {...this.props.patient},
			error: {},
			units: { ...this.props.units },
			step: 0,
			historyData: []
		};

		this.updateInfo = this.updateInfo.bind(this);
	}

	getState = () => {
		return this.state.data;
	}

	componentWillMount() {
		this.props.loadInputHistoryAction();
	}

	componentDidMount() {
		jQuery("ol.progtrckr li span").on("click", (event) => {
			event.preventDefault();
			event.stopPropagation();
		});

		if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
			jQuery('.docking-footer').addClass('at-bottom');
		} else {
			jQuery('.docking-footer').removeClass('at-bottom');
		}
	}

	componentDidUpdate() {
		jQuery(window).scroll(() => {
			if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
				jQuery('.docking-footer').addClass('at-bottom');
			} else {
				jQuery('.docking-footer').removeClass('at-bottom');
			}
		});
	}

	componentWillReceiveProps(nextProps) {
		const data = { ...nextProps.patient};
		this.setState({ data: data, historyData: nextProps.historyData });
	}

	updateInfo(data, units) {
		let params = {...this.state.data, ...data};
		let unitParams = {...this.state.units, ...units};

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

	loadHisotryData = () => {
		this.props.loadInputHistoryAction();
	}

	savePatientData = () => {
		this.props.getScoresAction(this.state.data, this.state.units)
			.then(res => {
				if (res && res.success && res.data.is_approx_paO2) {
					toast.warn('PaO2 approximation was used.', {
						position: toast.POSITION.TOP_CENTER
					});
				}
			});
	}

	getHistoryByDate = (date) => {
		this.props.getHistoryByDateAction(date);
	}

	clearHistoryAction = () => {
		this.props.clearHistoryAction();
	}

	render () {
		const steps = [
			{name: 'Basic info', component: <BasicInfo step={0} getState={this.getState} updateInfo={this.updateInfo} data={this.state.data} units={this.state.units} loadHisotryData={this.loadHisotryData} historyData={this.state.historyData} getHistoryByDate={this.getHistoryByDate} clearHistoryAction={this.clearHistoryAction} changeFooterBoxStatus={this.props.changeFooterBoxStatus} />},
			{name: 'Vital Signs', component: <VitalSigns step={1} getState={this.getState} updateInfo={this.updateInfo} data={this.state.data} units={this.state.units} />},
			{name: 'Physical Exam', component: <PhysicalExam step={2} updateInfo={this.updateInfo} data={this.state.data} units={this.state.units} />},
			{name: 'Chemistry', component: <Chemistry step={3} updateInfo={this.updateInfo} data={this.state.data} units={this.state.units} />},
			{name: 'Hematology', component: <Hematology step={4} updateInfo={this.updateInfo} data={this.state.data} units={this.state.units} />},
			{name: 'Arterial Gases', component: <ArterialGases step={5} updateInfo={this.updateInfo} data={this.state.data} units={this.state.units} savePatientData={this.savePatientData} history={this.props.history} />}
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
		units: state.units,
		historyData: state.historyData
	};
};

const mapDispatchToProps = dispatch => {
	return Object.assign(
		bindActionCreators({
			setUpdatesPerPagePatientAction,
			getScoresAction,
			loadInputHistoryAction,
			getHistoryByDateAction,
			clearHistoryAction,
			changeFooterBoxStatus
		}, dispatch)
	);
};
	
export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(PatientData));
