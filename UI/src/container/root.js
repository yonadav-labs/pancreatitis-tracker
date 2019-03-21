import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./views/home";
import ContactUs from "./views/contact-us";
import License from "./views/license";
import Feedback from "./views/feedback";
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
				
				<Route default component={NotFound} />
			</Switch>
		</div>
	);
};

export default RootComponent;
