// Require an SQL instance to be used for DB connection 
var mysql = require('mysql')

// Uses credentials to establish and maintain a DB connection 
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'hostname',
    user            : 'your_username',
    password        : 'your_password',
    database        : 'your_DB'
})

// To be used in app.js 
module.exports.pool = pool;