import React from "react";
import Title from '../../components/Title';
import GreenButton from "../../components/GreenButton";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { leaveFeedbackAction } from '../../actions';
import { toast } from "react-toastify";

class Feedback extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			feedback: '',
			errors: {}
		};
	}

	changeValue = (e) => {
		this.setState({ feedback: e.target.value });
	}

	leaveFeedback = () => {
		let errors = {};
		const { feedback } = this.state;

		if (feedback.trim().length === 0) {
			errors = { msg: 'Please leave your feedback.'};
			this.setState({ errors });
		} else {
			this.setState({ errors });
			this.props.leaveFeedbackAction(feedback).then(res => {
				this.setState({ feedback: '' });
				toast.success('Your feedback saved successfully!', {
					position: toast.POSITION.TOP_CENTER
				});
			});
		}
	}

	render () {
		const { errors } = this.state;

		return (
			<div className="app-content">
				<Title title="Feedback" />
				<div className="container">
					<div className="page-subtitle text-center">
						The power of ADAPT lies in its ability to be dynamically updated and improved over the time. Please provide any comments and suggestions for improvements below.
					</div>
					<div className="page-section">
						<textarea
							type="textarea"
							className="feedback-input p-3 mb-2"
							value={this.state.feedback}
							onChange={this.changeValue}
						/>
						<label className="color-danger pt-2 text-danger text-center warning-message">
							{ errors.msg }
						</label>
						<div className="space-between-section mb-5 mt-3">
							<GreenButton text="Send Feedback" onClick={this.leaveFeedback} />
							<GreenButton text="Continue" onClick={() => this.props.history.push('/contact')} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStatetoProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return Object.assign(
		bindActionCreators({
			leaveFeedbackAction
		}, dispatch)
	);
};
	
export default connect(mapStatetoProps, mapDispatchToProps)(Feedback);
