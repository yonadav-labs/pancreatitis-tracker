import React, {useEffect} from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import { isAuthenticated } from '../../actions/apiWrapper';
import { changeFooterBoxStatus } from '../../actions';

const Home = (props) => {
	const changeRoute = (event) => {
		event.preventDefault();
		
		if (isAuthenticated()) {
			props.history.push('/patient');
		} else {
			props.history.push('/account');
		}
	};

	return (
		<div className="app-content home-page">
			<div className="home-page__banner">
				<h2 className="page-title">Ariel Dynamic Acute Pancreatitis Tracker</h2>
			</div>
			<div className="home-page__content">
				<div className="button-section">
					<Link to="" onClick={changeRoute} className="no-decoration green-button">Get Started</Link>
					<hr className="vertical-bar"></hr>
				</div>
			</div>
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return Object.assign(
		bindActionCreators({
			changeFooterBoxStatus
		}, dispatch)
	);
};

export default connect((props) => ({val: props.val}), mapDispatchToProps)(Home);
