
const AppError = require('../utils/appError');
const { ERROR_CODES } = require('../constants/error');

module.exports = (request, validator) => {
	let { params, query, body } = request;
	let returnObj = {};

	if (validator.params) {
		let result = validator.params.validate(params, { convert: false });
		if (result.error) throw new AppError(ERROR_CODES.REQUEST_PARAMS_INVALID, result.error);

		returnObj.params = params;
	}

	if (validator.query) {
		let result = validator.query.validate(query, { convert: true });
		if (result.error) throw new AppError(ERROR_CODES.REQUEST_QUERY_INVALID, result.error);

		returnObj.query = result.value;
	}

	if (validator.body) {
		let result = validator.body.validate(body, { convert: false, allowUnknown: false, stripUnknown: { arrays: true, objects: false } });
		if (result.error) throw new AppError(ERROR_CODES.REQUEST_BODY_INVALID, result.error);

		returnObj.body = result.value;
	}

	return returnObj;
};
