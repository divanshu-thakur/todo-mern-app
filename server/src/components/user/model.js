
'use strict';

const MONGOOSE = require('mongoose');
const SCHEMA = MONGOOSE.Schema;

let userSchema = new SCHEMA(
	{
		userName: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			lowercase: true,
			match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
		},
		password: {
			type: String,
			required: true,
		},
		active: {
			type: Boolean,
			default: true,
		}
	},
	{ timestamps: true }
);

let modelUser = MONGOOSE.model('user', userSchema);

module.exports = modelUser;
