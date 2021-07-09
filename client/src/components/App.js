import React from 'react';
import CreateTodoItem from './CreateTodoItem';

class App extends React.Component {
	render() {
		return (
			<div className="wrapper">
				<div className="main">
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
					<CreateTodoItem />
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
// import logo from './logo.svg';
// import './App.css';

// function App() {
// 	const [data, setData] = React.useState(null);

// 	React.useEffect(() => {
// 		fetch('/api')
// 			.then((res) => res.json())
// 			.then((data) => setData(data.message));
// 	}, []);

// 	return (
// 		<div className="App">
// 			<header className="App-header">
// 				<img src={logo} className="App-logo" alt="logo" />
// 				<p>{!data ? 'Loading...' : data}</p>
// 			</header>
// 		</div>
// 	);
// }

export default App;
