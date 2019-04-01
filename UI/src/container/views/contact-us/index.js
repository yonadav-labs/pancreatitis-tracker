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
						<p>ARIEL is an integrated genomics and digital health company delivering precision medicine solutions for the diagnosis, monitoring and treatment of complex chronic diseases and disorders.</p>
						<p>Our mechanistic diagnostic approach enables informed intervention prior to the development of end-stage disease outcomes.</p>
						<p>ARIEL’s technologies can lead a paradigm shift from single gene (Mendelian) genetics to multifaceted, complicated gene to gene interactions that interface with familial and environmental factors to provide a more comprehensive view of disease trajectory and precise therapeutic options.</p>
						<p>Our platform integrates a patient’s symptoms and genetics (derived through Next Generation Sequencing of more than 700 gene targets) with complex medical information using systems modeling, machine learning and other advanced reporting technology. The process compares a patient and his or her disease behavior against databases of well-mapped, complex disease patterns to help determine both the underlying cause of the disease and the optimal treatment plan.</p>
						<p>ARIEL headquarters are in Pittsburgh, PA, with additional offices in Chicago and Los Angeles. ARIEL is also a member company at MATTER in Chicago.</p>
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

