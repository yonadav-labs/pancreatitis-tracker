import React from 'react';
import GreenButton from "../../components/GreenButton";

class ArterialGases extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			vitalSigns: {
				ph: this.props.data.ph || '',
				pao2: this.props.data.pao2 || '',
				paco2: this.props.data.paco2 || '',
				hco3: this.props.data.hco3 || '',
				spo2: this.props.data.spo2 || '',
				fio2: this.props.data.fio2 || '',
				baseExcess: this.props.data.baseExcess || ''
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
								<div className="round-btn grey-label">pH</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="ph"
									className="round-input"
									value={vitalSigns.ph}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">paO2</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="pao2"
									className="round-input"
									value={vitalSigns.pao2}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">paCO2</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="paco2"
									className="round-input"
									value={vitalSigns.paco2}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">HCO3 a.k.a. Bicarbonate</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="hco3"
									className="round-input"
									value={vitalSigns.hco3}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">spO2</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="spo2"
									className="round-input"
									value={vitalSigns.spo2}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">fiO2</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="fio2"
									className="round-input"
									value={vitalSigns.fio2}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Base Excess</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="baseExcess"
									className="round-input"
									value={vitalSigns.baseExcess}
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

export default ArterialGases;