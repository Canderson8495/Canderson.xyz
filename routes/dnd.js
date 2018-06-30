'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('dnd', { title: 'Dungeons and Dragons' });
});

module.exports = router;