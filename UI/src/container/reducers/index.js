// import _ from 'lodash';
// import * as types from './constants';

const InitialState = {
	val: 0,
	rooms: [],
	roomTypes: [],
	phases: [],
	products: [],
	fine_products: [],
	stages: [],
	totalArea: 0
};

export default function rootReducer(state = InitialState, action) {
	switch (action.type) {
		case 'Plus':
			return { ...state, val: state.val + 2 };

		case 'Minus':
			return { ...state, val: state.val > 0 ? state.val - 1 : 0 };

		default:
			return state;
	}
}