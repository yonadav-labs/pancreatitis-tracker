import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./views/home";
import ContactUs from "./views/contact-us";
import License from "./views/license";
import Feedback from "./views/feedback";
import Outputs from './views/outputs';
import AccountInfo from './views/account-info';
import PatientData from './views/patient-data';
import NotFound from "./components/not-found";
import Header from "./components/Header";

const RootComponent = () => {
	return (
		<div id="app" className="app">
			<Header />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/contact" component={ContactUs} />
				<Route exact path="/license" component={License} />
				<Route exact path="/feedback" component={Feedback} />
				<Route exact path="/outputs" component={Outputs} />
				<Route exact path="/account-info" component={AccountInfo} />
				<Route exact path="/patient" component={PatientData} />
				
				<Route default component={NotFound} />
			</Switch>
		</div>
	);
};

export default RootComponent;
