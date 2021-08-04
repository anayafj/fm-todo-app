import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../actions';
import Header from './Header';
import CreateTodoItem from './CreateTodoItem';
import TodoList from './TodoList';

class App extends React.Component {
	state = { isThemeDay: false };

	componentDidMount = () => {
		this.props.getTasks();
	};

	setUpdatedTheme = (isDay) => {
		console.log('APP SETUP THEME -- isDay = ', isDay);
		this.setState({ isThemeDay: isDay });
	};

	render() {
		return (
			<div className={`wrapper ${this.state.isThemeDay ? 'theme-day' : ''}`}>
				<div className="main">
					<Header setUpdatedTheme={this.setUpdatedTheme} />
					<CreateTodoItem />
					{this.props.tasks && <TodoList />}
				</div>
				<div className="background">
					<img
						className="desktop"
						id="drkDesktopBg"
						src="./images/bg-desktop-dark.jpg"
						width="1440"
						height="300"
						alt="Background Header - Night theme"
					/>

					<img
						className="desktop"
						id="ltDesktopBg"
						src="./images/bg-desktop-light.jpg"
						width="1440"
						height="300"
						alt="Background Header - Night theme"
					/>

					<img
						className="mobile"
						src="./images/bg-mobile-dark.jpg"
						width="375"
						height="200"
						alt="Background Header for Mobile  - Night theme"
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
