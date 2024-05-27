
'use strict';

// import modules
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Cors = require('cors');

// app
const app = express();

// db
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}).then(() => console.log('Mongo connection established'))
.catch((error) => console.log('Connection error: ', error));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* using cors for enabling cross-origin requests */
app.use(
	Cors({
		origin: '*',
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
);

app.options('*', Cors());

/* adding response headers */
app.all('', function (req, res, next) {
	// jshint ignore:line
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);

	//Auth Each API Request created by user.

	next();
});

// routes
app.use(`/api`, require('./apis'));

// listener
const server = app.listen(process.env.SERVER_PORT, () =>
	console.log(`Server is running on port ${process.env.SERVER_PORT}`)
);
