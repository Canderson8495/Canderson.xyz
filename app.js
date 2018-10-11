'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var p = require('path');
var mysql = require('mysql');
var db = require('./config/db.js');

const app = express();

app.use(flash());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function (req, res, next) {
    console.log(req.session)
    res.locals.user = req.isAuthenticated();
    next();
});




// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var routes = require('./routes/index');
var resume = require('./routes/resume');
var tts = require('./routes/tts');
var dnd = require('./routes/dnd');
var gm = require('./routes/gm');
var users = require('./routes/users');
app.use('/', routes);
app.use('/resume', resume);
app.use('/tts', tts);
app.use('/dnd', dnd);
app.use('/dnd/gm', gm);
app.use('/users', users);

app.set('port', 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});

