import React from 'react';
import GreenButton from "../../components/GreenButton";

class PhysicalExam extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			physicalExam: {
				peritonitis: this.props.data.peritonitis || '',
				score: this.props.data.score || '',
				eyeResponse: this.props.data.eyeResponse || '',
				verbalResponse: this.props.data.verbalResponse || '',
				motorResponse: this.props.data.motorResponse || ''
			}
		};

		this.changeInfo = this.changeInfo.bind(this);
	}

	changeInfo(e) {
		let params = this.state.physicalExam;
		params[e.target.id] = e.target.value;

		this.setState({ physicalExam: params });
		this.props.updateInfo(params);
	}

	render() {
		const {physicalExam} = this.state;
		return (
			<div>
				<div className="row">
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Peritonitis</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="peritonitis"
									className="round-input"
									value={physicalExam.peritonitis}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Score</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="score"
									className="round-input"
									value={physicalExam.score}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Eye Response</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="eyeResponse"
									className="round-input"
									value={physicalExam.eyeResponse}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Verbal Response</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="verbalResponse"
									className="round-input"
									value={physicalExam.verbalResponse}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Motor Response</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="motorResponse"
									className="round-input"
									value={physicalExam.motorResponse}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="pt-3 text-center">
					<div>
						<GreenButton text="Load Data" className="mt-3" />
					</div>
				</div>
			</div>
		);
	}
}

export default PhysicalExam;