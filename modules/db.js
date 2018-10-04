var mysql = require('mysql');
var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "Canderson",
    password: "Justin98",
    database: "mydb"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;