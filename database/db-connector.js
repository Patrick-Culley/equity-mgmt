/*
Citation Scope: Creating and establishing a connection from app.js to the DB  
Date: 3/9/2023
Originality: Copied from step 1 of 'Connecting to a MySQL Database.'  
Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database
*/
// ./database/db-connector.js

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