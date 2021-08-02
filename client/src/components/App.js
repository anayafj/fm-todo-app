import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
						className="desktop"
						src="./images/bg-desktop-dark.jpg"
						width="1440"
						height="300"
						alt="Background Header"
					/>

					<img
						className="mobile"
						src="./images/bg-mobile-dark.jpg"
						width="375"
						height="200"
						alt="Background Header for Mobile"
					/>
				</div>
			</div>
		);
	}
}

App.propTypes = {
	tasks: PropTypes.bool,
};

const mapStateToProps = (state) => {
	return { tasks: state.length > 0 ? true : false };
};

export default connect(mapStateToProps, actions)(App);
