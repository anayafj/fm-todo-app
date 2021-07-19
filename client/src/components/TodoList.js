import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/index';

const _FILTER_ALL = 'all';
const _FILTER_ACTIVE = 'active';
const _FILTER_COMPLETED = 'completed';

class TodoList extends Component {
	state = { activeFilter: _FILTER_ALL };
	// showAll: true, showActiveOnly: false, showCompletedOnly: false

	renderList() {
		return this.props.tasks.map(({ task, _id, completed }) => {
			return (
				<div className={`listItem ${completed ? 'selected' : ''}`} key={_id}>
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
			);
		});
	}

	updateTaskCompleted = (id, completed) => {
		this.props.updatedTask(id, { completed: !completed });
	};

	deleteTask = (id) => {
		this.props.deleteTask(id);
	};

	handleFilterClicks = (evt) => {
		let targetDiv = evt.target;
		let updateFilterState = '';

		// document.getElementsByClassName('filter-on').disabled = false;

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
		// targetDiv.disabled = true;
	};

	// toggleDisableButton = (btn, target) => {
	// 	target.disabled = this.state.activeFilter === btn ? true : false;
	// };

	render() {
		return (
			<div className="listContainer">
				<div className="itemContainer">{this.renderList()}</div>
				<div className="listMenu">
					<div className="details">
						<p>
							<span>5</span> items left
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
								this.state.activeFilter === _FILTER_COMPLETED ? 'filter-on' : ''
							}`}
							id="btnCompleted"
							onClick={(evt) => this.handleFilterClicks(evt)}
						>
							Completed
						</div>
					</div>
					<div className="clear">
						<div className="clearCompleted" id="btnClearCompleted">
							Clear Completed
						</div>
					</div>
				</div>
			</div>
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
