const express = require('express');
const Tasks = require('../models/Tasks');
const router = express.Router();

// Get all Tasks
router.get('/tasks', async (req, res) => {
	const tasks = await Tasks.find();
	res.send(tasks);
});

// Get individual task
router.get('/tasks/:id', async (req, res) => {
	try {
		const tasks = await Tasks.findOne({ _id: req.params.id });
		res.send(tasks);
	} catch {
		res.status(404);
		res.send({ error: "Task doesn't exist!" });
	}
});

// Create new task
router.post('/tasks/add', async (req, res) => {
	const task = new Tasks({
		task: req.body.task,
	});
	await task.save();
	res.send(task);
});

// Update task
router.patch('/tasks/:id', async (req, res) => {
	try {
		const task = await Tasks.findOne({ _id: req.params.id });
		// console.log('Patch -- req.body = ', req.body);
		if (req.body) {
			// console.log('Body found');
			task.completed = req.body.completed;
		}

		await task.save();
		res.send(task);
	} catch {
		res.status(404);
		res.send({ error: "Post doesn't exist!" });
	}
});

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
	try {
		await Tasks.deleteOne({ _id: req.params.id });
		// res.status(204).send();
		res.send(req.params.id);
	} catch {
		res.status(404);
		res.send({ error: "Post doesn't exist!" });
	}
});

module.exports = router;
