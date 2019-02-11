const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const env = process.env.ENVIROMENT || "development";
const config = require("../config/environments/" + env);
const { respond } = require("../utils");

/**
 *
 */
exports.login = (req, res) => {
	User.findOne({ email: req.body.email })
		.then(user => {
			if (user) {
				if (
					user.isActive &&
					!user.deleted &&
					user.verifyPasswordSync(req.body.password)
				) {
					const token = jwt.sign(
						{
							_id: user.id,
							name: user.name,
							paternalSurname: user.paternalSurname,
							maternalSurname: user.maternalSurname,
							email: user.email
						},
						config.secretToken,
						{ expiresIn: "25h" }
					);
					respond(res, { token });
				} else if (user.deleted) {
					respond(res, { message: "User not found" }, 404);
				} else if (!user.verifyPasswordSync(req.body.password)) {
					respond(res, { message: "User not found" }, 404);
				} else if (!user.isActive) {
					respond(res, { message: "User is disabled" }, 422);
				}
			} else {
				respond(res, { message: "User not found" }, 404);
			}
		})
		.catch(err => {
			console.log(err);
			respond(res, err, 500);
		});
};
