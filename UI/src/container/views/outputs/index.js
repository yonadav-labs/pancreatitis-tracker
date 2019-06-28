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
			considerations: this.props.considerations || {},
			clinicalScores: this.props.clinicalScores || []
		};

		this.changeValue = this.changeValue.bind(this);
		this.showMounzer = this.showMounzer.bind(this);
	}

	changeValue(e) {
		let { clinicalScores } = this.state;
		if (e.target.checked) {
			clinicalScores[5].score = clinicalScores[5].score - 1;
		} else {
			clinicalScores[5].score = clinicalScores[5].score + 1;
		}

		this.setState({ clinicalScores: clinicalScores });
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ clinicalScores: nextProps.clinicalScores, considerations: nextProps.considerations });
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
		let valueOfSpeedMeter = negativeCount - positiveCount;
		let extraMeterText = '';
		if (negativeCount === 0 && positiveCount === 0) {
			valueOfSpeedMeter = 5;
			extraMeterText = 'Meter will function upon calculation of at least 1 Mounzer rule.';
		}
		const clinicalScores_ = Object.assign([], this.props.clinicalScores);

		const dateX = moment(this.props.patient.onset_date);
		const dateY = moment(this.props.patient.admission_date);

		const X = moment().diff(dateX, 'hours', true).toFixed(1);
		const Y = moment().diff(dateY, 'hours', true).toFixed(1);
		let calcAlgorithms = [];

		clinicalScores_.forEach((algo, idx) => {
			if (algo.is_capable) {
				calcAlgorithms.push(algo.algorithm);
			}
		});

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
							<div className="col-xs-12 col-md-6 recommendation">
								<div className="card-frame p-5">
									<div className="row mb-4">
										<div className="col-8 d-flex">
											<h2 className="section-title my-auto">Clinical Considerations</h2>
										</div>
										<div className="col-4">
											<img
												className="img-fluid"
												src="/assets/images/leaf.jpg"
												alt="speedmeter image"
											/>
										</div>
									</div>
									<div className="section-description grey-color-text">
										<strong>For the most informative set of results, please order a
										complete chemistry profile, complete blood count, and arterial
										blood gas. </strong>
										<span>It is also recommended to order a lipid panel, liver injury
										test, LDH, CRP, and albumin.</span><br /><br />
										<strong>Current severity score:</strong><br />
										{this.state.considerations &&
											<span className="mb-5">ADAPT has computed {calcAlgorithms.join(', ')}.{this.state.considerations.pop_percent}</span>
										}
										<strong>Anticipated needs:</strong><br />
										{this.state.considerations &&
											<span className="mb-5">
												{this.state.considerations.maintenance_fluid} In
												addition, patient may need fluid resuscitation for intravascular
												volume deficit. Re-evaluation of fluid status and organ function
												is recommended at 4-6 hrs. Also, it is recommended to repeat any
												abnormal labs at that time.
											</span>
										}
										<strong>Etiology workup:</strong><br />
										<span>Order a lipid panel, liver injury test, LDH, CRP, and albumin,
										to better understand the etiology of this AP episode. For idiopathic
										or recurrent AP, order ArielDx.</span>
									</div>
								</div>
							</div>
							<div className="col-xs-12 col-md-6 text-center">
								<div className="card-frame p-5">
									<div className="row mb-4">
										<div className="col-8 d-flex">
											<h2 className="section-title my-auto">Severity Meter</h2>
										</div>
										<div className="col-4">
											<img
												className="img-fluid"
												src="/assets/images/leaf.jpg"
												alt="speedmeter image"
											/>
										</div>
									</div>
									<div className="section-description grey-color-text text-left mb-5">
										The severity meter changes with respect to rules signifying “organ failure likely”
										and “organ failure not likely.” {extraMeterText}
									</div>
									<img
										className="speedmeter"
										src={`/assets/images/speedometer_${valueOfSpeedMeter}.png`}
										alt="speedmeter image"
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="page-section">
						<div className="row mb-5">
							<div className="col-xs-12 col-md-6 mb-4">
								<div className="card-frame p-5">
									<div className="row mb-4">
										<div className="col-8 d-flex">
											<h2 className="section-title my-auto">Clinical Scoring Systems</h2>
										</div>
										<div className="col-4">
											<img
												className="img-fluid"
												src="/assets/images/leaf.jpg"
												alt="speedmeter image"
											/>
										</div>
									</div>
									<div className="section-description grey-color-text d-none">
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
									<div className="form-check mt-5 ml-2">
										<label className="form-check-label section-description ml-2">
											<input type="checkbox"
												className="form-check-input mt-3"
												style={{ marginLeft: '-2rem' }}
												onChange={this.changeValue} />Fluid Responsive?
										</label>
									</div>
								</div>
							</div>
							<div className="col-xs-12 col-md-6">
								<div className="card-frame p-5">
									<div className="row mb-4">
										<div className="col-8 d-flex">
											<h2 className="section-title my-auto">Mounzer Rules</h2>
										</div>
										<div className="col-4">
											<img
												className="img-fluid"
												src="/assets/images/leaf.jpg"
												alt="speedmeter image"
											/>
										</div>
									</div>
									<div className="section-description grey-color-text">
										<p>Rules denote >95% probability of either developing organ failure (OF) or not
										developing OF. In some cases, the trajectory is less certain at early timepoints.</p>
										<p className="d-none">
											All rules default to a gray box. Upon entry of all of the necessary criteria,
											there are 2 possibilities. If there is sufficient information to compute the
											rule, and the conditions for the rule are met, the box becomes turquoise (e.g.
											if organ failure is likely or organ failure is not likely based on the
											conditions). If there is sufficient information to compute the rule, but
											the conditions for the rule are not met, the box remains grey but is outlined
											in blue. In this scenario, there is no definitive knowledge gained on organ
											failure likelihood for that rule set.<br />
										</p>
										<p>
											For more info, see <a href="https://www.ncbi.nlm.nih.gov/pubmed/22425589" target="_blank">PMID: 22425589</a>.
										</p>
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
						</div>
						<div className="pt-3 text-center">
							<div className="d-flex justify-content-between">
								<GreenButton text="Back" onClick={() => this.props.history.push('/patient')} />
								<GreenButton text="Next" onClick={() => this.props.history.push('/feedback')} />
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
		clinicalScores: state.clinicalScores.results,
		mounzerResults: state.clinicalScores.mounzer_results,
		considerations: state.clinicalScores.considerations,
		patient: state.patient
	};
};

export default withRouter(connect(mapStatetoProps)(Outputs));

