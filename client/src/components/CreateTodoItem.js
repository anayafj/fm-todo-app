import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PropTypes from 'prop-types';

class CreateTodoItem extends Component {
	state = { todoItem: '' };

	// update state on input change --\\-->
	handleChange = (evt) => {
		this.setState({ todoItem: evt.target.value });
	};

	// save new task and clear input --\\-->
	handleSubmit = (evt) => {
		evt.preventDefault();
		this.props.addTask({
			task: this.state.todoItem,
			order: this.props.numberOfTasks,
		});
		this.setState({ todoItem: '' });
	};
	order;

	// Clears input field --\\-->
	clearInputField = (evt) => {
		evt.preventDefault();
		this.setState({ todoItem: '' });
	};

	render() {
		// makes clear input field button available when text there --\\-->
		let showClearButton =
			this.state.todoItem.length > 0
				? { visibility: 'visible' }
				: { visibility: 'hidden' };
		return (
			<div className="mainInput">
				<form onSubmit={this.handleSubmit}>
					<label>
						<div className="todoContainer">
							<div
								className="circle"
								id="newTodo"
								onClick={this.handleSubmit}
							></div>
							<input
								type="text"
								value={this.state.todoItem}
								onChange={this.handleChange}
								placeholder="Create a new todo..."
							/>
							<div
								className="xButton"
								style={showClearButton}
								id="clearInput"
								onClick={this.clearInputField}
							>
								<svg width="18" height="18">
									<path d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
								</svg>
							</div>
						</div>
					</label>
				</form>
			</div>
		);
	}
}

CreateTodoItem.proptype = {
	todoItem: PropTypes.string,
	task: PropTypes.string,
	order: PropTypes.number,
};

export default connect(null, actions)(CreateTodoItem);
