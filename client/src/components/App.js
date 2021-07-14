import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import CreateTodoItem from './CreateTodoItem';
import TodoList from './TodoList';

class App extends React.Component {
	componentDidMount = () => {
		this.props.getTasks();
	};

	render() {
		return (
			<div className="wrapper">
				<div className="main">
					<Header />
					<CreateTodoItem />
					{this.props.tasks && <TodoList />}
				</div>
				<div className="background">
					<img
						src="./images/bg-desktop-dark.jpg"
						width="1440"
						height="300"
						alt="Background Header"
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { tasks: state.length > 0 ? true : false };
};

export default connect(mapStateToProps, actions)(App);
