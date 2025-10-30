
const Joi = require('joi');

const signUp = {
	body: Joi.object().keys({
		userName: Joi.string().required(),
		email: Joi.string().required(),
		password: Joi.string().required(),
	}),
};

const signIn = {
	body: Joi.object().keys({
		userNameOrEmail: Joi.string().required(),
		password: Joi.string().required(),
	}),
};

const updateProfile = {
	body: Joi.object().keys({
		userName: Joi.string().optional(),
		email: Joi.string().optional(),
		password: Joi.string().optional(),
	}),
};

module.exports = {
	signUp,
	signIn,
	updateProfile,
};
