import * as types from './constants';

const InitialState = {
	step: 0,
	patient: {},
	units: {},
	errorMsg: ''
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

		case types.PATIENTS.ADD:
			return {...state, patient: action.payload, step: action.step};
		
		case types.PATIENTS.ERROR:
			return {...state, errorMsg: action.payload};

		default:
			return state;
	}
}