import axios from 'axios';

const GET_TASKS = 'get_tasks';
const ADD_TASK = 'add_task';
const UPDATE_TASK = 'update_task';
const DELETE_TASK = 'delete_task';
const DELETE_TASKS = 'delete_tasks';

export const getTasks = () => async (dispatch) => {
	const response = await axios.get('/api/tasks');
	dispatch({ type: GET_TASKS, payload: response.data });
};

// add new task -- task needs to be in form of an object
export const addTask = (task) => async (dispatch) => {
	const response = await axios.post('/api/tasks/add', task);
	dispatch({ type: ADD_TASK, payload: response.data });
};

// update task completed value -- task needs to be in form of an object
export const updatedTask = (id, completed) => async (dispatch) => {
	const response = await axios.patch(`/api/tasks/${id}`, completed);
	dispatch({ type: UPDATE_TASK, payload: response.data });
};

// Delete task
export const deleteTask = (id) => async (dispatch) => {
	// console.log('id = ', id);
	const response = await axios.delete(`/api/tasks/${id}`);
	dispatch({ type: DELETE_TASK, payload: response.data });
};

// Delete task
export const deleteTasks = (idArray) => async (dispatch) => {
	console.log('ids = ', idArray);
	const response = await axios.delete('/api/tasks/', {
		data: { ids: idArray },
	});
	dispatch({ type: DELETE_TASKS, payload: response.data });
};

//TRY THIS // https://masteringjs.io/tutorials/axios/all
// const axiosrequest1 = axios.get('https://httpbin.org/get');
// const axiosrequest2 = axios.get('https://httpbin.org/get');
// const axiosrequest3 = axios.get('https://httpbin.org/get');
// // you could also use destructuring to have an array of responses
// await axios.all([axiosrequest1, axiosrequest2, axiosrequest3]).then(axios.spread(function(res1, res2, res3) {
//   console.log(res1);
//   console.log(res2);
//   console.log(res3);
// }));
