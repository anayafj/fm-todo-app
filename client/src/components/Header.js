import React, { Component } from 'react';

class Header extends Component {
	render() {
		return (
			<div className="head">
				<h1>TODO</h1>
				<img
					id="sun"
					src="./images/icon-sun.svg"
					alt="Light Theme toggle"
					width="26"
					height="26"
				/>
				<img
					id="moon"
					className="hide"
					src="./images/icon-moon.svg"
					alt="Dark Theme toggle"
					width="26"
					height="26"
				/>
			</div>
		);
	}
}

export default Header;
