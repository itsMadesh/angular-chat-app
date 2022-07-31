const express = require('express');
const app = express.Router();

const UserMiddleware = require('../middleware/UserMiddlerware');

app.use('/user', require('./user'));
app.use('/message', UserMiddleware.isLoggedIn, require('./messager'));

module.exports = app;