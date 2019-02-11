const mongoose = require("mongoose");
const Restaurant = mongoose.model("Restaurant");
const { respond, registerLog } = require("../utils");

/**
 *
 */
exports.index = async (req, res, next) => {
	try {
		const restaurants = await Restaurant.listNotDeleted();
		respond(res, restaurants);
	} catch (error) {
		respond(res, error, 500);
	}
};

/**
 *
 */
exports.findOne = async (req, res, next) => {
	try {
		const restaurant = await Restaurant.findById(req.params.RestaurantId);
		!restaurant
			? respond(res, { message: "not found Restaurant" }, 404)
			: respond(res, restaurant);
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
		respond(res, error, 422);
	} else {
		restaurant
			.save()
			.then(result => respond(res, { success: true }, 200))
			.catch(err => respond(res, err.toJSON(), err.code ? 500 : 422));
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
			_id: req.params.restaurantId
		});
		if (restaurant) {
			const restaurantDeleted = await restaurant.delete(
				req.params.restaurantId
			);
			restaurantDeleted
				? respond(res, restaurantDeleted)
				: respond(res, { message: "not found Restaurant" }, 404);
		} else {
			respond(res, { message: "not found Restaurant" }, 404);
		}
	} catch (error) {
		console.log(error);
		respond(res, error, 500);
	}
};
