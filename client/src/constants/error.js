
const ERROR_CODES = {
	REQUEST_BODY_INVALID: -10100,
	REQUEST_QUERY_INVALID: -10101,
	REQUEST_PARAMS_INVALID: -10102,

	JWT_SIGNING_ERROR: -10200,
	AUTHENTICATION_ERROR: -10201,

	PASSWORD_HASHING_ERROR: -10300,
	PASSWORD_COMPARING_ERROR: -10301,

	//user error codes
	USER_NAME_TAKEN: -20100,
	EMAIL_TAKEN: -20101,
	INVALID_EMAIL: -20102,
	INVALID_USERNAME_OR_PASSWORD: -20103,
};

const ERROR_INFO = {
	[ERROR_CODES.REQUEST_BODY_INVALID]: 'Invalid body in request',
	[ERROR_CODES.REQUEST_QUERY_INVALID]: 'Invalid query in request',
	[ERROR_CODES.REQUEST_PARAMS_INVALID]: 'Invalid params in API route',

	[ERROR_CODES.JWT_SIGNING_ERROR]: 'Unable to login, try again',
	[ERROR_CODES.AUTHENTICATION_ERROR]: 'Access denied',

	[ERROR_CODES.PASSWORD_HASHING_ERROR]: 'Unable to register, try again',
	[ERROR_CODES.PASSWORD_COMPARING_ERROR]: 'Unable to login, try again',

	// user error info
	[ERROR_CODES.USER_NAME_TAKEN]: 'Username already taken',
	[ERROR_CODES.EMAIL_TAKEN]: 'An account is already associated with this email address',
	[ERROR_CODES.INVALID_EMAIL]: 'Please fill a valid email address',
	[ERROR_CODES.INVALID_USERNAME_OR_PASSWORD]: 'Invalid Username or Password',
};

module.exports = {
	ERROR_CODES,
	ERROR_INFO,
};
