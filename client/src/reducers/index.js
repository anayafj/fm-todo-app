/* eslint-disable import/no-anonymous-default-export */
import {
	GET_TASKS,
	ADD_TASK,
	UPDATE_TASK,
	UPDATE_TASK_ORDER,
	DELETE_TASK,
	DELETE_TASK_REORDER,
} from '../actions/types';

export default function (state = null, action) {
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
				if (task._id === action.payload._id) return action.payload;
				return task;
			});
			return updatedArray;
		case UPDATE_TASK_ORDER:
			let reorderedTaskList = state.map((task, index) => {
				for (let updatedTask of action.payload) {
					if (index === updatedTask.order) return updatedTask;
				}
				return task;
			});
			return reorderedTaskList;
		case DELETE_TASK:
			return state.filter((task) => task._id !== action.payload);
		case DELETE_TASK_REORDER:
			return action.payload;
		default:
			return state;
	}
}
