'use strict';
var express = require('express');
var router = express.Router();


/* GET DND page. */
router.get('/', function (req, res) {
    res.render('dnd', { title: 'Dungeons and Dragons' });
});



/* GET  PC Toolkit menu */
router.get('/pc', function (req, res) {
    res.render('dndpc', { title: "Player's ToolKit" });
});

module.exports = router;