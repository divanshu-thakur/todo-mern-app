
const bcrypt = require('bcryptjs');
const { ERROR_CODES } = require('../constants/error');
const AppError = require('./appError');

let hashPassword = async (password) => {
	try {
		let salt = Number(process.env.SECRET_SALT) || 10;
		let hash = await bcrypt.hash(password, salt);

		return hash;

	} catch (error) {
		throw new AppError(ERROR_CODES.PASSWORD_HASHING_ERROR);
	}
};

let comparePassword = async (inputPassword, storedPassword) => {
	try {
		let result = await bcrypt.compare(inputPassword, storedPassword);

		return result;
		
	} catch (error) {
		throw new AppError(ERROR_CODES.PASSWORD_COMPARING_ERROR);
	}
};

module.exports = {
	hashPassword,
	comparePassword,
};
