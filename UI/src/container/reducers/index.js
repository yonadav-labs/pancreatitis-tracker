/* eslint-disable no-case-declarations */
import _ from 'lodash';
import * as types from './constants';

const InitialState = {
	step: 0,
	patient: {
		sex: {value: '', label: ''},
		age: {value: '', label: ''},
		height: {value: '', label: ''},
		weight: {value: '', label: ''},
		bmi: {value: '', label: ''},
		chronic_health: {value: '', label: ''},
		ph: {value: '', label: ''},
		paO2: {value: '', label: ''},
		paCO2: {value: '', label: ''},
		hco3_artieral: {value: '', label: ''},
		spO2: {value: '', label: ''},
		fiO2: {value: '', label: ''},
		base_excess: {value: '', label: ''},
		sodium: {value: '', label: ''},
		potassium: {value: '', label: ''},
		chloride: {value: '', label: ''},
		hco3_serum: {value: '', label: ''},
		bun: {value: '', label: ''},
		creatinine: {value: '', label: ''},
		glucose: {value: '', label: ''},
		calcium: {value: '', label: ''},
		albumin: {value: '', label: ''},
		ast: {value: '', label: ''},
		alt: {value: '', label: ''},
		ldh: {value: '', label: ''},
		wbc: {value: '', label: ''},
		platelet_count: {value: '', label: ''},
		hematocrit: {value: '', label: ''},
		crp: {value: '', label: ''},
		guarding: { value: '', label: '' },
		tenderness: { value: '', label: '' },
		eye_score: {value: '', label: ''},
		verbal_score: {value: '', label: ''},
		motor_score: {value: '', label: ''},
		pleural_eff: {value: '', label: ''},
		temperature: {value: '', label: ''},
		bp_systolic: {value: '', label: ''},
		bp_diastolic: {value: '', label: ''},
		heart_rate: {value: '', label: ''},
		resp_rate: {value: '', label: ''}
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
			let patient = {};
			Object.keys(state.patient).map((item) => {
				patient[item] = {
					value: '',
					label: ''
				};
			});

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