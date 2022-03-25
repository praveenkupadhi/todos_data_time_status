import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addTodoData,
	deleteCompletedTodoData,
	deleteTodoData,
	getTodoData,
	statusChangeData,
} from "../redux/actions";

export const Todos = () => {
	const dispatch = useDispatch();
	const todosData = useSelector((store) => store.todosData);
	const loading = useSelector((store) => store.loading);

	useEffect(() => {
		dispatch(getTodoData());
	}, [dispatch]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (e.target[1].value === "") {
			alert("Date and time need to filled");
		} else {
			dispatch(
				addTodoData({
					task: e.target[0].value,
					dateAndTime: e.target[1].value,
					status: false,
				})
			);
		}
	};

	const handleClickMark = (e) => {
		dispatch(statusChangeData(e.target.id, e.target.textContent));
	};

	const handleClickDelete = (e) => {
		dispatch(deleteTodoData(e.target.id));
	};

	const deleteAllCompletedTasks = () => {
		dispatch(deleteCompletedTodoData());
	};

	return (
		<>
			<h2>Todos</h2>
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="Enter a new task" />
				<input type="datetime-local" />
				<input type="submit" value="Create Todo" />
			</form>
			{loading ? (
				<h3>Loading...</h3>
			) : (
				<>
					<button onClick={deleteAllCompletedTasks}>
						Clear All Completed Tasks
					</button>
					<div className="todosList">
						<div id="heading">
							<p>Task</p>
							<p>Date And Time</p>
							<p>Status</p>
							<p>Operation</p>
						</div>
						{todosData.map((e) => {
							return (
								<div key={e.id}>
									<p>{e.task}</p>
									<p>{e.dateAndTime.split("T").join("  |  ")}</p>
									<button id={e.id} onClick={handleClickMark}>
										{e.status ? "Completed" : "Not Completed"}
									</button>
									<button id={e.id} onClick={handleClickDelete}>
										Delete
									</button>
								</div>
							);
						})}
					</div>
				</>
			)}
		</>
	);
};
