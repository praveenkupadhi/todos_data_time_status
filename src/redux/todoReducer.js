import {
	ADD_TODO_FAILURE,
	ADD_TODO_REQUEST,
	ADD_TODO_SUCCESS,
	DELETE_COMPLETED_TODO_FAILURE,
	DELETE_COMPLETED_TODO_REQUEST,
	DELETE_COMPLETED_TODO_SUCCESS,
	DELETE_TODO_FAILURE,
	DELETE_TODO_REQUEST,
	DELETE_TODO_SUCCESS,
	GET_TODO_FAILURE,
	GET_TODO_REQUEST,
	GET_TODO_SUCCESS,
	STATUS_CHANGE_FAILURE,
	STATUS_CHANGE_REQUEST,
	STATUS_CHANGE_SUCCESS,
} from "./actionTypes";

const initState = {
	todosData: [],
	loading: false,
	error: "No error",
};

export const todoReducer = (store = initState, { type, payload }) => {
	switch (type) {
		case GET_TODO_REQUEST:
			return { ...store, loading: true };
		case GET_TODO_SUCCESS:
			return {
				...store,
				todosData: payload,
				loading: false,
				error: "No error",
			};
		case GET_TODO_FAILURE:
			return { ...store, error: payload, loading: false };
		case ADD_TODO_REQUEST:
			return { ...store, loading: true };
		case ADD_TODO_SUCCESS:
			return {
				...store,
				loading: false,
				error: "No error",
			};
		case ADD_TODO_FAILURE:
			return { ...store, error: payload, loading: false };
		case STATUS_CHANGE_REQUEST:
			return { ...store, loading: true };
		case STATUS_CHANGE_SUCCESS:
			return {
				...store,
				loading: false,
				error: "No error",
			};
		case STATUS_CHANGE_FAILURE:
			return { ...store, error: payload, loading: false };
		case DELETE_TODO_REQUEST:
			return { ...store, loading: true };
		case DELETE_TODO_SUCCESS:
			return {
				...store,
				loading: false,
				error: "No error",
			};
		case DELETE_TODO_FAILURE:
			return { ...store, error: payload, loading: false };
		case DELETE_COMPLETED_TODO_REQUEST:
			return { ...store, loading: true };
		case DELETE_COMPLETED_TODO_SUCCESS:
			return {
				...store,
				loading: false,
				error: "No error",
			};
		case DELETE_COMPLETED_TODO_FAILURE:
			return { ...store, error: payload, loading: false };
		default:
			return { ...store };
	}
};
