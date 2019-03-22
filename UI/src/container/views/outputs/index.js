import React from "react";
import Title from '../../components/Title';
import CustomProgressBar from '../../components/CustomProgressBar';
import GreenButton from "../../components/GreenButton";

class Outputs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recommendations: ''
		};

		this.changeValue = this.changeValue.bind(this);
	}

	changeValue(e) {
		let params = {};
		params[e.target.id] = e.target.value;

		this.setState(params);
	}

	render () {
		return (
			<div className="app-content">
				<Title title="Outputs" />
				<div className="container">
					<div className="page-section">
						<div className="row">
							<h2 className="section-title p-x-15">Recommendations</h2>
							<div className="col-xs-12 col-sm-12 col-md-9 recommendation">
								<textarea
									value={this.state.recommendations}
									onChange={this.changeValue}
									id="recommendations"
								/>
							</div>
							<div className="col-xs-12 col-sm-12 col-md-3 d-flex">
								<img className="speedmeter" src="/assets/images/speedometer_0.png" alt="speedmeter image" />
							</div>
						</div>
					</div>
					<div className="page-section">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<h2 className="section-title">Clinical Scoring Systems</h2>
								<div className="section-description grey-color-text">
									All scores default to gray. Upon entry of all of the necessary criteria,
									test name will be highlighted green and the score associated with that
									test will be displayed below.
								</div>
								<div>
									<CustomProgressBar title="SRS" value="80" text="4 out of 5" />
									<CustomProgressBar title="HAPS" value="60" text="3 out of 5" />
									<CustomProgressBar title="PANC3" value="60" text="3 out of 5" />
									<CustomProgressBar title="POP" value="40" text="2 out of 5" />
									<CustomProgressBar title="RANSON" value="60" text="3 out of 5" />
									<CustomProgressBar title="GLASGOW" value="60" text="3 out of 5" />
									<CustomProgressBar title="APACHE II" value="60" text="3 out of 5" />
									<CustomProgressBar title="JSS" value="60" text="3 out of 5" />
									<CustomProgressBar title="MARSHALL" value="60" text="3 out of 5" />
									<CustomProgressBar title="POP Mort. %" value="60" text="60%" />
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<h2 className="section-title">Mounzer Rules</h2>
								<div className="section-description grey-color-text">
									All scores default to gray. Upon entry of all of the necessary criteria,
									the rules that indicate that organ failure is likely will highligh in red
									and those that indicate that organ failure is not likely will highlight in green.
									Borderline patients will have each rule hightlighted in yellow as they have
									satisfied then clinical scoring requirements for a particular pair of rules,
									 but do not fall within the likely OF rule or likely not OF rule associated with
									those tests. Likelihood of organ failure is evaluated on a 95% CI.
								</div>
								<div className="row">
									<div className="col-6">
										<div className="rule-btn primary-rule"><span className="rule-text">OF Unlikely</span></div>
										<div className="rule-btn"><span className="rule-text">Rule 1</span></div>
										<div className="rule-btn"><span className="rule-text">Rule 3</span></div>
										<div className="rule-btn"><span className="rule-text">Rule 5</span></div>
										<div className="rule-btn"><span className="rule-text">Rule 6</span></div>
										<div className="rule-btn"><span className="rule-text">Rule 7</span></div>
										<div className="rule-btn"><span className="rule-text">Rule 11</span></div>
									</div>
									<div className="col-6">
										<div className="rule-btn primary-rule"><span className="rule-text">OF Likely</span></div>
										<div className="rule-btn"><span className="rule-text">Rule 2</span></div>
										<div className="rule-btn"><span className="rule-text">Rule 4</span></div>
										<div className="rule-btn"><span className="rule-text">Rule 6</span></div>
										<div className="rule-btn"><span className="rule-text">Rule 8</span></div>
										<div className="rule-btn"><span className="rule-text">Rule 10</span></div>
										<div className="rule-btn"><span className="rule-text">Rule 12</span></div>
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
							<GreenButton text="Fax" />
							<GreenButton text="Save as PDF" />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Outputs;

