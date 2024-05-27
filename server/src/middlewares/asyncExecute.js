
// function to execute controllers asynchronously
const { RESPONSE_STATUS } = require('../constants/status');
const AppError = require('../utils/appError');

module.exports = (controller) => {
	return async (request, response, next) => {
		try {
			await controller(request, response, next);
		} catch (error) {
			if (!(error instanceof AppError)) {
				console.log(error);
				return response.json({
					status: RESPONSE_STATUS.ERROR,
					code: '500',
					message: 'INTERNAL SERVER ERROR',
				});
			} else {
				return response.json({
					status: RESPONSE_STATUS.ERROR,
					code: error.code,
					message: error.message,
				});
			}
		}
	};
};
