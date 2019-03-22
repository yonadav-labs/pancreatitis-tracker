import React from "react";
import Title from '../../components/Title';
import GreenButton from "../../components/GreenButton";

class ContactUs extends React.Component {
	constructor(props) {
		super(props);
	}

	goToOrder = () => {
		this.props.history.push('/order');
	}

	render () {
		return (
			<div className="app-content">
				<Title title="Contact Us" />
				<div className="container">
					<div className="page-description">
						QuickTutor® invented its unique connection and messaging system to provide all users with security and choice. On QuickTutor®, a Learner has to send a connection request to a Tutor, and then that Tutor has to accept the connection request in order for the users to message each other and set-up tutoring sessions. This is so Tutors have the choice of who they would like to work with, and session information can be shared privately, if desired. The QuickTutor® messaging system allows you to communicate and set-up tutoring sessions, without having to give away any personal or private information like your phone number or email. Keeping your conversations in the messaging system is a safer way to protect yourself.
					</div>
					<div className="space-between-section">
						<GreenButton text="Email Us" />
						<GreenButton text="Order ArielDx" onClick={this.goToOrder} />
					</div>
				</div>
			</div>
		);
	}
}

export default ContactUs;

