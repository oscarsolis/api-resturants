const express = require('express');
const router = express.Router();
const passport = require('passport');
const restaurantController = require('../controllers/restaurant');
const passportAuth = passport.authenticate('jwt', { session: false });

router
	.get('/', passportAuth, restaurantController.index)
	.get('/:restaurantId', passportAuth, restaurantController.findOne)
	.post('/', passportAuth, restaurantController.new)
	.put('/:restaurantId', passportAuth, restaurantController.update)
	.delete('/:restaurantId', passportAuth, restaurantController.delete)

module.exports = router;
