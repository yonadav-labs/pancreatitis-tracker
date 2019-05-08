let baseUrl = 'https://adapt-mvp.arielmedicine.com/api';
if (window.location.href.indexOf('localhost') !== -1) {
	baseUrl = "http://localhost:8000";
} else if (window.location.href.indexOf('adapt-mvp.arielmedicine.com') !== -1) {
	baseUrl = 'https://adapt-mvp.arielmedicine.com/api';
}

export const BASE_URL = baseUrl;
export const SAVE_PATIENT_DATA = BASE_URL + '/run_algorithms';
export const CREATE_ACCOUNT_URL = BASE_URL + '/register';
export const LOAD_INPUT_HISOTRY = BASE_URL + '/load_input_history';
