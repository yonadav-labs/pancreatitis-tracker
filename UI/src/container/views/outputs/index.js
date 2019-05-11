import React from "react";
import { withRouter } from "react-router";
import Title from '../../components/Title';
import CustomProgressBar from '../../components/CustomProgressBar';
import GreenButton from "../../components/GreenButton";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import moment from 'moment';

class Outputs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recommendations: this.props.maintenance_fluid || '',
			clinicalScores: this.props.clinicalScores || []
		};

		this.changeValue = this.changeValue.bind(this);
		this.showMounzer = this.showMounzer.bind(this);
	}

	changeValue(e) {
		let params = {};
		params[e.target.id] = e.target.value;

		this.setState(params);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ clinicalScores: nextProps.clinicalScores, recommendations: nextProps.maintenance_fluid });
	}

	getRuleId = (value) => {
		const replaceName = 'Rule';
		return parseInt(value.replace(replaceName, '').trim(), 10);
	}

	showMounzer = () => {
		const mounzerResults = Object.assign([], this.props.mounzerResults);
		let positiveMounzers = [];
		let negativeMounzers = [];
		let positiveCount = 0;
		let negativeCount = 0;

		mounzerResults.forEach((mounzer, idx) => {
			if (mounzer.rule) {
				if (this.getRuleId(mounzer.rule) % 2 === 1) {
					let mounzerClass = '';
					if (mounzer.is_capable) {
						mounzerClass = 'empty-mounzer';

						if (mounzer.score) {
							mounzerClass = 'has-mounzer';
							positiveCount += 1;
						}
					}

					positiveMounzers.push(
						<div key={`mounzer${idx}`} className={`rule-btn ${mounzerClass}`}>
							<span className="rule-text">{mounzer.rule}</span>
						</div>
					);
				}	else {
					let mounzerClass = '';
					if (mounzer.is_capable) {
						mounzerClass = 'empty-mounzer';

						if (mounzer.score) {
							mounzerClass = 'has-mounzer';
							negativeCount += 1;
						}
					}

					negativeMounzers.push(
						<div key={`mounzer${idx}`} className={`rule-btn ${mounzerClass}`}>
							<span className="rule-text">{mounzer.rule}</span>
						</div>
					);
				}
			}
		});

		return { positiveMounzers, negativeMounzers, positiveCount, negativeCount };
	}

	render () {
		const {clinicalScores} = this.state;
		const { positiveMounzers, negativeMounzers, positiveCount, negativeCount} = this.showMounzer();
		const valueOfSpeedMeter = negativeCount - positiveCount;

		const dateX = moment(this.props.patient.onset_date);
		const dateY = moment(this.props.patient.admission_date);

		const X = moment().diff(dateX, 'hours', true).toFixed(1);
		const Y = moment().diff(dateY, 'hours', true).toFixed(1);

		return (
			<div className="app-content">
				<Title title="Outputs" />
				<div className="container">
					<div className="page-section">
						<div className="row">
							<div className="col-md-12 mt-5">
								<div className="section-description grey-color-text">
									Scores and guidance based on measures recorded {X} hours from pain onset,
									and {Y} hours from admission.
								</div>
							</div>
							<div className="col-xs-12 col-md-7 recommendation">
								<h2 className="section-title p-x-15">Clinical Considerations</h2>
								<textarea
									value={this.state.recommendations}
									className="p-3"
									onChange={this.changeValue}
									id="recommendations"
								/>
							</div>
							<div className="col-xs-12 col-md-5 text-center">
								<h2 className="section-title p-x-15">Severity Meter</h2>
								<div className="section-description grey-color-text text-left">
									The severity meter changes with respect to rules signifying “organ failure likely”
									and “organ failure not likely.”
								</div>
								<img
									className="speedmeter"
									src={`/assets/images/speedometer_${valueOfSpeedMeter}.png`}
									alt="speedmeter image"
								/>
							</div>
						</div>
					</div>
					<div className="page-section">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6">
								<h2 className="section-title">Clinical Scoring Systems</h2>
								<div className="section-description grey-color-text">
									Status bars do not display scores if insufficient information is available
									to compute clinical metric. If score has sufficient information, it is written
									as a fraction of the maximum allowable score. Severity thresholds for each
									clinical score are denoted by the inverted triangle icons. If the score is
									below threshold, the status bar is shown in turquoise. If the score is above
									threshold, the status bar is shown in red.
								</div>
								<div>
									{
										clinicalScores
											? clinicalScores.map((item, idx) => {
												return (
													<CustomProgressBar
														key={`custom-progress$${idx}`}
														title={item.algorithm}
														value={item.score}
														scoreRange={item.score_range}
														item={item}
													/>
												);
											})
											: null
									}
								</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<h2 className="section-title">Mounzer Rules</h2>
								<div className="section-description grey-color-text">
									All rules default to a gray box. Upon entry of all of the necessary criteria,
									there are 2 possibilities. If there is sufficient information to compute the
									rule, and the conditions for the rule are met, the box becomes turquoise (e.g.
									if organ failure is likely or organ failure is not likely based on the
									conditions). If there is sufficient information to compute the rule, but
									the conditions for the rule are not met, the box remains grey but is outlined
									in blue. In this scenario, there is no definitive knowledge gained on organ
									failure likelihood for that rule set.
								</div>
								<div className="row">
									<div className="col-6">
										<div className="rule-btn primary-rule">
											<span className="rule-text">OF Unlikely</span>
										</div>
										{
											positiveMounzers.length === 0
												? (
													<div>
														<div className="rule-btn"><span className="rule-text">Rule 1</span></div>
														<div className="rule-btn"><span className="rule-text">Rule 3</span></div>
														<div className="rule-btn"><span className="rule-text">Rule 5</span></div>
														<div className="rule-btn"><span className="rule-text">Rule 7</span></div>
														<div className="rule-btn"><span className="rule-text">Rule 9</span></div>
														<div className="rule-btn"><span className="rule-text">Rule 11</span></div>
													</div>
												)
												: positiveMounzers
										}
									</div>
									<div className="col-6">
										<div className="rule-btn primary-rule"><span className="rule-text">OF Likely</span></div>
										{
											negativeMounzers.length === 0
												? (
													<div>
														<div className="rule-btn"><span className="rule-text">Rule 2</span></div>
														<div className="rule-btn"><span className="rule-text">Rule 4</span></div>
														<div className="rule-btn"><span className="rule-text">Rule 6</span></div>
														<div className="rule-btn"><span className="rule-text">Rule 8</span></div>
														<div className="rule-btn"><span className="rule-text">Rule 10</span></div>
														<div className="rule-btn"><span className="rule-text">Rule 12</span></div>
													</div>
												)
												: negativeMounzers
										}
									</div>
								</div>
								<div className="row">
									<div className="col-12 section-content">
										Note: Rules 7-12 are only activated after tracking patient for 48 hours.
									</div>
								</div>
							</div>
						</div>
						<div className="row space-between-section mb-5">
							<GreenButton text="Back" onClick={() => this.props.history.push('/patient')} />
							<GreenButton text="Next" onClick={() => this.props.history.push('/feedback')} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStatetoProps = state => {
	return {
		clinicalScores: state.clinicalScores.results,
		mounzerResults: state.clinicalScores.mounzer_results,
		maintenance_fluid: state.clinicalScores.maintenance_fluid,
		patient: state.patient
	};
};

export default withRouter(connect(mapStatetoProps)(Outputs));

