import React from 'react';

class FooterConfirmBox extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const buttonText = this.props.buttonText ? this.props.buttonText : 'I Agree';
		const confirmText = this.props.confirmText ? this.props.confirmText : `ADAPT is a tool developed
			and provided by Ariel Precision Medicine for research use only. Results and
			suggestions are not approved for use in patient care. Please consider ADAPT as
			solely a research tool.`;

		return (
			<div className="footer-confirmbox">
				<div className="row p-4">
					<div className="col-lg-9 col-md-8 col-sm-8 col-xs-12 text-white confrimbox-text text-center">{confirmText}</div>
					<div className="col-lg-3 col-md-4 col-sm-4 col-xs-12 d-flex">
						<button
							className="btn btn-agree m-auto"
							onClick={this.props.onClick}
						>
							{buttonText}
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default FooterConfirmBox;