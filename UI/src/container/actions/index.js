import jwtDecode from 'jwt-decode';
import * as types from '../reducers/constants';
import {
	loadPatientDataApi,
	savePatientDataApi,
	loadClinicalScoresApi,
	loginApi,
	createAccountApi,
	loadInputHistoryApi
} from './api';
import {
	lbToKgConvert,
	inchTomConvert
} from '../utils/utils';

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

export const loadInputHistoryAction = () => {
	return (dispatch) => {
		loadInputHistoryApi()
			.then((res) => {
				dispatch({ type: types.PATIENTS.GET_HISTORY, payload: res.data });
			})
			.catch(() => {
				dispatch({ type: types.PATIENTS.ERROR, payload: 'uploading error' });
			});
	};
};

export const getHistoryByDateAction = date => {
	return (dispatch) => {
		dispatch({ type: types.PATIENTS.GET_HISTORY_BY_DATE, payload: date });
	};
};

export const savePatientDataAction = (data, units) => {
	let params = {...data};

	Object.keys(params).forEach(key => {
		if (params[key] === '') {
			params[key] = null;
		}
	});
		
	// convert data in normalized unit
	if (units.weight === 'lb' && params.weight) {
		params.weight = lbToKgConvert(params.weight);
	}

	if (units.height === 'inch' && params.height) {
		params.height = inchTomConvert(params.height);
	}

	return (dispatch) => {
		return savePatientDataApi(params)
			.then((res) => {
				if (res.success) {
					dispatch({ type: types.PATIENTS.ADD, payload: res.data });
				} else {
					dispatch({ type: types.PATIENTS.ERROR, payload: res.msg });
				}

				return { ...res };
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
		return createAccountApi(user)
			.then((res) => {
				if (res.success) {
					if (res.data && res.data.token) {
						window.localStorage.setItem('token', res.data.token);
					}
					dispatch({ type: types.USER.CREATE_SUCCESS, payload: res.data });
				} else {
					dispatch({ type: types.USER.ERROR, payload: res.msg });
				}

				return res;
			});
	};
};
