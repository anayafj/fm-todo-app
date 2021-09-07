import axios from 'axios';

const GET_TASKS = 'get_tasks';
const ADD_TASK = 'add_task';
const UPDATE_TASK = 'update_task';
const UPDATE_TASK_ORDER = 'update_task_order';
const DELETE_TASK = 'delete_task';
const DELETE_TASK_REORDER = 'delete_task_reorder';
const DELETE_TASKS = 'delete_tasks';

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

// Delete task --\\-->
export const deleteTask = (id, taskReorders) => async (dispatch) => {
	const response = await axios.delete(`/api/tasks/${id}`);
	dispatch({ type: DELETE_TASK_REORDER, payload: response.data });
};

// Delete task and reorder list--\\-->
export const deleteTaskReorder = (id, taskReorders) => async (dispatch) => {
	// console.log('id = ', id);
	// console.log('taskReorders = ', taskReorders);
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
export const deleteTasks = (idArray) => async (dispatch) => {
	// console.log('ids = ', idArray);
	const response = await axios.delete('/api/tasks/', {
		data: { ids: idArray },
	});
	dispatch({ type: DELETE_TASKS, payload: response.data });
};

// Delete task --\\-->
export const deleteTasksReordered =
	(idArray, taskReorders) => async (dispatch) => {
		// console.log('ids = ', idArray + '     taskReorders = ', taskReorders);
		await axios.delete('/api/tasks/', {
			data: { ids: idArray },
		});
		// Tasks to reorder
		const response = await axios.patch('/api/tasks/', taskReorders);
		dispatch({ type: DELETE_TASK_REORDER, payload: response.data });
	};
