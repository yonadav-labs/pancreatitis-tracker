import React from 'react';
import GreenButton from '../GreenButton';
import './index.css';

class Title extends React.Component {
	render() {
		return (
			<div className="title-wrapper">
				<div className="button-section">
					<hr className="title-vertical-bar"></hr>
					<GreenButton className="title-button" text={this.props.title} />
				</div>
			</div>
		);
	}
}

export default Title;