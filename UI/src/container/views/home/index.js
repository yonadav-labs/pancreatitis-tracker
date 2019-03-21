import React from "react";
import GreenButton from '../../components/GreenButton';
import {connect} from 'react-redux';

const Home = () => {
	return (
		<div className="app-content home-page">
			<div className="home-page__banner">
				<h2 className="page-title">Acute Pancreatitis Severity Calculator</h2>
			</div>
			<div className="home-page__content">
				<div className="button-section">
					<GreenButton text="Get Started" />
					<hr className="vertical-bar"></hr>
				</div>
			</div>
		</div>
	);
};

// export default Home;
export default connect((props) => ({val: props.val}))(Home);

