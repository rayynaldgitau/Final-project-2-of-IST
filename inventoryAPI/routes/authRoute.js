const express = require('express');
const { signup, login, forgotPassword, resetPassword } = require('../controller/auth.Controller');
const routes = express.Router();

// Signup route
routes.post('/signup', signup);

// SignIn route
routes.post('/login', login);

// Route to request a password reset
routes.post('/forgot-password', forgotPassword);

// Route to reset the password
routes.post('/reset-password/:token', resetPassword);

module.exports = routes;
