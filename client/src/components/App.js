import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../actions';
import Header from './Header';
import CreateTodoItem from './CreateTodoItem';
import TodoList from './TodoList';

const DARK_BACKGROUND = './images/bg-desktop-dark.jpg';
const LIGHT_BACKGROUND = './images/bg-desktop-light.jpg';
const DARK_MOBILE_BACKGROUND = './images/bg-mobile-dark.jpg';
const LIGHT_MOBILE_BACKGROUND = './images/bg-mobile-light.jpg';

// ****************************** SET DATABASE DOCUMENT FOR THEME SETTING !!!!!!!!!!!!

class App extends React.Component {
	state = { isThemeDay: false };

	componentDidMount = () => {
		this.props.getTasks();
	};

	setUpdatedTheme = (isDay) => {
		this.setState({ isThemeDay: isDay });
	};

	render() {
		const _TASKS_AVAILABLE = this.props.tasks > 0 ? true : false;
		return (
			<div className={`wrapper ${this.state.isThemeDay ? 'theme-day' : ''}`}>
				<div className="main">
					<Header
						setUpdatedTheme={this.setUpdatedTheme}
						isThemeDay={this.state.isThemeDay}
					/>
					<CreateTodoItem numberOfTasks={this.props.tasks} />
					{_TASKS_AVAILABLE && <TodoList />}
				</div>
				<div className="background">
					<img
						className="desktop"
						id="DesktopBg"
						src={`${
							this.state.isThemeDay ? LIGHT_BACKGROUND : DARK_BACKGROUND
						}`}
						width="1440"
						height="300"
						alt="Background Header"
					/>

					<img
						className="mobile"
						src={`${
							this.state.isThemeDay
								? LIGHT_MOBILE_BACKGROUND
								: DARK_MOBILE_BACKGROUND
						}`}
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
	tasks: PropTypes.number,
	isThemeDay: PropTypes.bool,
	isDay: PropTypes.bool,
};

const mapStateToProps = (state) => {
	return { tasks: state.length };
};

export default connect(mapStateToProps, actions)(App);
