
const { ERROR_INFO } = require('../constants/error');

class AppError extends Error {
	constructor(code, message = null) {
		super(message || ERROR_INFO[code]);

		this.code = code;
	}
}

module.exports = AppError;
