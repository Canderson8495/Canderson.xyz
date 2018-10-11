'use strict';
var express = require('express');
var router = express.Router();
var p = require('path');
var mysql = require('mysql');
var db = require(p.dirname(module.parent.filename) + '/config/db.js');


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
            adventureTitles: result,
            endBlock: "</p></strong></i></u></center></code></left></right></li></ul></ol>"
        });
    });
});

router.get('/adventures/add', function (req, res) {
    res.render('dndgmbrewadd', {
        title: 'Add Adventure'
    });
});

router.get('/adventures/:id', function (req, res) {
    var sql = "SELECT * FROM mydb.ADVENTURE WHERE idADVENTURE = " + req.params.id + ";";
    db.query(sql, function (err, result) {
        console.log(result.Title);
        if (err) throw err;
        res.render('AdventureArticle', {
            title: result[0].Title,
            author: result[0].Author,
            content: result[0].Content,
            id: req.params.id
        });
    });
});

//This is the delete function

router.get('/adventures/edit/:id', function (req, res) {
    var sql = "SELECT * FROM mydb.ADVENTURE WHERE idADVENTURE = " + req.params.id + ";";
    db.query(sql, function (err, result) {
        console.log(result.Title);
        if (err) throw err;
        res.render('edit_adventure', {
            title: "Edit an Adventure",
            adventure: result[0]
        });
    });
});

router.post('/adventures/edit/:id', function (req, res) {
        console.log('Why are we not picking this up anymore');
        var title = req.body.title;
        var author = req.body.author;
        console.log(author);
        var content = req.body.content;
        console.log(req.body.content);
        var sql = "UPDATE mydb.ADVENTURE SET Title = " + mysql.escape(title) + " , Author = " + mysql.escape(author) + " , Content = "+ mysql.escape(content) + " WHERE idADVENTURE = " +req.params.id + ";";
        console.log(sql);
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record updated");
    });
    res.redirect('/dnd/gm/adventures/' + req.params.id)

});




//Submitted Adventure ADD
router.post('/adventures/add', function (req, res) {
    console.log('Why are we not picking this up anymore');
    var title = req.body.title;
    mysql.escape()
    var author = req.body.author;
    console.log(author);
    var content = req.body.content;
    console.log(req.body.content);
    var sql = "INSERT INTO ADVENTURE (Title, Author, Content) VALUES (" + mysql.escape(title) + ", " + mysql.escape(author) + "," + mysql.escape(content) + ");";
    console.log(sql);
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        //req.flash('success', "Adventure Added");
        res.redirect('/dnd/gm/adventures');
    });
    //I have to parse SQL functions to make sure they aren't misuing my database. There is a npm for this.
});

router.post('/adventures/:id', function (req, res) {
    var sql = "DELETE FROM mydb.ADVENTURE WHERE idADVENTURE = " + req.params.id + ";";
    db.query(sql, function (err, result) {
        console.log("Log deleted");
    });
    res.redirect('/dnd/gm/adventures');
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