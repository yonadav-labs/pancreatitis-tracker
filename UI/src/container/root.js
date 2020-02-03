import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./views/home";
import ContactUs from "./views/contact-us";
import License from "./views/license";
import Feedback from "./views/feedback";
import Outputs from "./views/outputs";
import Account from "./views/account";
import DynamicTracker from "./views/dynamic-tracker";
import PatientData from "./views/patient-data";
import Order from "./views/order";
import NotFound from "./views/not-found";
import Header from "./components/Header";
import About from "./views/about";
import withWrapper from './withWrapper';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router';
import { changeFooterBoxStatus, getServerStatusAction } from './actions/index';
import { isAuthenticated, getToken, setToken } from "./actions/apiWrapper";

const RootComponent = () => {
	return (
		<div id="app" className="app">
			<Header />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/contact" component={ContactUs} />
				<Route exact path="/license" component={License} />
				<Route exact path="/feedback" component={Feedback} />
				<Route exact path="/account" component={Account} />
				<Route exact path="/order" component={Order} />
				<Route exact path="/outputs" render={() => (
					isAuthenticated()
						? <Outputs />
						: <Redirect to="/" />
				)} />
				<Route exact path="/dynamic-tracker" render={() => (
					isAuthenticated()
						? <DynamicTracker />
						: <Redirect to="/" />
				)} />
				<Route exact path="/patient" render={() => (
					isAuthenticated()
						? <PatientData />
						: <Redirect to="/" />
				)} />
				<Route path="/about" render={(props) => {
					if (props.location && props.location.search && props.location.search.indexOf('?jwt=') > -1){
						setToken(props.location.search.replace('?jwt=', ''));
						return (<About />);
					}

					const token = getToken();
					if (token) {
						return (<About />);
					}

					return (<Redirect to="/" />);
				}} />
				<Route default component={NotFound} />
			</Switch>
			<div className="text-center my-4 copyright-footer p-5">© 2019 Ariel Precision Medicine. All rights reserved.</div>
		</div>
	);
};


const mapStatetoProps = state => {
	return state;
};

const mapDispatchToProps = dispatch => {
	return Object.assign(
		bindActionCreators({
			changeFooterBoxStatus,
			getServerStatusAction
		}, dispatch)
	);
};


export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(withWrapper(RootComponent)));
