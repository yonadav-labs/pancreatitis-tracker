/* eslint-disable no-case-declarations */
import _ from 'lodash';
import * as types from './constants';

const InitialState = {
	step: 0,
	patient: {
		sex: null,
		age: null,
		height: null,
		weight: null,
		bmi: null,
		chronic_health: null,
		ph: null,
		paO2: null,
		paCO2: null,
		hco3_artieral: null,
		spO2: null,
		fiO2: null,
		base_excess: null,
		sodium: null,
		potassium: null,
		chloride: null,
		hco3_serum: null,
		bun: null,
		creatinine: null,
		glucose: null,
		calcium: null,
		albumin: null,
		ast: null,
		alt: null,
		ldh: null,
		wbc: null,
		platelet_count: null,
		hematocrit: null,
		crp: null,
		guarding: null,
		tenderness: null,
		eye_score: null,
		verbal_score: null,
		motor_score: null,
		pleural_eff: null,
		temperature: null,
		bp_systolic: null,
		bp_diastolic: null,
		heart_rate: null,
		resp_rate: null
	},
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
			let patient = {...state.patient};

			const _historyData = state.historyData;

			let idx = _.findIndex(_historyData, (o) => {
				return o.run_at === action.payload;
			});

			if (idx !== -1) {
				patient = {..._historyData[idx].input_data};
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