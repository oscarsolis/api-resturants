const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongooseDelete = require('mongoose-delete');
const bcrypt = require('mongoose-bcrypt');
const Schema = mongoose.Schema;
const lang = require('./../config/lang/');

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, lang.validations.required]
    },
    paternalSurname: {
        type: String,
        trim: true,
        required: [true, lang.validations.required]
    },
    maternalSurname: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        required: [true, lang.validations.required],
        unique: true
    },
    phone: {
        type: String,
        trim: true,
        unique: true,
        required: [true, lang.validations.required]
    },
    isActive: {
				type: Boolean,
				default: true
    }
}, {
    versionKey: false,
    timestamps: true,
    usePushEach: true
});
UserSchema.plugin(mongooseDelete, {
    'deletedAt': true,
    'deletedBy': true,
    'overrideMethods': 'all'
});
UserSchema.plugin(uniqueValidator, {
    'message': lang.validations.unique
});
UserSchema.plugin(bcrypt);

/**
 * Statics
 */
UserSchema.statics = {
	listNotDeleted: function(options) {
    options = Object.assign({ 'deleted': false }, options);
    return this.find(options).exec();
  },
  listDeleted: function(options) {
    options = Object.assign({ 'deleted': true }, options);
    return this.find(options).exec();
  },
  listAll: function(options) {
    return this.find(options).exec();
  },
  /*findOne: function(id) {
    return this.findById(id).exec();
  }*/
};

mongoose.model('User', UserSchema);
