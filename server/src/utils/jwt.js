
const jwt = require('jsonwebtoken');
const { ERROR_CODES } = require('../constants/error');
const AppError = require('./appError');
const HTTP_STATUS = require('../constants/httpStatus');

let signOptions = {
	expiresIn: process.env.JWT_TOKEN_EXPIRATION,
	subject: 'Todo App Authentication Token',
};

let verifyOptions = {
	subject: 'Todo App Authentication Token',
};

let generateJWT = (userObj) => {
	try {
		let payload = {
			id: userObj._id,
		};

		let token = jwt.sign(payload, process.env.JWT_SECRET_KEY, signOptions);

		return token;

	} catch (error) {
		throw new AppError(ERROR_CODES.JWT_SIGNING_ERROR, HTTP_STATUS.UNAUTHORIZED);
	}
};

let verifyJWT = (token) => {
	try {
		let payload = jwt.verify(token, process.env.JWT_SECRET_KEY, verifyOptions);

		return payload;
		
	} catch (error) {
		throw new AppError(ERROR_CODES.AUTHENTICATION_ERROR, HTTP_STATUS.UNAUTHORIZED);
	}
};

module.exports = {
	generateJWT,
	verifyJWT,
};
