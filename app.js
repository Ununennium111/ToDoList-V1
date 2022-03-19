const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./db/connect');
const notFound = require('./middlewares/not-found');
const tasks = require('./routes/tasks-routes');
const errorHandler = require('./middlewares/error-handler');

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandler);

app.set('port', process.env.PORT)

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        app.listen(app.get('port'), console.log(`Server running on port : ${app.get('port')}...`));
    } catch (error) {
        console.log(error);
    }
}

start();