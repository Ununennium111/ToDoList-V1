const express = require('express');
const router = express.Router();

const {
    getAllTasks,
    createTask,
    deleteTask
} = require('../controllers/tasks-controllers');

router.get('/', getAllTasks);
router.post('/', createTask);

router.delete('/:id', deleteTask);

module.exports = router;