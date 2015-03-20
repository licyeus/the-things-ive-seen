/*jslint node: true */
"use strict";

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

/* Sample:
 {
 "_id": "54114e98c9afdd5f9db37e45",
 "date": "09/03/95",
 "name": "Ramones",
 "wasOpener": "",
 "festivalName": "Bumbershoot",
 "genre": "Music",
 "subGenre": "Punk",
 "location": {
     "venue": "Memorial Stadium",
     "city": "Seattle",
     "state": "WA",
 },
 "faceValue": ""
 },
 */
var EventSchema = new Schema({
    name: String,
    date: Date,
    wasOpener: Boolean,
    festivalName: String,
    genre: String,
    subGenre: String,
    location: {
        venue: String,
        city: String,
        state: String
    },
    faceValue: Number
});

module.exports = mongoose.model('Event', EventSchema);
