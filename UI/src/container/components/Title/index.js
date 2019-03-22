import React from 'react';
import './index.css';

class Title extends React.Component {
	render() {
		return (
			<div className="title-wrapper">
				<div className="button-section">
					<hr className="title-vertical-bar"></hr>
					<div className="green-button title-button">{this.props.title}</div>
				</div>
			</div>
		);
	}
}

export default Title;