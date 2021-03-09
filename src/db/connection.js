const mysql = require('mysql');

const dbconnection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'admin',
    database: 'agenda_petshop'
});

module.exports = dbconnection;