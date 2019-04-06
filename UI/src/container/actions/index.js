import jwtDecode from 'jwt-decode';
import * as types from '../reducers/constants';
import {
	loadPatientDataApi,
	savePatientDataApi,
	loadClinicalScoresApi,
	loginApi
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
			params[key] = data[key].value;
		}
	});

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

