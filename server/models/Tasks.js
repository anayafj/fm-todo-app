const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
	task: String,
	completed: {
		type: Boolean,
		default: false,
	},
	order: Number,
});

module.exports = mongoose.model('tasks', taskSchema);
