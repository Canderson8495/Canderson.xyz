'use strict';
var express = require('express');
var router = express.Router();
var p = require('path');
var db = require(p.dirname(module.parent.filename) + '/modules/db.js');

/* GET  GM Toolkit menu */
router.get('/', function (req, res) {
    res.render('dndgm', { title: 'GM ToolKit' });
});

router.get('/adventures', function (req, res) {
    
    var sql = "SELECT * FROM mydb.ADVENTURE;";
    db.query(sql, function (err, result) {
        var SQLTitles;
        if (err) throw err;
        res.render('dndgmbrew', {
            title: 'Home Brew Adventures',
            adventureTitles: result
        });
    });
    
});


router.get('/adventures/add', function (req, res) {
    res.render('dndgmbrewadd', {
        title: 'Add Adventure'
    });
});

//Submitted Adventure ADD
router.post('/adventures/add', function (req, res) {
    var title = req.body.title;
    var author = req.body.author;
    var content = req.body.content;
    var sql = "INSERT INTO ADVENTURE (Title, Author, Content) VALUES ('" + title + "', '" + author + "','" + content + "')";

    console.log(sql);
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
    sql = "SELECT * FROM mydb.ADVENTURE;";
    db.query(sql, function (err, result) {
        if (err) throw err;
        result.forEach(function (Adventure) {
            console.log(Adventure.Title);
        });
    });
    res.redirect('/dnd/gm/adventures')
    //I have to parse SQL functions to make sure they aren't misuing my database. There is a npm for this.
});



router.get('/encounters', function (req, res) {
    res.render('dndgmencounters', {
        title: 'Encounters'
    });
});

router.get('/gen', function (req, res) {
    res.render('dndgmencounters', {
        title: 'Generators'
    });
});




module.exports = router;