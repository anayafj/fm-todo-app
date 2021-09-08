import axios from 'axios';
import {
	GET_TASKS,
	ADD_TASK,
	UPDATE_TASK,
	UPDATE_TASK_ORDER,
	DELETE_TASK,
	DELETE_TASK_REORDER,
} from './types';

export const getTasks = () => async (dispatch) => {
	const response = await axios.get('/api/tasks');
	dispatch({ type: GET_TASKS, payload: response.data });
};

// add new task -- task needs to be in form of an object --\\-->
export const addTask = (task) => async (dispatch) => {
	const response = await axios.post('/api/tasks/add', task);
	dispatch({ type: ADD_TASK, payload: response.data });
};

// update task completed value -- task needs to be in form of an object --\\-->
export const updatedTask = (id, completed) => async (dispatch) => {
	const response = await axios.patch(`/api/tasks/${id}`, completed);
	dispatch({ type: UPDATE_TASK, payload: response.data });
};

export const updateTaskListOrder = (orders) => async (dispatch) => {
	const response = await axios.patch('/api/tasks/', orders);
	dispatch({ type: UPDATE_TASK_ORDER, payload: response.data });
};

// Delete task and reorder list--\\-->
export const deleteTaskReorder = (id, taskReorders) => async (dispatch) => {
	const response = await axios.delete(`/api/tasks/${id}`);
	if (taskReorders) {
		// Tasks to reorder
		const response2 = await axios.patch('/api/tasks/', taskReorders);
		dispatch({ type: DELETE_TASK_REORDER, payload: response2.data });
	} else {
		// dispatch deleted
		dispatch({ type: DELETE_TASK, payload: response.data });
	}
};

// Delete task --\\-->
export const deleteTasksReordered =
	(idArray, taskReorders) => async (dispatch) => {
		await axios.delete('/api/tasks/', {
			data: { ids: idArray },
		});
		// Tasks to reorder
		const response = await axios.patch('/api/tasks/', taskReorders);
		dispatch({ type: DELETE_TASK_REORDER, payload: response.data });
	};
