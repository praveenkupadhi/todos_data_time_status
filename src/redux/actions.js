import axios from "axios";
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

export const getTodoRequest = () => ({
	type: GET_TODO_REQUEST,
});

export const getTodoSuccess = (payload) => ({
	type: GET_TODO_SUCCESS,
	payload,
});

export const getTodoFailure = (payload) => ({
	type: GET_TODO_FAILURE,
	payload,
});

export const getTodoData = () => {
	return (dispatch) => {
		dispatch(getTodoRequest());
		axios
			.get("https://todos-json-server-backend.herokuapp.com/todos")
			.then((res) => {
				dispatch(getTodoSuccess(res.data));
			})
			.catch((error) => {
				dispatch(getTodoFailure(error));
			});
	};
};

export const addTodoRequest = () => ({
	type: ADD_TODO_REQUEST,
});

export const addTodoSuccess = () => ({
	type: ADD_TODO_SUCCESS,
});

export const addTodoFailure = (payload) => ({
	type: ADD_TODO_FAILURE,
	payload,
});

export const addTodoData = (todo) => {
	return (dispatch) => {
		dispatch(addTodoRequest());
		axios
			.post("https://todos-json-server-backend.herokuapp.com/todos", todo)
			.then(() => {
				dispatch(addTodoSuccess());
				dispatch(getTodoData());
			})
			.catch((error) => dispatch(addTodoFailure(error)));
	};
};

export const statusChangeRequest = () => ({
	type: STATUS_CHANGE_REQUEST,
});

export const statusChangeSuccess = () => ({
	type: STATUS_CHANGE_SUCCESS,
});

export const statusChangeFailure = (payload) => ({
	type: STATUS_CHANGE_FAILURE,
	payload,
});

export const statusChangeData = (id, status) => {
	return (dispatch) => {
		dispatch(statusChangeRequest());
		if (status === "Completed") {
			axios
				.patch(`https://todos-json-server-backend.herokuapp.com/todos/${id}`, {
					status: false,
				})
				.then(() => {
					dispatch(statusChangeSuccess());
					dispatch(getTodoData());
				})
				.catch((error) => dispatch(statusChangeFailure(error)));
		} else if (status === "Not Completed") {
			axios
				.patch(`https://todos-json-server-backend.herokuapp.com/todos/${id}`, {
					status: true,
				})
				.then(() => {
					dispatch(statusChangeSuccess());
					dispatch(getTodoData());
				})
				.catch((error) => dispatch(statusChangeFailure(error)));
		}
	};
};

export const deleteTodoRequest = () => ({
	type: DELETE_TODO_REQUEST,
});

export const deleteTodoSuccess = () => ({
	type: DELETE_TODO_SUCCESS,
});

export const deleteTodoFailure = (payload) => ({
	type: DELETE_TODO_FAILURE,
	payload,
});

export const deleteTodoData = (id) => {
	return (dispatch) => {
		dispatch(deleteTodoRequest());
		axios
			.delete(`https://todos-json-server-backend.herokuapp.com/todos/${id}`)
			.then(() => {
				dispatch(deleteTodoSuccess());
				dispatch(getTodoData());
			})
			.catch((error) => dispatch(deleteTodoFailure(error)));
	};
};

export const deleteCompletedTodoRequest = () => ({
	type: DELETE_COMPLETED_TODO_REQUEST,
});

export const deleteCompletedTodoSuccess = () => ({
	type: DELETE_COMPLETED_TODO_SUCCESS,
});

export const deleteCompletedTodoFailure = (payload) => ({
	type: DELETE_COMPLETED_TODO_FAILURE,
	payload,
});

export const deleteCompletedTodoData = () => {
	return (dispatch) => {
		dispatch(deleteTodoRequest());
		axios
			.get("https://todos-json-server-backend.herokuapp.com/todos")
			.then((res) => {
				res.data.forEach((e) => {
					if (e.status === true) {
						axios
							.delete(
								`https://todos-json-server-backend.herokuapp.com/todos/${e.id}`
							)
							.then(() => {
								dispatch(deleteCompletedTodoSuccess());
								dispatch(getTodoData());
							})
							.catch((error) => {
								dispatch(deleteCompletedTodoFailure(error));
							});
					}
				});
			});
	};
};
