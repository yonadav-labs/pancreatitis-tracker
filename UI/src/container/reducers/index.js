/* eslint-disable no-case-declarations */
import _ from 'lodash';
import * as types from './constants';

const InitialState = {
	step: 0,
	patient: {
		sex: '',
		age: '',
		height: '',
		weight: '',
		bmi: '',
		chronic_health: '',
		ph: '',
		paO2: '',
		paCO2: '',
		hco3_artieral: '',
		spO2: '',
		fiO2: '',
		base_excess: '',
		sodium: '',
		potassium: '',
		chloride: '',
		hco3_serum: '',
		bun: '',
		creatinine: '',
		glucose: '',
		calcium: '',
		albumin: '',
		ast: '',
		alt: '',
		ldh: '',
		wbc: '',
		platelet_count: '',
		hematocrit: '',
		crp: '',
		guarding: '',
		tenderness: '',
		eye_score: '',
		verbal_score: '',
		motor_score: '',
		pleural_eff: '',
		temperature: '',
		bp_systolic: '',
		bp_diastolic: '',
		heart_rate: '',
		resp_rate: ''
	},
	units: {
		sex: null,
		age: null,
		height: 'cm',
		weight: 'kg',
		bmi: 'kg/m2',
		chronic_health: null,

		temperature: 'celcius',
		bp_systolic: 'mmHg',
		bp_diastolic: 'mmHg',
		heart_rate: 'bpm',
		resp_rate: 'bpm',
		spO2: '%',	// spO2 pulse oximetry

		guarding: null,
		tenderness: null,
		eye_score: null,
		verbal_score: null,
		motor_score: null,
		pleural_eff: null,

		sodium: 'mmol/L',
		potassium: 'mmol/L',
		chloride: 'mmol/L',
		hco3_serum: 'mmol/L',
		bun: 'mg/dL',
		creatinine: 'mg/dL',
		glucose: 'mmol/L',
		calcium: 'mmol/L',
		albumin: 'g/dL',
		ast: 'U/L',
		alt: 'U/L',
		ldh: 'IU/L',

		ph: null,
		paO2: null,
		paCO2: null,
		hco3_artieral: null,
		fiO2: null,
		base_excess: null,
		
		wbc: null,
		platelet_count: null,
		hematocrit: null,
		crp: null
	},
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