const Task = require('../models/task-model');
const asyncWrapper = require('../middlewares/async');
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    return res.status(200).json(tasks);
});

const createTask = asyncWrapper(async (req, res, next) => {
    const { task } = req.body;
    const newTask = new Task({ task });

    if (!newTask.task) {
        return next(createCustomError('You must provide a task', 400));
    }

    await newTask.save();

    return res.status(200).json({msg: 'Task created'});
});

module.exports = {
    getAllTasks,
    createTask
}