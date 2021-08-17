import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import * as actions from '../actions/index';

const _FILTER_ALL = 'all';
const _FILTER_ACTIVE = 'active';
const _FILTER_COMPLETED = 'completed';

class TodoList extends Component {
	state = { activeFilter: _FILTER_ALL, tasks: this.props.tasks };

	// render list of tasks from data
	renderList() {
		// return this.props.tasks.map(({ task, _id, completed }, index) => {
		return this.state.tasks.map(({ task, _id, completed }, index) => {
			return (
				<Draggable key={_id} draggableId={_id} index={index}>
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
							<div className="xButton" onClick={() => this.deleteTask(_id)}>
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

	// update task as completed; send id and object of complete with boolean value
	updateTaskCompleted = (id, completed) => {
		this.props.updatedTask(id, { completed: !completed });
	};

	// delete single task; send task id
	deleteTask = (id) => {
		this.props.deleteTask(id);
	};

	// controls all filter clicks
	handleFilterClicks = (evt) => {
		let targetDiv = evt.target;
		let updateFilterState = '';

		switch (targetDiv.id) {
			case 'btnAll':
				console.log('btnAll');
				updateFilterState = _FILTER_ALL;
				break;
			case 'btnActive':
				console.log('btnActive');
				updateFilterState = _FILTER_ACTIVE;
				break;
			case 'btnCompleted':
				console.log('btnCompleted');
				updateFilterState = _FILTER_COMPLETED;
				break;
			default:
				console.log('default');
		}

		this.setState({ activeFilter: updateFilterState });
	};

	// clears all completed task; send array of ids to delete
	clearCompleted = () => {
		console.log('Clearing Completed');
		let completed_Ids = [];
		this.props.tasks.forEach(({ _id, completed }) => {
			if (completed) completed_Ids.push(_id);
		});
		this.props.deleteTasks(completed_Ids);
	};

	handleOnDragEnd = (result) => {
		if (!result.destination) return;
		const items = Array.from(this.state.tasks); // create a new copy of our characters array
		const [reorderedItem] = items.splice(result.source.index, 1); // use the source.index value to find our item from our new array and remove it using the splice method
		items.splice(result.destination.index, 0, reorderedItem); // then use our destination.index to add that item back into the array, but at it’s new location, again using splice

		this.setState({ tasks: items });
	};

	render() {
		// get remaining items to complete
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
