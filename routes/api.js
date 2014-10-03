/*jslint node: true */
"use strict";

var express = require('express');
var router = express.Router();
var Event = require('../models/event');

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


/* GET users listing. */
router.get('/', function (req, res) {
//    res.send('respond with a resource');
    res.json({ message: 'hooray! welcome to our api!' });

});


router.route('/events')

    // create an event (accessed at POST http://localhost:3000/api/events)
    .post(function(req, res) {

        console.log('POST to /api/events');
        console.dir(req.body);

        var event = new Event(); 		// create a new instance of the Event model
        event.name = req.body.name;  // set the events name (comes from the request)

        // save the event and check for errors
        event.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Event created!' });
        });

    })

    // get all the events (accessed at GET http://localhost:3000/api/events)
    .get(function(req, res) {
        Event.find(function(err, events) {
            if (err)
                res.send(err);

            res.json(events);
        });
    });

router.route('/events/:event_id')

    // get the event with that id (accessed at GET http://localhost:3000/api/events/:event_id)
    .get(function(req, res) {
        Event.findById(req.params.event_id, function(err, event) {
            if (err)
                res.send(err);
            res.json(event);
        });
    })

    // update the event with this id (accessed at PUT http://localhost:8080/api/events/:event_id)
    .put(function(req, res) {

        // use our event model to find the event we want
        Event.findById(req.params.event_id, function(err, event) {

            if (err)
                res.send(err);

            event.name = req.body.name; 	// update the events info

            // save the event
            event.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Event updated!' });
            });

        });
    })

    // delete the event with this id (accessed at DELETE http://localhost:3000/api/events/:event_id)
    .delete(function(req, res) {
        Event.remove({
            _id: req.params.event_id
        }, function(err, event) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


module.exports = router;
