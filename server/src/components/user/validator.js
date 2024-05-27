
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
		userName: Joi.string().required(),
		password: Joi.string().required(),
	}),
};

module.exports = {
	signUp,
	signIn,
};
