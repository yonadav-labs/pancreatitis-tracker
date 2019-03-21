import * as types from '../reducers/constants';

export const initProductsAction = (res, dispatch) => {
	dispatch({ type: types.PRODUCTS.INIT, payload: res });
};

export const addProductsAction = (data, dispatch) => {
	dispatch({ type: types.PRODUCTS.ADD, payload: data });
};

export const getRoomsAction = (data, dispatch) => {
	dispatch({ type: types.ROOMS.GET_ROOMS, payload: data });
};

export const addRoomsAction = (data, dispatch) => {
	dispatch({ type: types.ROOMS.ADD_ROOM, payload: data });
};

export const updateRoomsAction = (data, dispatch) => {
	dispatch({ type: types.ROOMS.UPDATE, payload: data });
};

export const removeRoomsAction = (data, dispatch) => {
	dispatch({ type: types.ROOMS.REMOVE, payload: data });
};

/* Phases */
export const getPhasesAction = (data, dispatch) => {
	dispatch({ type: types.PHASES.GET, payload: data });
};

export const addPhasesAction = (data, dispatch) => {
	dispatch({ type: types.PHASES.ADD, payload: data });
};

export const updatePhasesAction = (data, dispatch) => {
	dispatch({ type: types.PHASES.UPDATE, payload: data });
};

export const removePhasesAction = (data, dispatch) => {
	dispatch({ type: types.PHASES.REMOVE, payload: data });
};

/* Product */

export const deleteProductAction = (data, dispatch) => {
	dispatch({ type: types.PRODUCTS.REMOVE, payload: data });
};

export const updateProductAction = (payload, data, dispatch) => {
	dispatch({ type: types.PRODUCTS.UPDATE, payload, data });
};

export const changeProductAction = (data, dispatch) => {
	dispatch({ type: types.PRODUCTS.CHANGE, payload: data });
};

/* Room Types */
export const getRoomTypesAction = (data, dispatch) => {
	dispatch({ type: types.ROOM_TYPES.GET, payload: data });
};

export const addRoomTypesAction = (data, dispatch) => {
	dispatch({ type: types.ROOM_TYPES.ADD, payload: data });
};

export const updateRoomTypesAction = (data, dispatch) => {
	dispatch({ type: types.ROOM_TYPES.UPDATE, payload: data });
};

export const removeRoomTypesAction = (data, dispatch) => {
	dispatch({ type: types.ROOM_TYPES.REMOVE, payload: data });
};

/* STAGE */
export const initStagesAction = (payload, dispatch) => {
	dispatch({ type: types.STAGES.INIT, payload });
};

export const removeStageAction = (payload, dispatch) => {
	dispatch({ type: types.STAGES.REMOVE, payload });
};

export const deleteProductsFromStageAction = (payload, dispatch) => {
	dispatch({ type: types.STAGES.DELETE_PRODUCTS, payload});
};

export const updateProductsFromStageAction = (payload, dispatch) => {
	dispatch({ type: types.STAGES.UPDATE_PRODUCTS, payload});
};

export const addProductToStageAction = (payload, dispatch) => {
	dispatch({ type: types.STAGES.ADD_PRODUCTS, payload});
};

export const changeOrderOfProductsOnStageAction = (payload, dispatch) => {
	dispatch({ type: types.STAGES.CHANGE_PRODUCT_ORDER, payload });
};



