
const { validateRequest } = require('../../middlewares');
const validator = require('./validator');
const service = require('./service');
const { RESPONSE_STATUS } = require('../../constants/status');

let signUp = async (request, response) => {
	validateRequest(request, validator.signUp);

	let userObj = await service.signUp(request.body);

	response.json({
		status: RESPONSE_STATUS.SUCCESS,
		data: userObj,
	});
};

let signIn = async (request, response) => {
	validateRequest(request, validator.signIn);

	let userObj = await service.signIn(request.body.userName, request.body.password);

	response.json({
		status: RESPONSE_STATUS.SUCCESS,
		data: userObj,
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
