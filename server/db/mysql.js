const mysql = require('mysql');
const mysqlInfo = require('./password');

let connection = mysql.createConnection(mysqlInfo.mysqlInfo);
module.exports = connection;
