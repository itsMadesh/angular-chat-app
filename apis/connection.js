const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'multichat'
});

connection.connect();

module.exports=connection;