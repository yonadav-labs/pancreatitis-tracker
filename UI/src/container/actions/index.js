import * as types from '../reducers/constants';
import {
	loadPatientDataApi,
	savePatientDataApi
} from './api';
import { RESOURCE } from 'webpack/lib/ModuleFilenameHelpers';

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

export const savePatientDataAction = (data, step) => {
	return (dispatch) => {
		savePatientDataApi(data, step)
			.then((res) => {
				if (res.success) {
					dispatch({ type: types.PATIENTS.ADD, payload: data });
				} else {
					dispatch({ type: types.PATIENTS.ERROR, payload: res.msg });
				}
			})
			.catch((err) => {
				dispatch({ type: types.PATIENTS.ERROR, payload: 'Can\'t save data' });
			});
	};
};