const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const env = process.env.ENVIROMENT || 'development';
const config = require('./config/environments/' + env);
const fs = require('fs');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

fs.readdirSync(path.join(__dirname, 'models')).forEach(file => require(`./models/${file}`));

const middleware = require('./middleware/middleware');

const strategy = new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secretToken
}, middleware.authJwt);

passport.use(strategy);

const app = express();

app.use(passport.initialize());

const index = require('./routes/index');
const auth = require('./routes/auth');
const users = require('./routes/users');
const restaurant = require('./routes/restaurant');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(middleware.cors);
app.use('/', index);
app.use('/users', users);
app.use('/auth', auth);
app.use('/restaurants', restaurant);
app.use(middleware.notFound);
app.use(middleware.unknownError);

module.exports = app;
