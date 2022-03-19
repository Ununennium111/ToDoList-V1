const express = require('express');
const router = express.Router();

const {
    getAllTasks,
    createTask
} = require('../controllers/tasks-controllers');

router.get('/', getAllTasks);
router.post('/', createTask);

module.exports = router;