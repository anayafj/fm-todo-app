import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// class Header extends Component {
function Header({ setUpdatedTheme }) {
	const [theme, setTheme] = useState([{ day: false }]);

	useEffect(() => {
		setUpdatedTheme(theme.day);
	}, [theme, setUpdatedTheme]);

	return (
		<div className="head">
			<h1>TODO</h1>
			<div className="theme-icon" onClick={() => setTheme({ day: !theme.day })}>
				<img
					id="sun"
					className={`${theme.day ? 'hide' : ''}`}
					src="./images/icon-sun.svg"
					alt="Light Theme toggle"
					width="26"
					height="26"
				/>
				<img
					id="moon"
					className={`${!theme.day ? 'hide' : ''}`}
					src="./images/icon-moon.svg"
					alt="Dark Theme toggle"
					width="26"
					height="26"
				/>
			</div>
		</div>
	);
}

Header.propTypes = {
	theme: PropTypes.object,
	day: PropTypes.bool,
};

export default Header;
