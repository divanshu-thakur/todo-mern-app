
const { ERROR_INFO } = require('../constants/error');
const HTTP_STATUS = require('../constants/httpStatus');

class AppError extends Error {
	constructor(code, statusCode = HTTP_STATUS.BAD_REQUEST, message = null) {
		super(message || ERROR_INFO[code]);

		this.code = code;
		this.statusCode = statusCode;
	}
}

module.exports = AppError;
