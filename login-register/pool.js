const mysql = require('mysql');

var pool = mysql.createPool({
    host:'db4free.net',port:3306,
    user:'todoapp19',password:'todoapp123',
    database:'todoapp19',connectionLimit:1000,
    multipleStatements:true
});

module.exports = pool;