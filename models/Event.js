/*jslint node: true */
"use strict";

var mongoose = require('mongoose');

/* Sample:
 {
 "_id": "54114e98c9afdd5f9db37e45",
 "date": "09/03/95",
 "name": "Ramones",
 "wasOpener": "",
 "festivalName": "Bumbershoot",
 "genre": "Music",
 "subGenre": "Punk",
 "venue": {
     "name": "Memorial Stadium",
     "city": "Seattle",
     "state": "WA",
 },
 "faceValue": ""
 },
 */
var EventSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    date: { type: String, default: new Date() },
    wasOpener: { type: Boolean, default: false },
    festivalName: { type: String, default: "" },
    genre: { type: String, default: "" },
    subGenre: { type: String, default: "" },
    venue: {type: mongoose.Schema.Types.ObjectId, ref: 'Venue'},
    faceValue: { type: Number, default: 0 }
});

/*
EventSchema.methods.upvote = function (cb) {
    this.upvotes += 1;
    this.save(cb);
};
*/

mongoose.model('Event', EventSchema);