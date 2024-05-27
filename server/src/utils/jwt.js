
const jwt = require('jsonwebtoken');
const { ERROR_CODES } = require('../constants/error');
const AppError = require('./appError');

let options = {
	expiresIn: process.env.JWT_TOKEN_EXPIRATION,
	subject: 'Todo App Authentication Token',
};

let generateJWT = (userObj) => {
	try {
		let payload = {
			id: userObj._id,
		};

		let token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options);

		return token;

	} catch (error) {
		throw new AppError(ERROR_CODES.JWT_SIGNING_ERROR);
	}
};

let verifyJWT = (token) => {
	try {
		let payload = jwt.verify(token, process.env.JWT_SECRET_KEY, options);

		return payload;
		
	} catch (error) {
		throw new AppError(ERROR_CODES.AUTHENTICATION_ERROR);
	}
};

module.exports = {
	generateJWT,
	verifyJWT,
};
