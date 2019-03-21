import React from "react";
import { ToastContainer } from "react-toastify";
import RootComponent from "./root";
import "react-toastify/dist/ReactToastify.min.css";
import "./app.scss";

const App = () => {
	return (
		<div>
			<ToastContainer />
			<RootComponent />
		</div>
	);
};

export default App;
