import React from "react";
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import Title from '../../components/Title';
import { bindActionCreators } from "redux";
import GreenButton from "../../components/GreenButton";
import {
	getGraphDataAction,
	clearGraphData
} from '../../actions/index';
import { convertDateToUTC } from '../../utils/utils';

const getSelected = (ci) => {
	let selected = [];

	for (let i=0; i<4; i++) {
		let meta = ci.getDatasetMeta(i);
		if (meta.hidden === false || (meta.hidden === null && !ci.data.datasets[i].hidden)) {
			selected.push(i);
		}
	}
	return selected;
};

const newLegendClickHandler = function (e, legendItem) {
	let index = legendItem.datasetIndex;
	let ci = this.chart;
	let selected = getSelected(ci);

	let meta = ci.getDatasetMeta(index);
	if (selected.length < 2 || meta.hidden === false || (meta.hidden === null && !ci.data.datasets[index].hidden)) {
		meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;
		ci.update();

		// update y axis
		selected = getSelected(ci);
		if (selected.length === 2) {
			ci.getDatasetMeta(selected[0]).yAxisID = 'y-axis-1';
			ci.getDatasetMeta(selected[1]).yAxisID = 'y-axis-2';
			ci.scales["y-axis-1"].options.ticks.minor.fontColor = ci.data.datasets[selected[0]].borderColor;
			ci.scales["y-axis-2"].options.ticks.minor.fontColor = ci.data.datasets[selected[1]].borderColor;
		} else if (selected.length === 1) {
			ci.scales["y-axis-1"].options.ticks.minor.fontColor = ci.data.datasets[selected[0]].borderColor;
			ci.scales["y-axis-2"].options.ticks.minor.fontColor = 'white';
		} else {
			ci.scales["y-axis-1"].options.ticks.minor.fontColor = 'white';
			ci.scales["y-axis-2"].options.ticks.minor.fontColor = 'white';
		}
		ci.update();
	}
};


