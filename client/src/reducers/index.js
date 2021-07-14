/* eslint-disable import/no-anonymous-default-export */
const GET_TASKS = 'get_tasks';
const ADD_TASK = 'add_task';

export default function (state = null, action) {
	console.log('From Reducer = ', action);
	switch (action.type) {
		case GET_TASKS:
			return action.payload || false;
		case ADD_TASK:
			return action.payload || false;
		default:
			return state;
	}
}
