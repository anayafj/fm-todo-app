import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Header({ setUpdatedTheme, isThemeDay }) {
	const [dayTheme, setTheme] = useState(isThemeDay);

	useEffect(() => {
		setUpdatedTheme(dayTheme);
	}, [dayTheme, setUpdatedTheme]);

	return (
		<div className="head">
			<h1>TODO</h1>
			<div className="theme-icon" onClick={() => setTheme(!dayTheme)}>
				<img
					id="sun"
					className={`${dayTheme ? 'hide' : ''}`}
					src="./images/icon-sun.svg"
					alt="Light Theme toggle"
					width="26"
					height="26"
				/>
				<img
					id="moon"
					className={`${!dayTheme ? 'hide' : ''}`}
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
	setUpdatedTheme: PropTypes.func,
	dayTheme: PropTypes.bool,
};

export default Header;
