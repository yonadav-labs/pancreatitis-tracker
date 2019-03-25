import React from 'react';
import GreenButton from "../../components/GreenButton";

class VitalSigns extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			vitalSigns: {
				temperature: this.props.data.temperature || '',
				systolicBp: this.props.data.systolicBp || '',
				DiastolicBp: this.props.data.DiastolicBp || '',
				Map: this.props.data.Map || '',
				heartRate: this.props.data.heartRate || '',
				RespiratoryRate: this.props.data.RespiratoryRate || ''
			}
		};

		this.changeInfo = this.changeInfo.bind(this);
	}

	changeInfo(e) {
		let params = this.state.vitalSigns;
		params[e.target.id] = e.target.value;

		this.setState({ vitalSigns: params });
		this.props.updateInfo(params);
	}

	render() {
		const {vitalSigns} = this.state;
		return (
			<div>
				<div className="row">
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Temperature</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="temperature"
									className="round-input"
									value={vitalSigns.temperature}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Systolic BP</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="systolicBp"
									className="round-input"
									value={vitalSigns.systolicBp}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Diastolic BP</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="DiastolicBp"
									className="round-input"
									value={vitalSigns.DiastolicBp}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">MAP</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="Map"
									className="round-input"
									value={vitalSigns.Map}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Heart Rate</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="heartRate"
									className="round-input"
									value={vitalSigns.heartRate}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Respiratory Rate</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="respiratoryRate"
									className="round-input"
									value={vitalSigns.RespiratoryRate}
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

export default VitalSigns;