'use strict';
var express = require('express');
const say = require('say')

// Use default system voice and speed

var router = express.Router();

/* GET TTS page. */
router.get('/', function (req, res) {
    res.render('tts', {
        title: 'Annoy me'
    });
});

router.post('/', function (req, res) {
    console.log('submitted');
    console.log(req.body.ttsField);
    say.speak(req.body.ttsField);
    req.flash('success', 'The words you have typed are now blasting over my speakers');
    res.redirect('/tts');
    return;
})
module.exports = router;
