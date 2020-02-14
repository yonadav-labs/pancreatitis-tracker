import jwtDecode from 'jwt-decode';
import * as types from '../reducers/constants';
import {
	savePatientDataApi,
	leaveFeedbackApi,
	createAccountApi,
	loadInputHistoryApi,
	getGraphDataApi,
	getServerStatusApi,
	resetAccountApi,
	loginAccountApi
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
				if (res.success) {
					dispatch({ type: types.PATIENTS.GET_HISTORY, payload: res.data });
				} else {
					dispatch({ type: types.SERVER_ERROR, payload: res });
				}
			})
			.catch(() => {
				dispatch({
					type: types.PATIENTS.ERROR,
					payload: {
						msg: 'loading history error',
						success: false
					}
				});
			});
	};
};

export const getGraphDataAction = (fromDate, toDate) => {
	return (dispatch) => {
		getGraphDataApi(fromDate, toDate)
			.then((res) => {
				if (res.success) {
					dispatch({ type: types.GET_GRAPH_SUCCESS, payload: res.data });
				} else {
					dispatch({ type: types.SERVER_ERROR, payload: res });
				}
			})
			.catch(() => {
				dispatch({
					type: types.GET_GRAPH_FAIL,
					payload: {
						msg: 'getting graph data error'
					}
				});
			});
	};
};

export const clearGraphData = () => {
	return (dispatch) => {
		dispatch({ type: types.GET_GRAPH_SUCCESS, payload: {} });
	};
};

export const getHistoryByDateAction = date => {
	return (dispatch) => {
		dispatch({ type: types.PATIENTS.GET_HISTORY_BY_DATE, payload: date });
	};
};

export const clearHistoryAction = date => {
	return (dispatch) => {
		dispatch({ type: types.PATIENTS.CLEAR_HISTORY });
	};
};

export const getScoresAction = (data, units) => {
	let params = {...data};

	// convert data in normalized unit
	if (units.weight === 'lb' && params.weight) {
		params.weight = lbToKgConvert(params.weight);
	}

	if (units.height === 'inch' && params.height) {
		params.height = inchTomConvert(params.height) * 100;
	}

	if (units.temperature === 'fahrenheit' && params.temperature) {
		params.temperature = fToC(params.temperature);
	}

	if (units.glucose === 'mmol/L' && params.glucose) {
		params.glucose = glucoseConvert(params.glucose);
	}

	if (units.albumin === 'g/L' && params.albumin) {
		params.albumin = albuminConvert(params.albumin);
	}

	if (units.calcium !== 'mg/dL' && params.calcium) {
		params.calcium = calciumConvert(params.calcium, units.calcium);
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
					dispatch({ type: types.SERVER_ERROR, payload: res });
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

					if (res.isServerError) {
						dispatch({ type: types.SERVER_ERROR, payload: res });
					}
				}

				return res;
			});
	};
};


export const loginAccountAction = (user) => {
	return (dispatch) => {
		return loginAccountApi(user)
			.then((res) => {
				if (res.success) {
					if (res && res.token) {
						window.localStorage.setItem('token', res.token);
					}
					dispatch({ type: types.USER.CREATE_SUCCESS, payload: res.data });
				} else {
					dispatch({ type: types.USER.ERROR, payload: res.msg });

					if (res.isServerError) {
						dispatch({ type: types.SERVER_ERROR, payload: res });
					}
				}

				return res;
			});
	};
};

export const resetAccountAction = (user) => {
	return (dispatch) => {
		return resetAccountApi(user)
			.then((res) => {
				if (res.success) {
					if (res && res.token) {
						window.localStorage.setItem('token', res.token);
					}
					dispatch({ type: types.USER.CREATE_SUCCESS, payload: res.data });
				} else {
					dispatch({ type: types.USER.ERROR, payload: res.msg });

					if (res.isServerError) {
						dispatch({ type: types.SERVER_ERROR, payload: res });
					}
				}

				return res;
			});
	};
};

export const leaveFeedbackAction = (feedback) => {
	return (dispatch) => {
		return leaveFeedbackApi(feedback)
			.then((res) => {
				if (res.success) {
					dispatch({ type: types.USER.FEEDBACK_SUCCESS, payload: null });
				} else {
					dispatch({ type: types.USER.FEEDBACK_FAIL, payload: res.msg });
					if (res.isServerError) {
						dispatch({ type: types.SERVER_ERROR, payload: res });
					}
				}

				return res;
			});
	};
};

export const changeFooterBoxStatus = status => {
	return (dispatch) => {
		dispatch({ type: types.FOOTER_CONFIRM_STATUS, payload: {data: status} });
	};
};

export const getServerStatusAction = (serverStatus) => {
	return (dispatch) => {
		getServerStatusApi()
			.then((res) => {
				if (res.success) {
					if (serverStatus) {
						if (res.data.status !== serverStatus.status) {
							dispatch({ type: types.SERVER_STATUS, payload: res.data });
						}
					}

					dispatch({ type: types.SERVER_SUCCESS, payload: {isServerError: false} });
				} else {
					dispatch({ type: types.SERVER_ERROR, payload: res });
				}

				return res;
			})
			.catch((err) => {
				console.log('action catch: ', err);
			});
	};
};
