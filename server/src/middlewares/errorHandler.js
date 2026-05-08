// Express global error handler
const { RESPONSE_STATUS } = require('../constants/status');
const AppError = require('../utils/appError');
const HTTP_STATUS = require('../constants/httpStatus');

module.exports = (error, request, response, next) => {
	if (!(error instanceof AppError)) {
		console.log(error);
		return response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
			status: RESPONSE_STATUS.ERROR,
			code: '500',
			message: 'INTERNAL SERVER ERROR',
		});
	} else {
		return response.status(error.statusCode).json({
			status: RESPONSE_STATUS.ERROR,
			code: error.code,
			message: error.message,
		});
	}
};
