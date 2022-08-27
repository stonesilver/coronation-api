const router = require('express').Router();
const User = require('../models/Users');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const { registerUser, loginUser } = require('../controllers/authController');

// Register user route
router.post('/register', registerUser);

// Login user route
router.post('/login', loginUser);

module.exports = router;
