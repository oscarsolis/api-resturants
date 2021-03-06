const mongoose = require("mongoose");
const Restaurant = mongoose.model("Restaurant");
const { respond, registerLog } = require("../utils");

/**
 *
 */
exports.index = async (req, res, next) => {
	try {
		const restaurants = await Restaurant.listNotDeleted();
		respond(res, { success: true, restaurants });
	} catch (error) {
		respond(res, error, 500);
	}
};

/**
 *
 */
exports.findOne = async (req, res, next) => {
	try {
		const restaurant = await Restaurant.findOne({
			_id: req.params.restaurantId,
			deleted: false
		});
		!restaurant
			? respond(res, { success: false, message: "not found Restaurant" }, 404)
			: respond(res, { success: true, restaurant });
	} catch (error) {
		respond(res, error, 500);
	}
};

/**
 *
 */
exports.new = (req, res, next) => {
	const restaurantData = req.body;
	const restaurant = new Restaurant(restaurantData);
	const error = restaurant.validateSync();
	if (error) {
		const errors = Object.keys(error.errors).map(
			key => error.errors[key].message
		);
		respond(res, { success: false, errors }, 422);
	} else {
		restaurant
			.save()
			.then(restaurant => respond(res, { success: true, restaurant }, 200))
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
exports.update = async (req, res, next) => {
	try {
		const data = req.body;
		const restaurant = await Restaurant.findOneAndUpdate(
			{
				_id: req.params.RestaurantId
			},
			{
				$set: data
			},
			{
				new: true
			}
		);
		restaurant
			? respond(res, restaurant)
			: respond(res, { message: "not found Restaurant" }, 404);
	} catch (error) {
		respond(res, err.toJSON(), err.code ? 500 : 422);
	}
};

/**
 *
 */
exports.delete = async (req, res, next) => {
	try {
		const restaurant = await Restaurant.findOne({
			_id: req.params.restaurantId,
			deleted: false
		});
		if (restaurant) {
			const restaurantDeleted = await restaurant.delete(
				req.params.restaurantId
			);
			restaurantDeleted
				? respond(res, { success: true, restaurant: restaurantDeleted })
				: respond(
						res,
						{ success: false, message: "not found Restaurant" },
						404
				  );
		} else {
			respond(res, { success: false, message: "not found Restaurant" }, 404);
		}
	} catch (error) {
		console.log(error);
		respond(res, error, 500);
	}
};
