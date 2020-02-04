import React from 'react';

class GreenButton extends React.Component {
	render() {
		return (
			<button
				type="button"
				className={
					this.props.className
						? `btn green-button ${this.props.className}`
						: 'btn green-button'
				}
				onClick={this.props.onClick}
			>
				{
					this.props.iconClassName
						? (<i className={this.props.iconClassName} />)
						: this.props.text
				}
			</button>
		);
	}
}

export default GreenButton;