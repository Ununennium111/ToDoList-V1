const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
    task: {
        type: String,
        required: [true, 'You must provide a task'],
        trim: true,
        maxlength: [25, 'The task cannot be more than 25 characters']
    }
});

module.exports = model('Task', TaskSchema)