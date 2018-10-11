const LocalStrategy = require('passport-local').Strategy;
var p = require('path');
var mysql = require('mysql');
var db = require(p.dirname(module.parent.filename) + '/config/db.js');
const bcrypt = require('bcryptjs');


module.exports = function (passport) {


    passport.use(new LocalStrategy(function (username, password, done) {
        // Match Username
        var sql = "SELECT * FROM mydb.USER WHERE Username = " + mysql.escape(username) + ";";
        console.log(sql);
        db.query(sql, function (err, user) {
            console.log("in the query");
            if (err) throw err;

            if (!user[0]) {
                console.log("no user found");
                return done(null, false, { message: 'No user found' });
            }
            console.log("we're here");
            //Matching password
            bcrypt.compare(password, user[0].Password, function (err, isMatch) {
                if (err) throw err;
                console.log(user[0].Password);
                console.log(password);
                if (isMatch) {
                    console.log('was that actually a mathc');
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Wrong password' });
                }
            });
        });
    }));

    passport.serializeUser(function (user, done) {
        console.log(user.idUSER);
        done(null, user[0].idUSER);
    });

    passport.deserializeUser(function (id, done) {
        var sql = "SELECT * FROM USER WHERE idUSER = " + mysql.escape(user[0].idUSER) + ";";
        console.log(sql);
        db.query(sql, function (err, user) {
            done(err, user);
        });
    });

    
}
