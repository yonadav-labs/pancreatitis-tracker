import React from "react";
import { Line } from 'react-chartjs-2';

import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import Title from '../../components/Title';
import GreenButton from "../../components/GreenButton";

const styles = {
	fontFamily: 'sans-serif',
	textAlign: 'center'
};

const data = {
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
			data: [65, 59, 80, 81, 56, 55, 40],
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
			data: [45, 61, 36, 35, 20, 39, 60],
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
			data: [15, 10, 19, 25, 11, 16, 10],
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
			data: [36, 30, 35, 30, 39, 25, 11],
			yAxisID: 'y-axis-1'
		}
	]
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

	let meta = ci.getDatasetMeta(index);
	if (selected.length < 2 || meta.hidden === false || (meta.hidden === null && !ci.data.datasets[index].hidden)) {
		meta.hidden = meta.hidden === null ? !ci.data.datasets[index].hidden : null;
		ci.update();

		// update y axis
		selected = getSelected(ci);
		if (selected.length > 1) {
			ci.getDatasetMeta(selected[0]).yAxisID = 'y-axis-1';
			ci.getDatasetMeta(selected[1]).yAxisID = 'y-axis-2';
			ci.update();
		}
	}
};

const options = {
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
				labels: ['Admission', '12 hours', '24 hours', '36 hours', '48 hours', '60 hours', '72 hours']
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
				}
			}
		]
	}
};


class DynamicTracker extends React.Component {
	constructor(props) {
		super(props);
	}

	goToPatientData = () => {
		this.props.history.push('/patient');
	}

	render () {
		return (
			<div className="app-content">
				<Title title="Dynamic Tracker" />
				<div className="container">
					<div className="my-5">
						<Line data={data} options={options} />
					</div>
					<div className="text-center mb-5">
						<GreenButton text="Patient Data" onClick={this.goToPatientData} />
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(DynamicTracker);
