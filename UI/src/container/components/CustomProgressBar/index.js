import React from 'react';

class CustomProgressBar extends React.PureComponent {
	render() {
		return (
			<div className="btn-progress-bar">
				<div className="progress-title-btn">{this.props.title}</div>
				<div className="bar-value-wrapper">
					<span className={`bar-value val-${this.props.value}`}></span>
				</div>
				<span className="bar-result"> {this.props.text} </span>
			</div>
		);
	}
}

export default CustomProgressBar;