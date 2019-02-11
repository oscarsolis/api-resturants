const mongoose = require('mongoose');
const env = process.env.ENVIROMENT || 'development';
const config = require('../config/environments/' + env).db;
mongoose.Promise = require('bluebird');
mongoose.connect(`mongodb://${config.host}:${config.port}/${config.dbName}`, config.connection);

const db = mongoose.connection;

db.on('error', function(event) {});

db.once('open', function() {});