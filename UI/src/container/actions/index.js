import jwtDecode from 'jwt-decode';
import * as types from '../reducers/constants';
import {
	loadPatientDataApi,
	savePatientDataApi,
	loadClinicalScoresApi,
	loginApi,
	createAccountApi
} from './api';

export const loginAction = (username, password) => {
	return (dispatch) => {
		return loginApi(username, password).then((res) => {
			if (res && res.success) {
				dispatch({
					type: types.LOGIN_SUCCESS,
					payload: jwtDecode(res.user.token)
				});
			} else {
				dispatch({
					type: types.LOGIN_FAIL,
					payload: res.error
				});
			}
		});
	};
};

export const setUpdatesPerPagePatientAction = (res) => {
	return (dispatch) => {
		dispatch({ type: types.PATIENTS.SET, payload: res });
	};
};

export const loadPatientDataAction = (files) => {
	return (dispatch) => {
		loadPatientDataApi(files)
			.then((res) => {
				dispatch({ type: types.PATIENTS.GET, payload: res });
			})
			.catch((err) => {
				dispatch({ type: types.PATIENTS.ERROR, payload: 'uploading error' });
			});
	};
};

export const savePatientDataAction = (data) => {
	let params = {};

	Object.keys(data).forEach(key => {
		if (data[key].value && data[key].value !== '') {
			if (data[key].calculatedValue) {
				params[key] = data[key].calculatedValue;
			} else {
				params[key] = data[key].value;
			}
		}
	});

	if (params.hasOwnProperty('hco3_serum')) {
		params.bicarbonate = params.hco3_serum;
		delete params.hco3_serum;
	}

	if (params.hasOwnProperty('hco3_artieral')) {
		params.bicarbonate = params.hco3_artieral;
		delete params.hco3_artieral;
	}

	return (dispatch) => {
		savePatientDataApi(params)
			.then((res) => {
				if (res.success) {
					dispatch({ type: types.PATIENTS.ADD, payload: res.data });
				} else {
					dispatch({ type: types.PATIENTS.ERROR, payload: res.msg });
				}
			})
			.catch((err) => {
				dispatch({ type: types.PATIENTS.ERROR, payload: 'Can\'t save data' });
			});
	};
};

export const loadClinicalScores = () => {
	return (dispatch) => {
		loadClinicalScoresApi()
			.then((res) => {
				if (res.success) {
					dispatch({ type: types.OUTPUTS.GET, payload: res.data });
				} else {
					dispatch({ type: types.OUTPUTS.ERROR, payload: res.msg });
				}
			})
			.catch((err) => {
				dispatch({ type: types.OUTPUTS.ERROR, payload: 'Can\'t save data' });
			});
	};
};

export const createAccount = (user) => {
	return (dispatch) => {
		return createAccountApi()
			.then((res) => {
				if (res.success) {
					window.localStorage.setItem('token', res.data.token);
					dispatch({ type: types.USER.CREATE_SUCCESS, payload: res.data });
				} else {
					dispatch({ type: types.USER.ERROR, payload: res.msg });
				}

				return res;
			});
	};
};
