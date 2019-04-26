import React from "react";
import Title from '../../components/Title';
import GreenButton from "../../components/GreenButton";

class Feedback extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			feedback: ''
		};
	}

	changeValue = (e) => {
		this.setState({ feedback: e.target.value });
	}

	render () {
		return (
			<div className="app-content">
				<Title title="Feedback" />
				<div className="container">
					<div className="page-subtitle text-center">
						The beauty of the ADAPT tool lies in its ability to be dynamically updated and improved
						over the time. Please provide any comments and suggestions for improvements below.
					</div>
					<div className="page-section">
						<textarea
							type="textarea"
							className="feedback-input"
							value={this.state.feedback}
							onChange={this.changeValue}
						/>
						<div className="d-flex justify-content-center">
							<GreenButton text="Send Feedback" />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Feedback;

