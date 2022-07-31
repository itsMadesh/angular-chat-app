const express = require('express');
const user = express.Router();
const connection = require('./connection');
user.post('/login', function (req, res) {
    connection.query('select * from user_information where user_id=?', [req.body.username], function (err, results) {
        if (err) res.status(500).send(err);
        req.session.user = results[0];
        res.sendStatus(200);
    });
});

user.delete('/logout', function (req, res) {
        req.session.user = null;
        res.sendStatus(200);
});


module.exports = user;