class DynamicTracker extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			fromDate: props.graphData & props.graphData.from_date ? props.graphData.from_date : null,
			toDate: props.graphData & props.graphData.to_date ? props.graphData.from_date : null
		};
	}

	componentDidMount() {
		this.props.getGraphDataAction('all', 'all');
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.graphData !== nextProps.graphData) {
			this.setState({
				fromDate: nextProps.graphData.from_date,
				toDate: nextProps.graphData.to_date
			});
		}
	}

	goToPatientData = () => {
		this.props.history.push('/patient');
	}

	onDatepickerRef = (el) => {
		if (el && el.input) {
			el.input.readOnly = true;
		}
	}

	changeDate = (id, date) => {
		const params = { ...this.state };
		params[id] = date ? date.toISOString() : null;
		this.setState(params);

		if (params.fromDate !== null && params.toDate !== null) {
			this.props.getGraphDataAction(params.fromDate, params.toDate);
		}
	}

	getData = () => {
		let { graphData } = this.props;
		return {
			datasets: [
				{
					label: 'SIRS',
					fill: false,
					lineTension: 0.1,
					backgroundColor: 'rgba(75,192,192,0.5)',
					borderColor: 'rgba(75,192,192,1)',
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: 'rgba(75,192,192,1)',
					pointBorderWidth: 1,
					pointHoverRadius: 7,
					pointHoverBackgroundColor: 'rgba(75,192,192,1)',
					pointHoverBorderColor: 'rgba(220,220,220,1)',
					pointHoverBorderWidth: 2,
					pointRadius: 3,
					pointHitRadius: 10,
					data: graphData.sirs,
					yAxisID: 'y-axis-1'
				},
				{
					label: 'MARSHALL',
					fill: false,
					lineTension: 0.1,
					backgroundColor: 'rgba(33, 37, 41,0.4)',
					borderColor: 'rgba(33, 37, 41,1)',
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: 'rgba(33, 37, 41,1)',
					pointBorderWidth: 1,
					pointHoverRadius: 7,
					pointHoverBackgroundColor: 'rgba(33, 37, 41,1)',
					pointHoverBorderColor: 'rgba(220,220,220,1)',
					pointHoverBorderWidth: 2,
					pointRadius: 3,
					pointHitRadius: 10,
					data: graphData.marshall,
					yAxisID: 'y-axis-2'
				},
				{
					label: 'BUN',
					fill: false,
					lineTension: 0.1,
					backgroundColor: 'rgba(251, 99, 64,0.4)',
					borderColor: 'rgba(251, 99, 64,1)',
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: 'rgba(251, 99, 64,1)',
					pointBorderWidth: 1,
					pointHoverRadius: 7,
					pointHoverBackgroundColor: 'rgba(251, 99, 64,1)',
					pointHoverBorderColor: 'rgba(220,220,220,1)',
					hidden: true,
					pointHoverBorderWidth: 2,
					pointRadius: 3,
					pointHitRadius: 10,
					data: graphData.bun,
					yAxisID: 'y-axis-2'
				},
				{
					label: 'CREATININE',
					fill: false,
					lineTension: 0.1,
					backgroundColor: 'rgba(94, 114, 228,0.4)',
					borderColor: 'rgba(94, 114, 228,1)',
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: 'rgba(94, 114, 228,1)',
					pointBorderWidth: 1,
					pointHoverRadius: 7,
					pointHoverBackgroundColor: 'rgba(94, 114, 228,1)',
					pointHoverBorderColor: 'rgba(220,220,220,1)',
					hidden: true,
					pointHoverBorderWidth: 2,
					pointRadius: 3,
					pointHitRadius: 10,
					data: graphData.creatinine,
					yAxisID: 'y-axis-1'
				}
			]
		};
	}

	changeValue = (e) => {
		let ci = this.chartReference.chartInstance;
		ci.data.datasets[0].showLine = e.target.checked;
		ci.data.datasets[1].showLine = e.target.checked;
		ci.data.datasets[2].showLine = e.target.checked;
		ci.data.datasets[3].showLine = e.target.checked;
		ci.update();
	}

	getOptions = () => {
		let { graphData } = this.props;
		return {
			responsive: true,
			legend: {
				onClick: newLegendClickHandler
			},
			tooltips: {
				mode: 'label'
			},
			elements: {
				line: {
					fill: false
				}
			},
			scales: {
				xAxes: [
					{
						display: true,
						gridLines: {
							display: false
						},
						labels: graphData.labels
					}
				],
				yAxes: [
					{
						type: 'linear',
						display: true,
						position: 'left',
						id: 'y-axis-1',
						gridLines: {
							display: false
						},
						labels: {
							show: true
						},
						ticks: {
							fontColor: 'rgba(75,192,192,1)',
							fontSize: 18
						}
					},
					{
						type: 'linear',
						display: true,
						position: 'right',
						id: 'y-axis-2',
						gridLines: {
							display: false
						},
						labels: {
							show: true
						},
						ticks: {
							fontColor: 'rgba(33, 37, 41,1)',
							fontSize: 18
						}
					}
				]
			}
		};
	}

	chartReference = {};

	render () {
		const fromDate = this.state.fromDate ? convertDateToUTC(new Date(this.state.fromDate)) : null;
		const toDate = this.state.toDate ? convertDateToUTC(new Date(this.state.toDate)) : null;

		return (
			<div className="app-content">
				<Title title="Dynamic Tracker" />
				<div className="container">
					<div className="my-5">
						<Line ref={(reference) => this.chartReference = reference} data={this.getData()} options={this.getOptions()} id="_k2j3r23" />
					</div>
					<div className="col-12">
						<div className="row mb-5">
							<div className="col-6 col-md-4 col-xl-3">
								<div className="round-btn grey-label">Period</div>
							</div>
							<div className="col-6 col-md-4 col-xl-3">
								<DatePicker
									id="time_stamp1"
									className="round-input"
									placeholderText="From"
									selected={fromDate ? new Date(fromDate) : null}
									maxDate={toDate ? new Date(toDate) : new Date()}
									ref={el => this.onDatepickerRef(el)}
									dateFormat="MM/dd/yyyy"
									onChange={(date) => this.changeDate('fromDate', date)}
								/>
							</div>
							<div className="col-6 col-md-4 col-xl-3">
								<DatePicker
									id="time_stamp2"
									className="round-input"
									placeholderText="To"
									selected={toDate ? new Date(toDate) : null}
									minDate={fromDate ? new Date(fromDate) : null}
									maxDate={new Date()}
									ref={el => this.onDatepickerRef(el)}
									dateFormat="MM/dd/yyyy"
									onChange={(date) => this.changeDate('toDate', date)}
								/>
							</div>
							<label className="form-check-label section-description ml-5 mt-3">
								<input type="checkbox"
									className="form-check-input mt-3"
									style={{ marginLeft: '-2rem' }}
									defaultChecked={true}
									onChange={this.changeValue} />Line - Fit
							</label>
						</div>
					</div>
					<div className="text-center space-between-section mb-5">
						<GreenButton text="Return to Patient Data" onClick={this.goToPatientData} />
						<GreenButton text="Next" onClick={() => this.props.history.push('/feedback')} />
					</div>
				</div>
			</div>
		);
	}
}

const mapStatetoProps = state => {
	return {
		fromDate: state.trackerFromDate,
		toDate: state.trackerToDate,
		graphData: state.graphData
	};
};

const mapDispatchToProps = dispatch => {
	return Object.assign(
		bindActionCreators({
			getGraphDataAction,
			clearGraphData
		}, dispatch)
	);
};

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(DynamicTracker));
