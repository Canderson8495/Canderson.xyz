const LocalStrategy = require('passport-local').Strategy;
var p = require('path');
var mysql = require('mysql');
var db = require('../config/db.js');
const bcrypt = require('bcryptjs');


module.exports = function (passport) {


    passport.use(new LocalStrategy(function (username, password, done) {

        if (username.length == 0 || password.length == 0) {
            return done(null, false, { type: 'danger', message: 'Please input all credentials' });
        }
        // Match Username
        var sql = "SELECT * FROM mydb.USER WHERE Username = " + mysql.escape(username) + ";";
        db.query(sql, function (err, user) {
            if (err) throw err;

            if (!user[0]) {
                return done(null, false, { type: 'danger', message: 'The username or password was incorrect' });
            }
            //Matching password
            bcrypt.compare(password, user[0].Password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    console.log('MATCH FOUND');
                    console.log(user[0].idUSER + "  " + user[0].Username);
                    return done(null, user[0], { type: 'success', message: 'You are now logged in' });
                } else {
                    return done(null, false, { type: 'danger', message: 'The username or password was incorrect' });
                }
            });
        });
    }));

    passport.serializeUser(function (user, done) {
        done(null, user.idUSER);
    });

    passport.deserializeUser(function (id, done) {
        var sql = "SELECT * FROM USER WHERE idUSER = " + mysql.escape(id) + ";";
        console.log(sql);
        db.query(sql, function (err, user) {
            done(err, user[0]);
        });
    });
}
