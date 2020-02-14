let baseUrl = 'https://adapt-demo-api.arielmedicine.com';
if (window.location.href.indexOf('localhost') !== -1) {
	baseUrl = "http://localhost:8000";
} else if (window.location.href.indexOf('adapt-mvp.arielmedicine.com') !== -1) {
	baseUrl = 'https://adapt-demo-api.arielmedicine.com';
}

export const BASE_URL = baseUrl;
export const SAVE_PATIENT_DATA = BASE_URL + '/run_algorithms';
export const CREATE_ACCOUNT_URL = BASE_URL + '/register';
export const LOGIN_ACCOUNT_URL = BASE_URL + '/sign_in';
export const RESET_ACCOUNT_URL = BASE_URL + '/reset_password';
export const LOAD_INPUT_HISOTRY = BASE_URL + '/load_input_history';
export const CLEAR_INPUT_HISOTRY = BASE_URL + '/clear_input_history';
export const FEEDBACK_URL = BASE_URL + '/leave_feedback';
export const GET_GRAPH_DATA = BASE_URL + '/get_graph_data';
export const SERVER_STATUS = BASE_URL + '/server_status';
