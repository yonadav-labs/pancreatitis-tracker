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
						Contact Us
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

