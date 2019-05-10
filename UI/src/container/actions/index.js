import jwtDecode from 'jwt-decode';
import * as types from '../reducers/constants';
import {
	savePatientDataApi,
	loginApi,
	createAccountApi,
	loadInputHistoryApi
} from './api';
import {
	lbToKgConvert,
	inchTomConvert,
	fToC,
	glucoseConvert,
	calciumConvert,
	albuminConvert
} from '../utils/conversions';
import moment from 'moment';

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

export const getScoresAction = (data, units) => {
	let params = {...data};

	// convert data in normalized unit
	if (units.weight === 'lb' && params.weight) {
		params.weight = lbToKgConvert(params.weight);
	}

	if (units.height === 'inch' && params.height) {
		params.height = inchTomConvert(params.height);
	}

	if (units.temperature === 'fahrenheit' && params.temperature) {
		params.temperature = fToC(params.temperature);
	}

	if (units.glucose === 'mg/dL' && params.glucose) {
		params.glucose = glucoseConvert(params.glucose);
	}

	if (units.albumin === 'g/L' && params.albumin) {
		params.albumin = albuminConvert(params.albumin);
	}

	if (units.calcium === 'mEq/L' && params.calcium) {
		params.calcium = calciumConvert(params.calcium);
	}

	if (units.platelet_count === 'units/µL' && params.platelet_count) {
		params.platelet_count = params.platelet_count / 1000;
	}

	if (units.crp === 'mg/L' && params.crp) {
		params.crp = params.crp / 10;
	}
	
	if (params.admission_date) {
		const date = moment(params.admission_date);
		const hourDiff = moment().diff(date, 'hours', true);
		params.time = hourDiff;
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

export const createAccountAction = (user) => {
	return (dispatch) => {
		return createAccountApi(user)
			.then((res) => {
				if (res.success) {
					if (res && res.token) {
						window.localStorage.setItem('token', res.token);
					}
					dispatch({ type: types.USER.CREATE_SUCCESS, payload: res.data });
				} else {
					dispatch({ type: types.USER.ERROR, payload: res.msg });
				}

				return res;
			});
	};
};

export const leaveFeedbackAction = () => {
	return (dispatch) => {
		return createAccountApi(user)
			.then((res) => {
				if (res.success) {
					if (res && res.token) {
						window.localStorage.setItem('token', res.token);
					}
					dispatch({ type: types.USER.CREATE_SUCCESS, payload: res.data });
				} else {
					dispatch({ type: types.USER.ERROR, payload: res.msg });
				}

				return res;
			});
	};
};
