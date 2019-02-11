const env = process.env.ENVIROMENT || "development";
const mongoose = require("mongoose");
const User = mongoose.model("User");

/**
 *
 */
exports.authJwt = async (jwtPayload, next) => {
	try {
		const user = await User.findById(jwtPayload._id);
		user ? next(null, user) : next(null, false);
	} catch (error) {
		next(null, false);
	}
};

/**
 *
 */
exports.cors = (req, res, next) => {
	let origin;
	origin = req.header("Origin", "*");
	if (origin === "null") {
		origin = "*";
	}
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.header(
		"Access-Control-Allow-Headers",
		"Authorization, Content-Type, X-Requested-With, X-Session-Id"
	);
	res.header("Access-Control-Expose-Headers", "Location, X-Session-Id");
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Max-Age", 86400);
		return res.sendStatus(200);
	}
	return next();
};

/**
 * Middleware para las rutas no existentes
 */
exports.notFound = (req, res, next) => {
	let err = new Error("Not Found");
	err.status = 404;
	next(err);
};

/**
 *
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.unknownError = (err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};
	res.status(err.status || 500);
	res.json(res.locals);
};
