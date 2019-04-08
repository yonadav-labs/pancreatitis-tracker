import React from 'react';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

const theme = {
	valid: {
		default: {
			symbol: '%',
			color: '#a5f6ed'
		}
	}
};


class CustomProgressBar extends React.PureComponent {
	render() {
		return (
			<div className="btn-progress-bar">
				<div className="progress-title-btn">{this.props.title}</div>
				<Progress
					percent={this.props.value ? this.props.value.toFixed(1): 0}
					theme={theme.valid}
					className={this.props.value ? '' : 'empty-progress'}
				/>
				{/* <div className="bar-value-wrapper">
					<span className={`bar-value val-${this.props.value}`}></span>
				</div>
				<span className="bar-result"> {this.props.text} </span> */}
			</div>
		);
	}
}

export default CustomProgressBar;