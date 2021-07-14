import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CreateTodoItem extends Component {
	state = { todoItem: '' };

	// update state on input change
	handleChange = (evt) => {
		this.setState({ todoItem: evt.target.value });
	};

	// save new task and clear input
	handleSubmit = (evt) => {
		evt.preventDefault();
		this.props.addTask({ task: this.state.todoItem });
		this.setState({ todoItem: '' });
	};

	// Clears input field
	clearInputField = (evt) => {
		evt.preventDefault();
		this.setState({ todoItem: '' });
	};

	render() {
		// makes clear input field button available when text there
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
								<img
									src="./images/icon-cross.svg"
									width="18"
									height="18"
									alt="Clear Input button"
								/>
							</div>
						</div>
					</label>
				</form>
			</div>
		);
	}
}

export default connect(null, actions)(CreateTodoItem);
