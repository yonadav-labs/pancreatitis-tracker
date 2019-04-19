/* eslint-disable no-case-declarations */
import _ from 'lodash';
import * as types from './constants';

const InitialState = {
	step: 0,
	patient: {},
	units: {},
	clinicalScores: [],
	errorMsg: '',
	user: {},
	historyData: []
};

export default function patientReducer(state = InitialState, action) {
	switch (action.type) {
		case types.PATIENTS.SET:
			return {
				...state,
				patient: action.payload.data,
				units: action.payload.units,
				step: action.payload.step
			};

		case types.PATIENTS.GET:
			return {...state, patient: action.payload.data, step: 0};
		
		case types.PATIENTS.GET_HISTORY:
			return {...state, historyData: action.payload.data};

		case types.PATIENTS.GET_HISTORY_BY_DATE:
			let patient = {};
			const _historyData = state.historyData;

			let idx = _.findIndex(_historyData, (o) => {
				return o.run_at === action.payload;
			});

			if (idx !== -1) {
				const temp = _historyData[idx].input_data;
				Object.keys(temp).map(item => {
					patient[item] = {
						value: temp[item] || '',
						label: ''
					};
				});
			}

			return {...state, patient: patient};

		case types.PATIENTS.ADD:
			return {...state, clinicalScores: action.payload};
		
		case types.PATIENTS.ERROR:
			return {...state, errorMsg: action.payload};
		
		case types.OUTPUTS.GET:
			return {...state, clinicalScores: action.payload};

		case types.LOGIN_SUCCESS:
			user = Object.assign({}, user, action.payload);
			user.username = user.sub;
			return {
				...state,
				user: user,
				success: true
			};

		case types.LOGIN_FAIL:
			return {
				...state,
				errorMsg: action.payload,
				success: false
			};

		default:
			return state;
	}
}