import React from "react";
import { withRouter } from "react-router";
import Title from '../../components/Title';
import CustomProgressBar from '../../components/CustomProgressBar';
import GreenButton from "../../components/GreenButton";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { loadClinicalScores } from '../../actions';

class Outputs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recommendations: 'Based on the patient\'s body composition, average daily fluid needs are maintenance fluid_ mL/day.',
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
		this.setState({ clinicalScores: nextProps.clinicalScores });
	}

	goToPatientPage = () => {
		this.props.history.push('/patient');
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

		return (
			<div className="app-content">
				<Title title="Outputs" />
				<div className="container">
					<div className="page-section">
						<div className="row">
							<div className="col-md-12 mt-5">
								<div className="section-description grey-color-text">
									Scores and guidance based on measures recorded 3 hours from pain onset, and 2 hours from admission.
								</div>
							</div>
							<h2 className="section-title p-x-15">Recommendations</h2>
							<div className="col-xs-12 col-sm-12 col-md-9 recommendation">
								<textarea
									value={this.state.recommendations}
									className="p-3"
									onChange={this.changeValue}
									id="recommendations"
								/>
							</div>
							<div className="col-xs-12 col-sm-12 col-md-3 d-flex">
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
									All scores default to gray. Upon entry of all of the necessary criteria,
									test name will be highlighted green and the score associated with that
									test will be displayed below.
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
									All scores default to gray. Upon entry of all of the necessary criteria,
									the rules that indicate that organ failure is likely will highlight in red
									and those that indicate that organ failure is not likely will highlight in green.
									Borderline patients will have each rule highlighted in yellow as they have
									satisfied the clinical scoring requirements for a particular pair of rules,
									 but do not fall within the likely OF rule or likely not OF rule associated with
									those tests. Likelihood of organ failure is evaluated on a 95% CI.
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
							<GreenButton text="Back" onClick={this.goToPatientPage} />
							<GreenButton text="Save as PDF" />
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
		mounzerResults: state.clinicalScores.mounzer_results
	};
};

const mapDispatchToProps = dispatch => {
	return Object.assign(
		{ dispatch },
		bindActionCreators({
			loadClinicalScores
		}, dispatch)
	);
};
	
export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Outputs));

