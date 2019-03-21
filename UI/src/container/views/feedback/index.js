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
		console.log('sd= ', e.target.value);
		this.setState({ feedback: e.target.value });
	}

	render () {
		return (
			<div className="app-content">
				<Title title="Feedback" />
				<div className="container">
					<div className="page-subtitle">
						QuickTutor® invented its unique connection and messaging system to provide all users with security and choice. On QuickTutor®, a Learner has to send a connection request to a Tutor, and then that Tutor has to accept the connection request in order for the users to message each other and set-up tutoring sessions.
					</div>
					<div>
						<textarea
							type="textarea"
							className="feedback-input"
							value={this.state.feedback}
							onChange={this.changeValue}
						/>
					</div>
					<div className="d-flex justify-content-center">
						<GreenButton text="Send Feedback" />
					</div>
				</div>
			</div>
		);
	}
}

export default Feedback;

