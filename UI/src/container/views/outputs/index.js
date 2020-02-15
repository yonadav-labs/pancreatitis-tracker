import React from "react";
import ReactTooltip from 'react-tooltip';
import { withRouter } from "react-router";
import Title from '../../components/Title';
import CustomProgressBar from '../../components/CustomProgressBar';
import GreenButton from "../../components/GreenButton";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import moment from 'moment';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Outputs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			considerations: this.props.considerations || {},
			clinicalScores: this.props.clinicalScores || [],
			flip_score_system: true,
			flip_consideration: true,
			flip_mounzer_rules: true,
			flip_severity_meter: true
		};

		this.isMobile = window.innerWidth <= 760;
		this.changeValue = this.changeValue.bind(this);
		this.showMounzer = this.showMounzer.bind(this);
	}

	flip = (flip) => {
		let newFlip = {};
		newFlip[flip] = !this.state[flip];
		this.setState(newFlip);
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
			let mounzerClass = '';
			if (mounzer.is_capable) {
				mounzerClass = 'empty-mounzer';

				if (mounzer.score) {
					mounzerClass = 'has-mounzer';
					if (this.getRuleId(mounzer.rule) % 2 === 1) {
						positiveCount += 1;
					} else {
						negativeCount += 1;
					}
				}
			}

			let ruleDiv =
				<div key={`mounzer${idx}`} className={`rule-btn ${mounzerClass}`} data-tip={mounzer.params.required_fields_verbose} data-multiline="true" data-event="click">
					<span className="rule-text">
						{mounzer.rule}
						<img src="/assets/images/info-b.png" className="ml-3" style={{ height: '16px', marginBottom: '4px' }} />
					</span>
				</div>;

			if (this.getRuleId(mounzer.rule) % 2 === 1) {
				positiveMounzers.push(ruleDiv);
			} else {
				negativeMounzers.push(ruleDiv);
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
			valueOfSpeedMeter = 'NA';
			extraMeterText = 'Severity meter displays predictions upon calculation of at least 1 Mounzer rule.';
		}
		const clinicalScores_ = Object.assign([], this.props.clinicalScores);

		const dateX = moment(this.props.patient.onset_date);
		const dateY = moment(this.props.patient.admission_date);
		const dateEntry = moment(this.props.patient.time_stamp);

		const X = dateEntry.diff(dateX, 'hours', true);
		const Y = dateEntry.diff(dateY, 'hours', true);

		let header = '';
		if (X > 0 && Y > 0) {
			header = <div className="section-description grey-color-text">
				Scores and guidance based on measures recorded {X.toFixed(0)} hours from pain onset, and {Y.toFixed(0)} hours from admission.
			</div>;
		} else if (X < 0 && Y < 0) {
			header = <div className="section-description grey-color-text">
				Scores and guidance based on measures recorded {Math.abs(X).toFixed(0)} hours prior to pain onset, and {Math.abs(Y).toFixed(0)} hours prior to admission.
			</div>;
		} else if (X > 0 && Y < 0) {
			header = <div className="section-description grey-color-text">
				Scores and guidance based on measures recorded {X.toFixed(0)} hours from pain onset, and {Math.abs(Y).toFixed(0)} hours prior to admission.
			</div>;
		} else if (X < 0 && Y > 0) {
			header = <div className="section-description grey-color-text">
				Scores and guidance based on measures recorded {Math.abs(X).toFixed(0)} hours prior to pain onset, and {Y.toFixed(0)} hours from admission.
			</div>;
		}

		let calcAlgorithms = [];

		let settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			adaptiveHeight: true
		};

		clinicalScores_.forEach((algo, idx) => {
			if (algo.is_capable) {
				calcAlgorithms.push(algo.algorithm);
			}
		});

		let contents = [
			<div key="1" className="col-12 col-md-6 mb-4 mb-md-5 recommendation">
				<div className={"card-frame p-3 p-xl-5 " + (this.state.flip_consideration ? "front" : "back")}>
					<div className="row mb-4 pointer" onClick={() => this.flip('flip_consideration')}>
						<div className="col-7">
							<h2 className="section-title long my-auto mr-auto">Clinical Considerations</h2>
						</div>
						<div className="col-5 d-flex align-items-center justify-content-end">
							<img src={this.state.flip_consideration ? '/assets/images/info-navy.png' : '/assets/images/back-teal.png'} className="mr-4 flip-icon"/>
							<img
								style={{ width: '70px' }}
								className="img-fluid"
								src={this.state.flip_consideration ? "/assets/images/clipboard_ariel_navy.png" : "/assets/images/clipboard_ariel_teal.png"}
							/>
						</div>
					</div>
					<div className="section-description grey-color-text">
						{this.state.considerations && this.state.flip_consideration &&
							<div>
								<strong>Current severity score:</strong><br />
								<span className="mb-5">ADAPT has computed {calcAlgorithms.join(', ')}.{this.state.considerations.pop_percent}</span>
							</div>
						}
						{ this.state.considerations && this.state.flip_consideration &&
							<div>
								<div className="font-weight-bold mt-3">Anticipated needs:</div>
								<p className="mb-2">
									{this.state.considerations.maintenance_fluid} In addition, patient may need
									fluid resuscitation for intravascular volume deficit. Re-evaluation of fluid
									status and organ function is recommended at 4-6 hrs. Also, it is recommended
									to repeat any abnormal labs at that time.
								</p>
								<div className="font-weight-bold mt-3">Etiology workup:</div>
								<p>Order a lipid panel, liver injury test, LDH, CRP, and albumin, to better understand
								the etiology of this AP episode. For idiopathic or recurrent AP, order <a href="https://portal.arielmedicine.com/register" target="_blank">ArielDx</a>.</p>
							</div>
						}
						{
							!this.state.flip_consideration &&
							<div>
								<strong>For the most informative set of results, please order a
								complete chemistry profile, complete blood count, and arterial
								blood gas. </strong>
								<p>It is also recommended to order a lipid panel, liver injury
								test, LDH, CRP, and albumin.</p>
								<p>These considerations are based on peer-reviewed guidelines for acute pancreatitis management.<br /><a href="https://www.ncbi.nlm.nih.gov/pubmed/29409760" target="_blank">[1]</a> <a href="https://www.ncbi.nlm.nih.gov/pubmed/24054878" target="_blank">[2]</a> <a href="https://www.ncbi.nlm.nih.gov/pubmed/23896955" target="_blank">[3]</a>
								</p>
							</div>
						}
					</div>
				</div>
			</div>,
			<div key="2" className="col-12 col-md-6 mb-4 mb-md-5 text-center">
				<div className={"card-frame p-3 p-xl-5 " + (this.state.flip_severity_meter ? "front" : "back")}>
					<div className="row mb-4 pointer" onClick={() => this.flip('flip_severity_meter')}>
						<div className="col-7">
							<h2 className="section-title my-auto mr-auto">Severity Meter</h2>
						</div>
						<div className="col-5 d-flex align-items-center justify-content-end">
							<img src={this.state.flip_severity_meter ? '/assets/images/info-navy.png' : '/assets/images/back-teal.png'} className="mr-4 flip-icon"/>
							<img
								className="img-fluid"
								style={{ width: '80px' }}
								src={this.state.flip_severity_meter ? "/assets/images/stethoscope_arielnavy.png" : "/assets/images/stethoscope_arielteal.png"}
							/>
						</div>
					</div>
					{
						this.state.flip_severity_meter &&
						<div>
							<img
								className="speedmeter my-5"
								src={`/assets/images/speedometer_${valueOfSpeedMeter}.png`}
								alt="speedmeter image"
							/>
							<div className="section-description grey-color-text text-center mt-5">
								Mounzer Rules calculated: {isNaN(valueOfSpeedMeter) ? 0 : Math.abs(valueOfSpeedMeter)}
							</div>
						</div>
					}
					{
						!this.state.flip_severity_meter &&
						<div className="section-description grey-color-text text-left mb-5">
							The severity meter provides a high-level summary of predicted patient outcome
							based on rules combining clinical scoring systems validated using admission and
							48hr data in training (n = 256) and validation (n = 397) AP patient cohorts (see&nbsp;
							<a href="https://www.ncbi.nlm.nih.gov/pubmed/22425589" target="_blank">Mounzer Rules</a> panel below).
							The meter shifts towards predicted severe outcome
							(denoted in red) with each rule that predicts likely organ failure. The meter
							shifts towards predicted positive outcome (denoted in green) with each rule that
							predicts unlikely progression to organ failure. {extraMeterText}
						</div>
					}
				</div>
			</div>,
			<div key="3" className="col-12 col-md-6 mb-4 mb-md-5">
				<div className={"card-frame p-3 p-xl-5 " + (this.state.flip_score_system ? "front" : "back")}>
					<div className="row mb-4 pointer" onClick={() => this.flip('flip_score_system')}>
						<div className="col-7">
							<h2 className="section-title my-auto mr-auto">Clinical Scoring Systems</h2>
						</div>
						<div className="col-5 d-flex align-items-center justify-content-end">
							<img src={this.state.flip_score_system ? '/assets/images/info-navy.png' : '/assets/images/back-teal.png'} className="mr-4 flip-icon"/>
							<img
								className="img-fluid"
								style={{ width: '85px' }}
								src={this.state.flip_score_system ? "/assets/images/medical_staff.png" : "/assets/images/medical_staff_blue.png"}
							/>
						</div>
					</div>
					{
						clinicalScores && !this.state.flip_score_system &&
						<div className="section-description grey-color-text">
							<p>For each clinical metric, a status bar displays the patient’s score, denoted as
							[score]/[maximum potential score]. An inverted triangle marker on each status bar
							denotes a severity threshold, where a score meeting or exceeding that threshold is
							considered “severe.” If the clinical metric is below threshold, the status bar is
							displayed in turquoise. If the clinical metric is at or above threshold (i.e. meeting
							severity criteria), the status bar is displayed in red.</p>
							<p>If insufficient information is available to compute the clinical metric, the status
							bar remains grey and does not display the patient’s score to the right of the status
							bar. The user can click on the clinical metric in question to learn about its required
							data fields.</p>
							<p>References and peer-reviewed validation of each clinical scoring systems (
								&nbsp;<a href="https://www.ncbi.nlm.nih.gov/pubmed/3928249" target="_blank">APACHE II</a>,
								&nbsp;<a href="https://www.ncbi.nlm.nih.gov/pubmed/18519429" target="_blank">BISAP</a>,
								&nbsp;<a href="https://www.ncbi.nlm.nih.gov/pubmed/6510766" target="_blank">Glasgow-Imrie</a>,
								&nbsp;<a href="https://www.ncbi.nlm.nih.gov/pubmed/19245846" target="_blank">HAPS</a>,
								&nbsp;<a href="https://www.ncbi.nlm.nih.gov/pubmed/20012329" target="_blank">JSS</a>,
								&nbsp;<a href="https://www.ncbi.nlm.nih.gov/pubmed/23100216" target="_blank">Marshall</a>,
								&nbsp;<a href="https://www.ncbi.nlm.nih.gov/pubmed/17881932" target="_blank">Panc 3</a>,
								&nbsp;<a href="https://www.ncbi.nlm.nih.gov/pubmed/17522578" target="_blank">POP</a>,
								&nbsp;<a href="https://www.ncbi.nlm.nih.gov/pubmed/26537149" target="_blank">Ranson</a>,
								&nbsp;<a href="https://www.ncbi.nlm.nih.gov/pubmed/29447109" target="_blank">SIRS</a> )
							can be found via Google Scholar and PubMed. </p>
						</div>
					}
					<div>
						{
							clinicalScores && this.state.flip_score_system
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
						{
							clinicalScores && this.state.flip_score_system &&
							<div className="form-check mt-5 ml-2">
								<label className="form-check-label section-description ml-2">
									<input type="checkbox"
										className="form-check-input mt-3"
										style={{ marginLeft: '-2rem' }}
										onChange={this.changeValue} />Fluid Responsive?
								</label>
							</div>
						}
					</div>
				</div>
			</div>,
			<div key="4" className="col-12 col-md-6 mb-4 mb-md-5">
				<div className={"card-frame p-3 p-xl-5 " + (this.state.flip_mounzer_rules ? "front" : "back")}>
					<div className="row mb-4 pointer" onClick={() => this.flip('flip_mounzer_rules')}>
						<div className="col-7">
							<h2 className="section-title my-auto mr-auto">Mounzer Rules</h2>
						</div>
						<div className="col-5 d-flex align-items-center justify-content-end">
							<img src={this.state.flip_mounzer_rules ? '/assets/images/info-navy.png' : '/assets/images/back-teal.png'} className="mr-4 flip-icon" />
							<img
								className="img-fluid"
								style={{ width: '85px' }}
								src={this.state.flip_mounzer_rules ? "/assets/images/scales_navy.png" : "/assets/images/scales_blue.png"}
							/>
						</div>
					</div>
					{
						clinicalScores && !this.state.flip_mounzer_rules &&
						<div className="section-description grey-color-text">
							<p>The Mounzer rules were developed to predict patient outcome based on combinations
							of clinical scoring systems and were validated admission and 48hr data in a training
							(n = 256) and validation (n = 397) AP patient cohort.</p>
							<p>Rules 1-6 are based upon admission data, and rules 7-12 are based on 48hr data.
							Upon entry of all the necessary criteria for a given rule, the rule box will undergo
							one of two changes from its default grey fill and border:</p>
							<p>If there is sufficient information to compute the rule and the conditions for the
							rule are met, the box becomes turquoise (e.g. if organ failure is likely or organ
							failure is not likely based on the conditions). </p>
							<p>If there is sufficient information to compute the rule, but the conditions for the
							rule are not met, the box remains grey but is outlined in blue. In this scenario, there
							is no definitive knowledge gained on organ failure likelihood for that rule set.</p>
							<p>For more info, see <a href="https://www.ncbi.nlm.nih.gov/pubmed/22425589" target="_blank">PMID: 22425589</a>.</p>
						</div>
					}
					{
						this.state.flip_mounzer_rules &&
						<div>
							<div className="section-description grey-color-text">
								<p>Rules denote >95% probability of either developing organ failure (OF) or not
								developing OF. In some cases, the trajectory is less certain at early timepoints.</p>
							</div>
							<div className="row">
								<div className="col-6 pr-2 pr-xl-3">
									<div className="rule-btn primary-rule">
										<span className="rule-text">OF Unlikely</span>
									</div>
									{
										positiveMounzers
									}
								</div>
								<div className="col-6 pl-2 pl-xl-3">
									<div className="rule-btn primary-rule"><span className="rule-text">OF Likely</span></div>
									{
										negativeMounzers
									}
								</div>
							</div>
							<div className="row">
								<div className="col-12 section-content">
									Note: Rules 7-12 are only activated after tracking patient for 48 hours.
								</div>
							</div>
						</div>
					}
				</div>
			</div>
		];

		return (
			<div className="app-content">
				<Title title="Outputs" />
				<div className="container">
					<div className="page-section">
						<div className="row">
							<div className={"col-md-12 mt-5 "+(this.isMobile ? "my-5" : "")}>
								{ header }
							</div>
							{
								this.isMobile ?
									<Slider {...settings}>
										{ contents }
									</Slider>
									: contents
							}
						</div>
						<div className="pt-3 text-center">
							<div className="d-flex justify-content-between triple-wrapper">
								<GreenButton text="Back" onClick={() => this.props.history.push('/patient')} />
								<GreenButton text="View Graph" onClick={() => this.props.history.push('/dynamic-tracker')} />
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
