
const jwtUtil = require('../utils/jwt');
const userDAL = require('../components/user/DAL');

const { ERROR_CODES } = require('../constants/error');
const AppError = require('../utils/appError');
const HTTP_STATUS = require('../constants/httpStatus');

module.exports = async (request, response, next) => {
	let authToken = request.headers['authorization'];
	if (!authToken) throw new AppError(ERROR_CODES.AUTHENTICATION_ERROR, HTTP_STATUS.UNAUTHORIZED);
	
	// Extract token from "Bearer <token>"
	authToken = authToken.split(' ')[1];

	// Sometimes local storage or client sends literally "null" or the token wrapped in quotes
	if (!authToken || authToken === 'null' || authToken === 'undefined') {
		throw new AppError(ERROR_CODES.AUTHENTICATION_ERROR, HTTP_STATUS.UNAUTHORIZED);
	}
	authToken = authToken.replace(/^"|"$/g, '');

	let payload = jwtUtil.verifyJWT(authToken);

	let userObj = await userDAL.findById(payload.id);
	if (!userObj) throw new AppError(ERROR_CODES.AUTHENTICATION_ERROR, HTTP_STATUS.UNAUTHORIZED);

	userObj = userObj.toJSON();
	delete userObj.password;

	request.userObj = userObj;

	next();
};
