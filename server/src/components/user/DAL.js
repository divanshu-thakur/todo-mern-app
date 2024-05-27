
const model = require('./model');
const ObjectId = require('mongoose').Types.ObjectId;

let createUser = (data) => {
	return new model(data).save();
};

let findById = (userId) => {
	return model.findOne({ _id: userId, active: true });
};

let findByUserName = (userName) => {
	return model.findOne({ userName, active: true });
};

let findByEmail = (email) => {
	return model.findOne({ email, active: true });
};

module.exports = {
	createUser,
	findById,
	findByUserName,
	findByEmail,
};
