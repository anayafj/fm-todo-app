const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const PORT = process.env.PORT || 5000;
const keys = require('./config/keys');
const routes = require('./routes/taskRoutes');

// connect to MongoDB database
mongoose
	.connect(keys.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		const app = express();
		app.use(express.json());
		app.use('/api', routes);

		// Have Node serve the files for our built React app
		app.use(express.static(path.resolve(__dirname, '../client/build')));

		app.listen(PORT, () => {
			console.log(`Server listening on ${PORT}`);
		});

		// All other GET requests not handled before will return our React app
		app.get('*', (req, res) => {
			res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
		});
	});
