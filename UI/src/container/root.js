import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./views/home";
import ContactUs from "./views/contact-us";
import License from "./views/license";
import Feedback from "./views/feedback";
import Outputs from "./views/outputs";
import AccountInfo from "./views/account-info";
import Account from "./views/account";
import PatientData from "./views/patient-data";
import Order from "./views/order";
import NotFound from "./components/not-found";
import Header from "./components/Header";
import About from "./views/about";
import { isAuthenticated } from "./actions/apiWrapper";

const RootComponent = () => {
	return (
		<div id="app" className="app">
			<Header />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/contact" component={ContactUs} />
				<Route exact path="/license" component={License} />
				<Route exact path="/feedback" component={Feedback} />
				<Route exact path="/account-info" component={AccountInfo} />
				<Route exact path="/account" component={Account} />
				<Route exact path="/order" component={Order} />
				<Route exact path="/about" component={About} />
				<Route path="/outputs" render={() => (
					isAuthenticated()
						? <Outputs />
						: <Redirect to="/" />
				)} />
				<Route exact path="/patient" render={() => (
					isAuthenticated()
						? <PatientData />
						: <Redirect to="/" />
				)} />
				<Route path="/verify-email/:token" render={(props) => {
					if (props.match && props.match.params && props.match.params.token){
						window.localStorage.setItem('token', props.match.params.token);

						return (<About />);
					}
					return (<Redirect to="/" />);
				}} />

				<Route default component={NotFound} />
			</Switch>
		</div>
	);
};

export default RootComponent;
