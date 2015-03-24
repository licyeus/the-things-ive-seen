/*jslint node: true */
/* globals angular */
"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');

var Event = mongoose.model('Event');
var Venue = mongoose.model('Venue');

/**
 * GETs
 */
router
    .get('/', function (req, res, next) {
        res.render('index', {title: 'Express'});
    })
    .get('/api/events', function (req, res, next) {
        Event.find(function (err, events) {
            if (err) { return next(err); }

            res.json(events);
        });
    })
    .get('/api/events/:event', function (req, res, next) {
        req.event.populate('venue', function (err, event) {
            if (err) { return next(err); }

            res.json(event);
        });
    });

/**
 * POSTs
 */
router
    .post('/api/events/reset', function (req, res, next) {

        // remove all events
        Event.remove({}, function (err) {
            if (err) { return next(err); }

            // repopulate DB with seed data
            var seedDataEvents = fs.readFileSync('./data/events.tsv', 'utf8').split('\n');

            // date,name,wasOpener,festivalName,genre,subGenre,venue,city,state,faceValue
            var keys = seedDataEvents.shift().split('\t');
            var events = [];

            seedDataEvents.forEach(function (row, idx, arr) {
                var values = row.split('\t');
                var event = {};
                for (var i = 0; i < values.length; i++) {
                    var key = keys[i];
                    var val = values[i];

                    switch (key) {
                        case "wasOpener":
                            event[key] = val === "1";
                            break;
                        default:
                            event[key] = val;
                            break;
                    }
                }
                events.push(event);
            });

            // push to DB
            Event.create(events, function (err) {
                if (err) { return next(err); }

                // return all new Events
                Event.find(function (err, events) {
                    if (err) { return next(err); }

                    res.json(events);
                });
            });
        });
    });


/**
 * PARAMS
 */
router.param('event', function (req, res, next, id) {
    var query = Event.findById(id);

    query.exec(function (err, event) {
        if (err) {
            return next(err);
        }

        if (!event) {
            return next(new Error('Can\'t find event with id: ' + id));
        }
        req.event = event;
        return next();
    });
});

module.exports = router;
