const Task = require('../models/task-model');
const asyncWrapper = require('../middlewares/async');

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    return res.status(200).json(tasks);
});

module.exports = {
    getAllTasks
}