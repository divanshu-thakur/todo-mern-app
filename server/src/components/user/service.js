
const validator = require("validator");
const DAL = require('./DAL');
const bcryptUtil = require('../../utils/bcrypt');
const jwtUtil = require('../../utils/jwt');
const AppError = require('../../utils/appError');
const { ERROR_CODES } = require('../../constants/error');

let signUp = async (data) => {
	let duplicateUserObj = await DAL.findByUserName(data.userName);
	if (duplicateUserObj) throw new AppError(ERROR_CODES.USER_NAME_TAKEN);

	// let regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/; // regex to validate email
	if (!validator.isEmail(data.email)) throw new AppError(ERROR_CODES.INVALID_EMAIL);

	duplicateUserObj = await DAL.findByEmail(data.email);
	if (duplicateUserObj) throw new AppError(ERROR_CODES.EMAIL_TAKEN);

	let hashedPassword = await bcryptUtil.hashPassword(data.password);

	let createUserObj = {
		userName: data.userName,
		email: data.email,
		password: hashedPassword,
	};

	await DAL.createUser(createUserObj);

	return;
};

let signIn = async (userNameOrEmail, password) => {
	let userObj = await DAL.findByUserNameOrEmail(userNameOrEmail);

	if (userObj) {
		let didPasswordMatch = await bcryptUtil.comparePassword(password, userObj.password);

		if (didPasswordMatch) {
			let token = jwtUtil.generateJWT(userObj);
			return token;
		} else {
			throw new AppError(ERROR_CODES.INVALID_USERNAME_OR_PASSWORD);
		}
	} else {
		// Cause a delay to avoid brute force attacks.
		let fakePass = 'somePassword';
		await bcryptUtil.comparePassword(password, fakePass);

		throw new AppError(ERROR_CODES.INVALID_USERNAME_OR_PASSWORD);
	}
};

let updateProfile = async (userId, updateData) => {
	// Validate email if being updated
	if (updateData.email) {
		// let regex = /^\\w+([\\.\\-]?\\w+)*@\\w+([\\.\\-]?\\w+)*(\\.\\w{2,3})+$/;
		if (!validator.isEmail(updateData.email)) throw new AppError(ERROR_CODES.INVALID_EMAIL);
		
		let duplicateUserObj = await DAL.findByEmailExcludingUser(updateData.email, userId);
		if (duplicateUserObj) throw new AppError(ERROR_CODES.EMAIL_TAKEN);
	}

	// Validate username if being updated
	if (updateData.userName) {
		let duplicateUserObj = await DAL.findByUserNameExcludingUser(updateData.userName, userId);
		if (duplicateUserObj) throw new AppError(ERROR_CODES.USER_NAME_TAKEN);
	}

	// Hash password if being updated
	if (updateData.password) {
		updateData.password = await bcryptUtil.hashPassword(updateData.password);
	}

	let updatedUser = await DAL.updateUser(userId, updateData);
	delete updatedUser.password;
	return updatedUser;
};

module.exports = {
	signUp,
	signIn,
	updateProfile,
};
