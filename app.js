const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

app.set('port', process.env.PORT)

app.listen(app.get('port'), console.log(`Server running on port : ${app.get('port')}...`));