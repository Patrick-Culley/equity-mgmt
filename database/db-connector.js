// Require an SQL instance to be used for DB connection 
var mysql = require('mysql')

// Uses credentials to establish and maintain a DB connection 
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'your username',
    password        : 'your password',
    database        : 'cs340_culleyp'
})

// To be used in app.js 
module.exports.pool = pool;