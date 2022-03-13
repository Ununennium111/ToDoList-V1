const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./db/connect');
const notFound = require('./middlewares/not-found');

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

app.use(notFound);

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