const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const lang = require('./../config/lang/');

const RestaurantSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: [true, lang.validations.required]
	},
	lat: {
		type: Number,
		required: [true, lang.validations.required]
	},
	lng: {
		type: Number,
		required: [true, lang.validations.required]
	},
	email: {
		type: String,
		trim: true,
		required: [true, lang.validations.required]
	},
	phone: {
		type: String,
		trim: true,
		required: [true, lang.validations.required]
	},
	isActive: {
		type: Boolean,
		required: [true, lang.validations.required],
	}
}, {
		versionKey: false,
		timestamps: true,
		usePushEach: true
	});
RestaurantSchema.plugin(mongooseDelete, {
	'deletedAt': true,
	'deletedBy': true,
	'overrideMethods': 'all'
});

/**
 * Statics
 */
RestaurantSchema.statics = {
	listNotDeleted: function (options) {
		options = Object.assign({ 'deleted': false }, options);
		return this.find(options).exec();
	},
	listDeleted: function (options) {
		options = Object.assign({ 'deleted': true }, options);
		return this.find(options).exec();
	},
	listAll: function (options) {
		return this.find(options).exec();
	},
  /*findOne: function(id) {
    return this.findById(id).exec();
  }*/
};

mongoose.model('Restaurant', RestaurantSchema);
