import axios from 'axios';

const GET_TASKS = 'get_tasks';
const ADD_TASK = 'add_task';

export const getTasks = () => async (dispatch) => {
	const response = await axios.get('/api/tasks');
	dispatch({ type: GET_TASKS, payload: response.data });
};

// add new task -- task needs to be in form of an object
export const addTask = (task) => async (dispatch) => {
	const response = await axios.post('/api/tasks/add', task);
	dispatch({ type: ADD_TASK, payload: response.data });
};
