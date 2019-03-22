import React from "react";
import Title from '../../components/Title';
import GreenButton from "../../components/GreenButton";
// import { Link } from "react-router-dom";

class PatientData extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			basicInfo: {
				sex: '',
				age: '',
				height: '',
				weight: '',
				stat1: '',
				stat2: '',
				stat3: '',
				stat4: ''
			}
		};

		this.changeInfo = this.changeInfo.bind(this);
	}

	changeInfo(e) {
		let params = this.state.basicInfo;
		params[e.target.id] = e.target.value;

		this.setState({ basicInfo: params });
	}

	render () {
		const {basicInfo} = this.state;
		return (
			<div className="app-content">
				<Title title="Account Info" />
				<div className="container">
					<div className="page-subtitle text-center dark-grey-color">
						Please enter as much patient information as possible and
						currently available to ensure the most accurate characterization
					</div>
					<div className="page-section no-margin">
						<div className="mb-5">
							<div className="category-tab">
								<span className="category-item active">Basic Info</span>
								<span className="diagonal"></span>
								<span className="category-item">Phys.Exam</span>
								<span className="diagonal"></span>
								<span className="category-item">Vitals</span>
								<span className="diagonal"></span>
								<span className="category-item">X-Ray/Other</span>
								<span className="diagonal"></span>
								<span className="category-item">Arterial Gases</span>
								<span className="diagonal"></span>
								<span className="category-item">Lab Chemistries</span>
								<span className="diagonal"></span>
								<span className="category-item">Hematology</span>
							</div>
						</div>
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
										<div className="round-btn grey-label">weight</div>
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
											value={basicInfo.stat1}
											onChange={this.changeInfo}
										/>
									</div>
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<div className="row mb-5">
									<div className="col-xs-12 col-sm-6">
										<div className="round-btn grey-label">Stat2</div>
									</div>
									<div className="col-xs-12 col-sm-6">
										<input
											type="text"
											id="stat2"
											className="round-input"
											value={basicInfo.stat2}
											onChange={this.changeInfo}
										/>
									</div>
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<div className="row mb-5">
									<div className="col-xs-12 col-sm-6">
										<div className="round-btn grey-label">Stat3</div>
									</div>
									<div className="col-xs-12 col-sm-6">
										<input
											type="text"
											id="stat3"
											className="round-input"
											value={basicInfo.stat3}
											onChange={this.changeInfo}
										/>
									</div>
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<div className="row mb-5">
									<div className="col-xs-12 col-sm-6">
										<div className="round-btn grey-label">Stat4</div>
									</div>
									<div className="col-xs-12 col-sm-6">
										<input
											type="text"
											id="stat4"
											className="round-input"
											value={basicInfo.stat4}
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
				</div>
			</div>
		);
	}
}

export default PatientData;

