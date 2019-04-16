import React from 'react';
import ReactTooltip from 'react-tooltip';
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
	rangeToPercent(number, min, max){
		return ((number - min) / (max - min)) * 100;
	}

	render() {
		let percent = this.props.value;
		let text = '';
		let tooltip = '';

		if (this.props.scoreRange && this.props.item.is_capable) {
			percent = this.rangeToPercent(
				this.props.value,
				this.props.scoreRange.min,
				this.props.scoreRange.max
			);
			text = `${this.props.value} / ${this.props.scoreRange.max}`;
		}

		this.props.item.params.required.forEach((attr, idx) => {
			tooltip += attr;
			if (idx < this.props.item.params.required.length - 1) {
				tooltip += ', ';
			}
		});


		return (
			<div className="btn-progress-bar">
				<ReactTooltip  effect='solid' />
				<div className="progress-title-btn" data-tip={tooltip}>{this.props.title}</div>
				<Progress
					percent={percent ? percent.toFixed(1): 0}
					theme={theme.valid}
					className={percent ? '' : 'empty-progress'}
				/>
				{
					text !== ''
						? (
							<span className="bar-result"> {text} </span>
						)
						: null
				}
			</div>
		);
	}
}

export default CustomProgressBar;