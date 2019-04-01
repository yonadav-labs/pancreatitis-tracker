import * as types from '../reducers/constants';
import { loadPatientDataApi } from './api';

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