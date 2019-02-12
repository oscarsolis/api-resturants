const mongoose = require("mongoose");
const User = mongoose.model("User");
const { respond } = require("../utils");

/**
 *
 */
exports.index = async (req, res, next) => {
	try {
		let users = await User.listNotDeleted();
		respond(res, users);
	} catch (error) {
		respond(res, error, 500);
	}
};

/**
 *
 */
exports.findOne = async (req, res, next) => {
	try {
		let user = await User.findById(req.params.userId);
		!user
			? respond(res, { message: "not found user" }, 404)
			: respond(res, user);
	} catch (error) {
		console.log(error);
		respond(res, error, 500);
	}
};

/**
 *
 */
exports.new = (req, res, next) => {
	let userData = req.body;
	let user = new User(userData);
	let err = user.validateSync();
	if (err) {
		const errors = Object.keys(err.errors).map(key => err.errors[key].message);
		respond(res, { success: false, errors }, 422);
	} else {
		user
			.save()
			.then(user => respond(res, { success: true, user }, 201))
			.catch(err => {
				if (err.errors) {
					const errors = Object.keys(err.errors).map(
						key => err.errors[key].message
					);
					respond(res, { success: false, errors }, 422);
				} else {
					respond(res, { success: false, errors: err }, 500);
				}
			});
	}
};

/**
 *
 */
exports.update = (req, res, next) => {
	let data = req.body;
	let password = data.password;
	if (data.password) {
		delete data.password;
	}
	User.findOneAndUpdate({ _id: req.params.userId }, { $set: data })
		.then(user => {
			if (user) {
				if (password) {
					user.password = password;
					user
						.save()
						.then(user => respond(res, { message: "success" }))
						.catch(err => respond(res, err, 500));
				} else {
					respond(res, { message: "success" });
				}
			} else {
				respond(res, { message: "not found user" }, 404);
			}
		})
		.catch(err => {
			respond(res, err.toJSON(), err.code ? 500 : 422);
		});
};

/**
 *
 */
exports.delete = async (req, res, next) => {
	try {
		let user = await User.findOne({ _id: req.params.userId });
		if (user) {
			let userDeleted = await user.delete(req.params.userId);
			userDeleted
				? respond(res, userDeleted)
				: respond(res, { message: "not found user" }, 404);
		} else {
			respond(res, { message: "not found user" }, 404);
		}
	} catch (error) {
		respond(res, error, 500);
	}
};
