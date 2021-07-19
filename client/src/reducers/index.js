/* eslint-disable import/no-anonymous-default-export */
const GET_TASKS = 'get_tasks';
const ADD_TASK = 'add_task';
const UPDATE_TASK = 'update_task';
const DELETE_TASK = 'delete_task';

export default function (state = null, action) {
	// console.log('From Reducer = ', action.payload);
	// console.log('From Reducer - state = ', state);

	switch (action.type) {
		case GET_TASKS:
			return action.payload || false;
		case ADD_TASK:
			return [...state, action.payload];
		case UPDATE_TASK:
			let updatedArray = state.map((task) => {
				if (task._id === action.payload._id) {
					return action.payload;
				}

				return task;
			});
			return updatedArray;
		case DELETE_TASK:
			return state.filter((task) => task._id !== action.payload);
		default:
			return state;
	}
}
