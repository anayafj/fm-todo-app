import React, { Component } from 'react';

class CreateTodoItem extends Component {
	render() {
		return (
			<form action="">
				<input type="checkbox" />
				<input className="todoText" type="text" value="todoItem" />
			</form>
		);
	}
}

export default CreateTodoItem;
