import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import * as actions from '../actions/index';

const _FILTER_ALL = 'all';
const _FILTER_ACTIVE = 'active';
const _FILTER_COMPLETED = 'completed';

class TodoList extends Component {
	state = { activeFilter: _FILTER_ALL, todos: this.props.tasks };

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.tasks !== this.props.tasks) {
			console.log('componentDidUpdate - props - tasks = ', this.props.tasks);
			this.setState({ todos: this.props.tasks });
			console.log('Updated State - todos = ', this.state.todos);
		}
	}

	// render list of tasks from data --\\-->
	renderList() {
		console.log('renderList - todos = ', this.state.todos);
		return this.state.todos.map(({ task, _id, completed, order }) => {
			return (
				<Draggable key={_id} draggableId={_id} index={order}>
					{(provided) => (
						<div
							className={`listItem ${completed ? 'selected' : ''} 
					${this.state.activeFilter === _FILTER_ACTIVE && completed ? 'hide' : ''}
					${this.state.activeFilter === _FILTER_COMPLETED && !completed ? 'hide' : ''}`}
							ref={provided.innerRef}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
						>
							<div
								className="circle"
								onClick={() => this.updateTaskCompleted(_id, completed)}
							>
								<div className="inner-circle"></div>
								<img
									src="./images/icon-check.svg"
									alt="check icon"
									width="11"
									height="9"
								/>
							</div>
							<div className="item ">{task}</div>
							<div
								className="xButton"
								onClick={() => this.deleteTask(_id, order)}
							>
								<img
									src="./images/icon-cross.svg"
									width="18"
									height="18"
									alt="Clear Input button"
								/>
							</div>
						</div>
					)}
				</Draggable>
			);
		});
	}

	// update task as completed; send id and object of complete with boolean value --\\-->
	updateTaskCompleted = (id, completed) => {
		this.props.updatedTask(id, { completed: !completed });
	};

	// update task list order; send object of order with id order pair --\\-->
	updateTaskListOrder = (items) => {
		const _UPDATED_TASKS = [];

		items.forEach((task, index) => {
			// task order and index do not match. updated order with index
			if (task.order !== index) {
				task.order = index;
				_UPDATED_TASKS.push(task);
			}
		});

		if (_UPDATED_TASKS) this.saveReorderedList(_UPDATED_TASKS);
	};

	// save updated task order. array of objects with id and order number --\\-->
	saveReorderedList = (tasks) => {
		const _REORDERED_TASKS = [];

		tasks.forEach((task) => {
			let taskObj = {};
			taskObj['_id'] = task._id;
			taskObj['order'] = task.order;
			_REORDERED_TASKS.push(taskObj);
		});
		this.props.updateTaskListOrder(_REORDERED_TASKS);
	};

	// delete single task; send task id & update order on needed tasks --\\-->
	deleteTask = (id, order) => {
		const _REORDERED_TASKS = [];

		// Check order of task and adjust as needed after deleting task --\\-->
		if (order !== this.state.todos.length - 1) {
			// For rest of tasks, adjust order as needed --\\-->
			for (let item of this.state.todos) {
				if (item.order === order) continue;
				if (item.order > order) {
					item.order = item.order - 1;
				}
				_REORDERED_TASKS.push(item);
			}
		}

		console.log('_REORDERED_TASKS = ', Boolean(_REORDERED_TASKS.length));
		this.props.deleteTask(
			id,
			Boolean(_REORDERED_TASKS.length) ? _REORDERED_TASKS : null,
		);
	};

	// controls all filter clicks --\\-->
	handleFilterClicks = (evt) => {
		let targetDiv = evt.target;
		let updateFilterState = '';

		switch (targetDiv.id) {
			case 'btnAll':
				updateFilterState = _FILTER_ALL;
				break;
			case 'btnActive':
				updateFilterState = _FILTER_ACTIVE;
				break;
			case 'btnCompleted':
				updateFilterState = _FILTER_COMPLETED;
				break;
			default:
				console.info('handleFilterClicks - default');
		}

		this.setState({ activeFilter: updateFilterState });
	};

	// clears all completed task; send array of ids to delete  --\\-->
	clearCompleted = () => {
		let completed_Ids = [];
		this.props.tasks.forEach(({ _id, completed }) => {
			if (completed) completed_Ids.push(_id);
		});
		this.props.deleteTasks(completed_Ids);
	};

	handleOnDragEnd = (result) => {
		if (!result.destination) return;
		// create a new copy of our characters array
		const items = Array.from(this.state.todos);
		// use the source.index value to find our item from our new array and remove it using the splice method
		const [reorderedItem] = items.splice(result.source.index, 1);
		// then use our destination.index to add that item back into the array, but at it’s new location, again using splice
		items.splice(result.destination.index, 0, reorderedItem);

		this.setState({ todos: items }); // update new order by updating the tasks state --\\-->
		this.updateTaskListOrder(items); // update new order to save on database --\\-->
	};

	render() {
		// get remaining items to complete --\\-->
		let itemsLeft;
		if (this.props.tasks)
			itemsLeft = this.props.tasks.filter(
				(task) => task.completed !== true,
			).length;

		return (
			<Fragment>
				<div className="listContainer">
					<DragDropContext onDragEnd={this.handleOnDragEnd}>
						<Droppable droppableId="tasks">
							{(provided) => (
								<div
									className="itemContainer  tasks"
									{...provided.droppableProps}
									ref={provided.innerRef}
								>
									{this.renderList()}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
					<div className="listMenu">
						<div className="details">
							<p>
								<span>{itemsLeft}</span> items left
							</p>
						</div>
						<div className="filter">
							<div
								className={`all ${
									this.state.activeFilter === _FILTER_ALL ? 'filter-on' : ''
								}`}
								id="btnAll"
								onClick={(evt) => this.handleFilterClicks(evt)}
							>
								All
							</div>
							<div
								className={`active ${
									this.state.activeFilter === _FILTER_ACTIVE ? 'filter-on' : ''
								}`}
								id="btnActive"
								onClick={(evt) => this.handleFilterClicks(evt)}
							>
								Active
							</div>
							<div
								className={`completed ${
									this.state.activeFilter === _FILTER_COMPLETED
										? 'filter-on'
										: ''
								}`}
								id="btnCompleted"
								onClick={(evt) => this.handleFilterClicks(evt)}
							>
								Completed
							</div>
						</div>
						<div className="clear">
							<div
								className="clearCompleted"
								id="btnClearCompleted"
								onClick={() => this.clearCompleted()}
							>
								Clear Completed
							</div>
						</div>
					</div>
				</div>
				<div className="menu-filter">
					<div className="filter">
						<div
							className={`all ${
								this.state.activeFilter === _FILTER_ALL ? 'filter-on' : ''
							}`}
							id="btnAll"
							onClick={(evt) => this.handleFilterClicks(evt)}
						>
							All
						</div>
						<div
							className={`active ${
								this.state.activeFilter === _FILTER_ACTIVE ? 'filter-on' : ''
							}`}
							id="btnActive"
							onClick={(evt) => this.handleFilterClicks(evt)}
						>
							Active
						</div>
						<div
							className={`completed ${
								this.state.activeFilter === _FILTER_COMPLETED ? 'filter-on' : ''
							}`}
							id="btnCompleted"
							onClick={(evt) => this.handleFilterClicks(evt)}
						>
							Completed
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

TodoList.propTypes = {
	tasks: PropTypes.array,
};

const mapStateToProps = (state) => {
	return { tasks: state };
};

export default connect(mapStateToProps, actions)(TodoList);
