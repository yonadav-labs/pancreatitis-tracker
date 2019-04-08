import React from 'react';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

class CustomProgressBar extends React.PureComponent {
	render() {
		
		return (
			<div className="btn-progress-bar">
				<div className="progress-title-btn">{this.props.title}</div>
				<Progress
					percent={this.props.value.toFixed(1)}
					theme={{
						default: {
							symbol: '%',
						  color: '#a5f6ed'
						}
					}}
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