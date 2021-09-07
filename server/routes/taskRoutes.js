const express = require('express');
const Tasks = require('../models/Tasks');
const router = express.Router();

// Get all Tasks --\\-->
router.get('/tasks', async (req, res) => {
	const tasks = await Tasks.find();
	res.send(tasks);
});

// Get individual task --\\-->
router.get('/tasks/:id', async (req, res) => {
	try {
		const tasks = await Tasks.findOne({ _id: req.params.id });
		res.send(tasks);
	} catch {
		res.status(404);
		res.send({ error: "Task doesn't exist!" });
	}
});

// Create new task --\\-->
router.post('/tasks/add', async (req, res) => {
	const task = new Tasks({
		task: req.body.task,
		order: req.body.order,
	});
	await task.save();
	res.send(task);
});

// Update task --\\-->
router.patch('/tasks/:id', async (req, res) => {
	try {
		const task = await Tasks.findOne({ _id: req.params.id });
		if (req.body) {
			task.completed = req.body.completed;
		}

		await task.save();
		res.send(task);
	} catch {
		res.status(404);
		res.send({ error: "Post doesn't exist!" });
	}
});

// Update task list order --\\-->
router.patch('/tasks/', async (req, res) => {
	try {
		// console.log('patch ---- req.body = ', req.body);
		const tasks = [];
		await asyncForEach(req.body, async (item) => {
			const task = await Tasks.findOne({ _id: item._id });
			task.order = item.order;
			await task.save();
			tasks.push(task);
		});
		// console.log('patch ---- tasks = ', tasks);
		res.send(tasks);
	} catch {
		res.status(404);
		res.send({ error: "Post doesn't exist!" });
	}
});

// ForEach helper function for async/await --\\-->
async function asyncForEach(array, callback) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

// Delete a task --\\-->
router.delete('/tasks/:id', async (req, res) => {
	try {
		// console.log('delete ---- req.params._id = ', req.params.id);
		await Tasks.deleteOne({ _id: req.params.id });
		res.send(req.params.id);
	} catch {
		res.status(404);
		res.send({ error: "Post doesn't exist!" });
	}
});

// Delete multiple tasks by id --\\-->
router.delete('/tasks/', async (req, res) => {
	try {
		await Tasks.deleteMany({
			_id: {
				$in: req.body.ids,
			},
		});
		res.send(req.body.ids);
	} catch {
		res.status(404);
		res.send({ error: "Post doesn't exist!" });
	}
});

module.exports = router;
