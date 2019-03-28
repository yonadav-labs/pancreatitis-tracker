import React from 'react';
import GreenButton from "../../components/GreenButton";

class Hematology extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hematology: {
				whiteBloodCellCount: this.props.data.whiteBloodCellCount || '',
				plateletCount: this.props.data.plateletCount || '',
				hematocrit: this.props.data.hematocrit || '',
				crp: this.props.data.crp || ''
			}
		};

		this.changeInfo = this.changeInfo.bind(this);
	}

	changeInfo(e) {
		let params = this.state.hematology;
		params[e.target.id] = e.target.value;

		this.setState({ hematology: params });
		this.props.updateInfo(params);
	}

	next = () => {
		alert('Success!');
	}

	back = () => {
		this.props.jumpToStep(this.props.step-1);
	}

	render() {
		const {hematology} = this.state;
		return (
			<div>
				<div className="row">
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">White Blood Cell Count</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="whiteBloodCellCount"
									className="round-input"
									value={hematology.whiteBloodCellCount}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Platelet Count</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="plateletCount"
									className="round-input"
									value={hematology.plateletCount}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Hematocrit</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="hematocrit"
									className="round-input"
									value={hematology.hematocrit}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">CRP</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="crp"
									className="round-input"
									value={hematology.crp}
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
									value={hematology.motorResponse}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="pt-3 text-center">
					<div className="d-flex justify-content-between">
						<GreenButton
							text="Back"
							className="mt-3"
							onClick={this.back}
						/>
						<GreenButton
							text="Submit"
							className="mt-3"
							onClick={this.next}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Hematology;