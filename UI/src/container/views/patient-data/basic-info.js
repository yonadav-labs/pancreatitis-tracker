import React from 'react';
import GreenButton from "../../components/GreenButton";

class BasicInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			basicInfo: {
				sex: this.props.data.sex || '',
				age: this.props.data.age || '',
				height: this.props.data.height || '',
				weight: this.props.data.weight || '',
				bmi: this.props.data.bmi || ''
			}
		};

		this.changeInfo = this.changeInfo.bind(this);
	}

	changeInfo(e) {
		let params = this.state.basicInfo;
		params[e.target.id] = e.target.value;

		this.setState({ basicInfo: params });
		this.props.updateInfo(params);
	}

	render() {
		const {basicInfo} = this.state;
		return (
			<div>
				<div className="row">
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Sex</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="sex"
									className="round-input"
									value={basicInfo.sex}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Age</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="age"
									className="round-input"
									value={basicInfo.age}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Height</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="height"
									className="round-input"
									value={basicInfo.height}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Weight</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="weight"
									className="round-input"
									value={basicInfo.weight}
									onChange={this.changeInfo}
								/>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6">
						<div className="row mb-5">
							<div className="col-xs-12 col-sm-6">
								<div className="round-btn grey-label">Stat1</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<input
									type="text"
									id="stat1"
									className="round-input"
									value={basicInfo.bmi}
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

export default BasicInfo;