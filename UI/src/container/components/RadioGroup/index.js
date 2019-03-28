import React from 'react';

class RadioGroup extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	changeVal = (e) => {
		this.props.onChange(e.target.value);
	}

	render() {
		const {options, value} = this.props;

		return (
			<div className="radio-wrapper">
				{
					options && options.map((option, idx) => (
						<div className="radio-item" key={`${option.value}${idx}`}>
							<input
								type="radio"
								className="radio-item__input"
								name="sex"
								value={option.value}
								onChange={this.changeVal}
								checked={value && value === option.value ? true : false}
							/> {option.label}
						</div>
					))
				}
			</div>
		);
	}
}

export default RadioGroup;