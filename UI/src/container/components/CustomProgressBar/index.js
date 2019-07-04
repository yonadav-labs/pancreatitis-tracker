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
	},
	invalid: {
		default: {
			symbol: '%',
			color: '#e12512'
		}
	}
};


class CustomProgressBar extends React.PureComponent {
	rangeToPercent(number, min, max) {
		const percent = ((number - min) / (max - min)) * 100;
		return percent > 100 ? 100 : percent;
	}

	render() {
		let percent = this.props.value;
		let text = '';
		let tooltip = 'Required fields: ';

		if (this.props.scoreRange && this.props.item.is_capable) {
			percent = this.rangeToPercent(
				this.props.value,
				this.props.scoreRange.min,
				this.props.scoreRange.max
			);
			text = `${this.props.value} / ${this.props.scoreRange.max}`;
			if (this.props.title === 'APACHE II') {
				text += '+';
			}
		}

		this.props.item.params.required.forEach((attr, idx) => {
			tooltip += attr;
			if (idx < this.props.item.params.required.length - 1) {
				tooltip += ', ';
			}
		});

		if (this.props.item.params['either/or'].length > 0) {
			let fields = '';
			this.props.item.params['either/or'].forEach((attr, idx) => {
				fields += `[${attr.join(',')}]`;
				if (idx < this.props.item.params['either/or'].length - 1) {
					fields += ' / ';
				}
			});
			tooltip += `<br>Either / Or fields: ${fields}`;
		}

		let isFlag = false;
		if (this.props.scoreRange.threshold <= this.props.value) {
			isFlag = true;
		}

		let leftPercent = parseInt(100 * this.props.scoreRange.threshold / this.props.scoreRange.max, 10) + '%';

		let thresholdStyle = {
			left: `calc(${leftPercent} - 12px)`
		};

		return (
			<div>
				<div className={isFlag ? "btn-progress-bar pb-0 critical" : "btn-progress-bar pb-0"}>
					<ReactTooltip  effect='solid' className="tooltop-bar" />
					<div className="progress-title-btn" data-tip={tooltip} data-multiline="true" data-event="click">
						{this.props.title}
						<img src="/assets/images/info-w.png" className="ml-2 ml-xl-3 d-inline" style={{ height: '16px' }} />
					</div>
					<div className="progress-wrapper d-inline-flex align-items-center w-100 position-relative">
						<Progress
							percent={percent ? percent.toFixed(1): 0}
							theme={theme.valid}
							className={percent ? '' : 'empty-progress'}
						/>
						<img className="progress-ticker" src="/assets/images/icons/ticker.png" style={thresholdStyle} />
					</div>
					{
						text !== ''
							? (
								<span className="bar-result"> {text} </span>
							)
							: null
					}
				</div>
			</div>
		);
	}
}

export default CustomProgressBar;