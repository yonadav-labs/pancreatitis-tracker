import React from 'react';
import GreenButton from "../../components/GreenButton";

class XRayOther extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			xRayOther: {
				pleuralEffusion: this.props.data.pleuralEffusion || '',
				oliguria: this.props.data.oliguria || '',
				respiratoryFailure: this.props.data.respiratoryFailure || '',
				chronicHealthPoints: this.props.data.chronicHealthPoints || '',
				fluidReponsivity: this.props.data.fluidReponsivity || ''
			}
		};

		this.changeInfo = this.changeInfo.bind(this);
	}

	next = () => {
		this.props.jumpToStep(this.props.step+1);
	}

	back = () => {
		this.props.jumpToStep(this.props.step-1);
	}

	changeInfo(e) {
		let params = this.state.xRayOther;
		params[e.target.id] = e.target.value;

		this.setState({ xRayOther: params });
		this.props.updateInfo(params);
	}

	render() {
		const {xRayOther} = this.state;
		return (
			<div>
				<div className="row">
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Pleural Effusion</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="pleuralEffusion"
									className="round-input"
									value={xRayOther.pleuralEffusion}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Oliguria</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="oliguria"
									className="round-input"
									value={xRayOther.oliguria}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Respiratory Failure</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="respiratoryFailure"
									className="round-input"
									value={xRayOther.respiratoryFailure}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Chronic Health Problems</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="chronicHealthPoints"
									className="round-input"
									value={xRayOther.chronicHealthPoints}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Fluid Responsivity</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="fluidReponsivity"
									className="round-input"
									value={xRayOther.fluidReponsivity}
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
							text="Next"
							className="mt-3"
							onClick={this.next}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default XRayOther;