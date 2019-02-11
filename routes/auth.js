const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth');

router
  .post('/login', authController.login)

module.exports = router;
