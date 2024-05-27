
const jwtUtil = require('../utils/jwt');
const userDAL = require('../components/user/DAL');

const { ERROR_CODES } = require('../constants/error');
const AppError = require('../utils/appError');

module.exports = async (request, response, next) => {
	const authToken = request.headers['authorization'];
	if (!authToken) throw new AppError(ERROR_CODES.AUTHENTICATION_ERROR);

	let payload = jwtUtil.verifyJWT(authToken);

	let userObj = await userDAL.findById(payload.id);
	if (!userObj) throw new AppError(ERROR_CODES.AUTHENTICATION_ERROR);

	userObj = userObj.toJSON();
	delete userObj.password;

	request.userObj = userObj;

	next();
};
