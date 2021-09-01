/* eslint-disable import/no-anonymous-default-export */
const GET_TASKS = 'get_tasks';
const ADD_TASK = 'add_task';
const UPDATE_TASK = 'update_task';
const UPDATE_TASK_ORDER = 'update_task_order';
const DELETE_TASK = 'delete_task';
const DELETE_TASKS = 'delete_tasks';

export default function (state = null, action) {
	console.log('From Reducer = ', action.payload);
	console.log('From Reducer - state = ', state);

	switch (action.type) {
		case GET_TASKS:
			let tempTaskToReorder = [];
			let orderedTaskList = action.payload.map((task, index) => {
				if (task.order === index) {
					return task;
				} else {
					tempTaskToReorder.push(task);
					return {};
				}
			});

			for (let item of tempTaskToReorder) {
				orderedTaskList.splice(item.order, 1, item);
			}

			return orderedTaskList;
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
		case UPDATE_TASK_ORDER:
			let reorderedTaskList = state.map((task, index) => {
				//check if updatedTask order matches index
				for (let updatedTask of action.payload) {
					if (index === updatedTask.order) {
						return updatedTask;
					}
				}
				return task;
			});
			return reorderedTaskList;
		case DELETE_TASK:
			return state.filter((task) => task._id !== action.payload);
		case DELETE_TASKS:
			return state.filter(
				(task) => action.payload.includes(task._id) === false,
			);
		default:
			return state;
	}
}
