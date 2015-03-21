/*jslint node: true */
/* globals angular */
"use strict";

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Event = mongoose.model('Event');
var Venue = mongoose.model('Venue');

/**
 * GETs
 */
router
    .get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    })
    .get('/api/events', function(req, res, next) {
        Event.find(function (err, events) {
            if(err) {return next(err); }
            res.json(events);
        });
    })
    .get('/api/events/:event', function(req, res, next) {
        req.event.populate('venue', function (err, event) {
            if(err) {return next(err); }
            res.json(event);
        });
    });


/**
 * POSTs
 */
/*router.post('/posts', function(req, res, next) {
    var post = new Post(req.body);

    post.save(function (err, post) {
        if(err) { return next(err); }
        res.json(post);
    })
});

router.post('/posts/:post/comments', function(req, res, next) {
    var comment = new Comment(req.body);
    comment.post = req.post;

    comment.save(function (err, comment) {
        if(err) { return next(err); }

        req.post.comments.push(comment);
        req.post.save(function (err, post) {
            if(err) { return next(err); }
            res.json(comment);
        });
    })
});*/

/**
 * PUTs
 */
/*router
    .put('/posts/:post/upvote', function(req, res, next) {
        req.post.upvote(function (err, post) {
            if(err) { return next(err); }
            res.json(post);
        });
    })
    .put('/posts/:post/downvote', function(req, res, next) {
        req.post.downvote(function (err, post) {
            if(err) { return next(err); }
            res.json(post);
        });
    })
    .put('/posts/:post/comments/:comment/upvote', function(req, res, next) {
        req.comment.upvote(function (err, comment) {
            if(err) { return next(err); }
            res.json(comment);
        });
    });*/

/**
 * PARAMS
 */
router.param('event', function (req, res, next, id) {
    var query = Event.findById(id);

    query.exec(function (err, event) {
        if(err) { return next(err); }

        if(!event) {
            return next(new Error('Can\'t find event with id: ' + id));
        }
        req.event = event;
        return next();
    });
});

/*router.param('post', function (req, res, next, id) {
    var query = Post.findById(id);

    query.exec(function (err, post) {
        if(err) { return next(err); }

        if(!post) {
            return next(new Error('can\'t find post'));
        }
        req.post = post;
        return next();
    });
});

router.param('comment', function (req, res, next, id) {
    var query = Comment.findById(id);

    query.exec(function (err, comment) {
        if(err) { return next(err); }

        if(!comment) {
            return next(new Error('can\'t find comment'));
        }
        req.comment = comment;
        return next();
    });
});*/

module.exports = router;
