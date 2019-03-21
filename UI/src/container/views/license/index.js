import React from "react";
import Title from '../../components/Title';
import GreenButton from "../../components/GreenButton";

class License extends React.Component {
	render () {
		return (
			<div className="app-content">
				<Title title="License" />
				<div className="container">
					<div className="page-description">
						QuickTutor® invented its unique connection and messaging system to provide all users with security and choice. On QuickTutor®, a Learner has to send a connection request to a Tutor, and then that Tutor has to accept the connection request in order for the users to message each other and set-up tutoring sessions. This is so Tutors have the choice of who they would like to work with, and session information can be shared privately, if desired. The QuickTutor® messaging system allows you to communicate and set-up tutoring sessions, without having to give away any personal or private information like your phone number or email. Keeping your conversations in the messaging system is a safer way to protect yourself.
					</div>
					<div className="d-flex justify-content-between">
						<GreenButton text="Go Back" />
						<GreenButton text="Email PDF" />
					</div>
				</div>
			</div>
		);
	}
}

export default License;

