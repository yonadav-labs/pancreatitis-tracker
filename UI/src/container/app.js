import React, {useEffect} from "react";
import { ToastContainer } from "react-toastify";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router';
import RootComponent from "./root";
import withWrapper from './withWrapper';
import ReactGA from 'react-ga';
import { getServerStatusAction } from './actions/index';
import "react-toastify/dist/ReactToastify.min.css";
import "./app.scss";


function initializeReactGA() {
	ReactGA.initialize('UA-158621449-1');
	ReactGA.pageview('/patient');
}

initializeReactGA();

const App = (props) => {
	useEffect(() => {
		props.getServerStatusAction(props.serverStatus);
	});

	return (
		<div>
			<ToastContainer />
			<RootComponent />
		</div>
	);
};


const mapStatetoProps = state => {
	return state;
};

const mapDispatchToProps = dispatch => {
	return Object.assign(
		bindActionCreators({
			getServerStatusAction
		}, dispatch)
	);
};

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(App));
