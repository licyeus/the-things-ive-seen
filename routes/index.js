/*jslint node: true */
"use strict";

var express = require('express');
var router = express.Router();
var config = require('../config');
var Event = require('../models/event');

/* GET home page. */
router.get('/', function (req, res) {

    // get list of first 10 events
    Event.find().lean().exec(function (err, events) {
        if (err) {
            res.send(err);
        }

        res.render('index', {
            'title': config.SITE_TITLE,
            'events': events
        });

    });
});

module.exports = router;
