
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

let updateProfile = async (request, response) => {
	validateRequest(request, validator.updateProfile);

	let userObj = request.userObj;
	let updatedUser = await service.updateProfile(userObj._id, request.body);

	response.json({
		status: RESPONSE_STATUS.SUCCESS,
		data: updatedUser,
	});
};

let logout = async (request, response) => {
	// For future (token blacklisting)
	response.json({
		status: RESPONSE_STATUS.SUCCESS,
		message: 'Logged out successfully',
	});
};

module.exports = {
	signUp,
	signIn,
	getProfile,
	updateProfile,
	logout,
};
