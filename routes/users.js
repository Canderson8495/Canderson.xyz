const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var p = require('path');
var mysql = require('mysql');
var db = require(p.dirname(module.parent.filename) + '/config/db.js');
const { check, validationResult } = require('express-validator/check');

router.get('/register', function (req, res) {
    res.render('register', {
        title: 'Register'
    });
});


router.post('/register', [check('name').isLength({ min: 1 }).trim().withMessage('Name is required'),
    check('email').isLength({ min: 1 }).trim().withMessage('Email is required'),
    check('email').isEmail().trim().withMessage('Email is not valid'),
    check('password').isLength({ min: 1 }).withMessage('Password required'),
    check('password').custom((value, { req, loc, path }) => {
        if (value !== req.body.password2) {
            // throw error if passwords do not match
            throw new Error("Passwords do not match");
        } else {
            return value;
        }
    }).withMessage("Passwords do not match")], (req, res) => {
    console.log("enter");
    
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    var password = req.body.password;
    const password2 = req.body.password2;

    const errors = validationResult(req);

    console.log("value came back");

        if (!errors.isEmpty()) {
            var err = errors.array();
            for (var i = 0; i < err.length; i++) {
                req.flash('danger', err[i].msg);
            
            }
            res.redirect('/users/register');
    } else {
        console.log("we're here");
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) {
                    console.log(err);
                }
                password = hash;
                var sql = "INSERT INTO USER (Name, Email, Username, Password) VALUES (" + mysql.escape(name) + ", " + mysql.escape(email) + "," + mysql.escape(username) + "," + mysql.escape(password) + ");";
                console.log(sql);
                db.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("1 user inserted");
                    //req.flash('success', "Adventure Added");
                    res.redirect('/users/login');
                });
            });
        });
    }
});

router.get('/login', function (req, res) {
    res.render('login', {
        title: 'Login'
    });
})

//login process
router.post('/login', function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        successFlash: "You are now logged in.",
        //have to connect flashing ffs
        failureFlash: "The username or password was incorrect."
    })(req, res, next);
});


router.get('/logout', function (req, res) {
    console.log("i don't know what's GOING ON" +req.user.idUSER);
    req.logout();
    res.redirect('/users/login');
});


module.exports = router;