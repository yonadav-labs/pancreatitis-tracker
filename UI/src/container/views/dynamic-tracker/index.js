import React from "react";
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import Select from 'react-select';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import Title from '../../components/Title';
import { bindActionCreators } from "redux";
import GreenButton from "../../components/GreenButton";
import {
	getGraphDataAction
} from '../../actions/index';

const styles = {
	fontFamily: 'sans-serif',
	textAlign: 'center'
};

const xrangeOption = [
	{ value: '24', label: '24 Hours' },
	{ value: '48', label: '48 Hours' },
	{ value: '72', label: '72 Hours' },
	{ value: '0', label: 'All' }
];

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

	console.log(ci);
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
			xrange: props.xrange
		};
	}

	goToPatientData = () => {
		this.props.history.push('/patient');
	}

	componentDidMount() {
		this.props.getGraphDataAction(this.state.xrange);
	}

	changeOption = (id, val) => {
		let {xrange} = this.state;
		xrange = val.value;

		this.setState({ xrange });
		this.props.getGraphDataAction(xrange);
	}

	getData = () => {
		let { graphData } = this.props;
		return {
			datasets: [
				{
					label: 'SIRS',
					fill: false,
					lineTension: 0.1,
					backgroundColor: 'rgba(75,192,192,0.4)',
					borderColor: 'rgba(75,192,192,1)',
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: 'rgba(75,192,192,1)',
					pointBackgroundColor: '#fff',
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: 'rgba(75,192,192,1)',
					pointHoverBorderColor: 'rgba(220,220,220,1)',
					pointHoverBorderWidth: 2,
					pointRadius: 1,
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
					pointBackgroundColor: '#fff',
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: 'rgba(33, 37, 41,1)',
					pointHoverBorderColor: 'rgba(220,220,220,1)',
					pointHoverBorderWidth: 2,
					pointRadius: 1,
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
					pointBackgroundColor: '#fff',
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: 'rgba(251, 99, 64,1)',
					pointHoverBorderColor: 'rgba(220,220,220,1)',
					hidden: true,
					pointHoverBorderWidth: 2,
					pointRadius: 1,
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
					pointBackgroundColor: '#fff',
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: 'rgba(94, 114, 228,1)',
					pointHoverBorderColor: 'rgba(220,220,220,1)',
					hidden: true,
					pointHoverBorderWidth: 2,
					pointRadius: 1,
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
		return (
			<div className="app-content">
				<Title title="Dynamic Tracker" />
				<div className="container">
					<div className="my-5">
						<Line ref={(reference) => this.chartReference = reference} data={this.getData()} options={this.getOptions()} id="_k2j3r23" />
					</div>
					<div className="col-12">
						<div className="row mb-5">
							<div className="col-6 col-md-4 col-xl-3 offset-md-2 offset-xl-3">
								<div className="round-btn grey-label">Period</div>
							</div>
							<div className="col-6 col-md-4 col-xl-3">
								<Select
									options={xrangeOption}
									className="patient-select"
									classNamePrefix="newselect"
									onChange={(e) => this.changeOption('sex', e)}
									value={xrangeOption.filter(option => option.value === this.state.xrange)}
								/>
							</div>
							<label className="form-check-label section-description ml-5 mt-3">
								<input type="checkbox"
									className="form-check-input mt-3"
									style={{ marginLeft: '-2rem' }}
									onChange={this.changeValue} />Outline
							</label>
						</div>
					</div>
					<div className="text-center mb-5">
						<GreenButton text="Patient Data" onClick={this.goToPatientData} />
					</div>
				</div>
			</div>
		);
	}
}

const mapStatetoProps = state => {
	return {
		xrange: state.xrange,
		graphData: state.graphData
	};
};

const mapDispatchToProps = dispatch => {
	return Object.assign(
		bindActionCreators({
			getGraphDataAction
		}, dispatch)
	);
};

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(DynamicTracker));
