export const PATIENTS = {
	GET: 'GET_PATIENTS',
	SET: 'SET_PATIENTS',
	ADD: 'ADD_PATIENTS',
	REMOVE: 'REMOVE_PATIENTS',
	UPDATE: 'UPDATE_PATIENTS',
	ERROR: 'ERROR_PATIENTS',
	GET_HISTORY: 'GET_HISTORY',
	GET_HISTORY_BY_DATE: 'GET_HISTORY_BY_DATE',
	CLEAR_HISTORY: 'CLEAR_HISTORY'
};

export const OUTPUTS = {
	GET: 'GET_OUTPUTS',
	SET: 'SET_OUTPUTS',
	ADD: 'ADD_OUTPUTS',
	REMOVE: 'REMOVE_OUTPUTS',
	UPDATE: 'UPDATE_OUTPUTS',
	ERROR: 'ERROR_OUTPUTS'
};

export const USER = {
	GET: 'GET_USER',
	SET: 'SET_USER',
	REMOVE: 'REMOVE_USER',
	ERROR: 'ERROR_USER',
	CREATE_SUCCESS: 'CREATE_SUCCESS_USER',
	FEEDBACK_SUCCESS: 'FEEDBACK_SUCCESS',
	FEEDBACK_FAIL: 'FEEDBACK_FAIL'
};

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const GET_GRAPH_SUCCESS = 'GET_GRAPH_SUCCESS';
export const GET_GRAPH_FAIL = 'GET_GRAPH_FAIL';
export const FOOTER_CONFIRM_STATUS = 'FOOTER_CONFIRM_STATUS';
export const SERVER_STATUS = 'SERVER_STATUS';
export const SERVER_ERROR = 'SERVER_ERROR';
export const SERVER_SUCCESS = 'SERVER_SUCCESS';

export const BASE_ROUTES = [
	{ url: "account", routeName: "User Account" },
	{ url: "feedback", routeName: "Feedback" },
	{ url: "contact", routeName: "Contact Us" }
];

export const ALL_ROUTES = [
	{ url: "account", routeName: "User Account" },
	{ url: "about", routeName: "About" },
	{ url: "patient", routeName: "Patient Data" },
	{ url: "outputs", routeName: "ADAPT Outputs" },
	{ url: "dynamic-tracker", routeName: "Dynamic Tracker" },
	{ url: "feedback", routeName: "Feedback" },
	{ url: "contact", routeName: "Contact Us" }
];