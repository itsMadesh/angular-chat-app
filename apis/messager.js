const express = require('express');
const connection = require('./connection');
const message = express.Router();

message.get('/', function (req, res) {
    connection.query('select * from messages', function (err, results) {
        if (err) res.status(500).send(err);
        res.json({ results, me: req.session.user.user_id });
    });
});

message.post('/', function (req, res) {
    const data = [req.session.user.user_id, req.body.time, req.body.text];
    connection.query('insert into messages values(?,?,?)', data, function (err, results) {
        if (err) res.status(500).send(err);
        const msg = {"name":req.session.user.user_id,"time": req.body.time,"text":req.body.text};
        res.json({result:msg});
        io.emit('chat_message', msg);
    });
});

module.exports = message;