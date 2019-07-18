import React from "react";
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';

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
	// debugger;
	let meta = ci.getDatasetMeta(index);
	if (selected.length < 2 || meta.hidden === false || (meta.hidden === null && !ci.data.datasets[index].hidden)) {
		meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;
		ci.update();

		// update y axis
		selected = getSelected(ci);
		if (selected.length == 2) {
			ci.getDatasetMeta(selected[0]).yAxisID = 'y-axis-1';
			ci.getDatasetMeta(selected[1]).yAxisID = 'y-axis-2';
			ci.scales["y-axis-1"].options.ticks.minor.fontColor = ci.data.datasets[selected[0]].borderColor;
			ci.scales["y-axis-2"].options.ticks.minor.fontColor = ci.data.datasets[selected[1]].borderColor;
		} else if (selected.length == 1) {
			ci.scales["y-axis-1"].options.ticks.minor.fontColor = ci.data.datasets[selected[0]].borderColor;
		} else {
			ci.scales["y-axis-1"].options.ticks.minor.fontColor = 'grey';
			ci.scales["y-axis-2"].options.ticks.minor.fontColor = 'grey';
		}
		ci.update();
	}
};


class DynamicTracker extends React.Component {
	constructor(props) {
		super(props);

	}

	goToPatientData = () => {
		this.props.history.push('/patient');
	}

	componentDidMount() {
		this.props.getGraphDataAction();
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
							fontColor: 'rgba(75,192,192,1)'
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
							fontColor: 'rgba(33, 37, 41,1)'
						}
					}
				]
			}
		};

	}

	render () {
		return (
			<div className="app-content">
				<Title title="Dynamic Tracker" />
				<div className="container">
					<div className="my-5">
						<Line data={this.getData()} options={this.getOptions()} />
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
