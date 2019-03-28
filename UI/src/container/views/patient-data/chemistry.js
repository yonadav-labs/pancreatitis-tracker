import React from 'react';
import GreenButton from "../../components/GreenButton";

class Chemistry extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			chemistry: {
				sodium: this.props.data.sodium || '',
				potassium: this.props.data.potassium || '',
				chloride: this.props.data.chloride || '',
				bicarbonate: this.props.data.bicarbonate || '',
				bun: this.props.data.bun || '',
				creatinine: this.props.data.creatinine || '',
				glucose: this.props.data.glucose || '',
				calcium: this.props.data.calcium || '',
				albumin: this.props.data.albumin || '',
				ast: this.props.data.ast || '',
				ldh: this.props.data.ldh || ''
			}
		};

		this.changeInfo = this.changeInfo.bind(this);
	}

	changeInfo(e) {
		let params = this.state.chemistry;
		params[e.target.id] = e.target.value;

		this.setState({ chemistry: params });
		this.props.updateInfo(params);
	}

	next = () => {
		this.props.jumpToStep(this.props.step+1);
	}

	back = () => {
		this.props.jumpToStep(this.props.step-1);
	}

	render() {
		const {chemistry} = this.state;
		return (
			<div>
				<h2 className="section-title">Chem 7 Fishbone</h2>
				<div className="row">
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Sodium</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="sodium"
									className="round-input"
									value={chemistry.sodium}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Potassium</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="potassium"
									className="round-input"
									value={chemistry.potassium}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Chloride</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="chloride"
									className="round-input"
									value={chemistry.chloride}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Bicarbonate</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="bicarbonate"
									className="round-input"
									value={chemistry.bicarbonate}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">BUN</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="bun"
									className="round-input"
									value={chemistry.bun}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Creatinine</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="creatinine"
									className="round-input"
									value={chemistry.creatinine}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Glucose</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="glucose"
									className="round-input"
									value={chemistry.glucose}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
				</div>
				<h2 className="section-title">Liver Function Fishbone</h2>
				<div className="row">
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Calcium</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="calcium"
									className="round-input"
									value={chemistry.calcium}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Albumin</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="albumin"
									className="round-input"
									value={chemistry.albumin}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">AST</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="ast"
									className="round-input"
									value={chemistry.ast}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">LDH</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="ldh"
									className="round-input"
									value={chemistry.ldh}
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

export default Chemistry;