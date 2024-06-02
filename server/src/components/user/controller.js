
const { validateRequest } = require('../../middlewares');
const validator = require('./validator');
const service = require('./service');
const { RESPONSE_STATUS } = require('../../constants/status');

let signUp = async (request, response) => {
	validateRequest(request, validator.signUp);

	await service.signUp(request.body);

	response.json({
		status: RESPONSE_STATUS.SUCCESS,
	});
};

let signIn = async (request, response) => {
	validateRequest(request, validator.signIn);

	let authToken = await service.signIn(request.body.userNameOrEmail, request.body.password);

	response.json({
		status: RESPONSE_STATUS.SUCCESS,
		authToken,
	});
};

let getProfile = async (request, response) => {
	let userObj = request.userObj;

	response.json({
		status: RESPONSE_STATUS.SUCCESS,
		data: userObj,
	});
};

module.exports = {
	signUp,
	signIn,
	getProfile,
};
