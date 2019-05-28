import React from "react";
import { ToastContainer } from "react-toastify";
import RootComponent from "./root";
import ReactGA from 'react-ga';
import "react-toastify/dist/ReactToastify.min.css";
import "./app.scss";

function initializeReactGA() {
	ReactGA.initialize('UA-140942097-1');
	ReactGA.pageview('/patient');
}

const App = () => {
	return (
		<div>
			<ToastContainer />
			<RootComponent />
		</div>
	);
};

export default App;
