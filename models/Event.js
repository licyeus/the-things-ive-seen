/*jslint node: true */
"use strict";

var mongoose = require('mongoose');
require('./Venue');
var Venue = mongoose.model('Venue');

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

mongoose.model('Event', new mongoose.Schema({
    name: { type: String, default: "" },
    date: { type: Date, null: true },
    wasOpener: { type: Boolean, default: false },
    festivalName: { type: String, default: "", null: true },
    genre: { type: String, default: "" },
    subGenre: { type: String, default: "", null: true },
    venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue' },
    faceValue: { type: Number, default: 0.0, null: true }
}));
var Event = mongoose.model('Event');

Event.schema.static('fromOldDoc', function (doc) {

    var getFloatPrice = function (priceStr) {
        if(!priceStr) { return null; }

        priceStr = priceStr.replace('$', '');
        return parseFloat(priceStr);
    };

    var newEvent = new Event({
        name: doc.Name,
        date: doc.Date ? new Date(doc.Date) : null,
        wasOpener: doc.WasOpener !== "" ? false : !!doc.WasOpener,
        festivalName: doc.FestivalName || null,
        genre: doc.Genre,
        subGenre: doc.SubGenre || null,
        venue: new Venue({
            name: doc.Venue,
            city: doc.City,
            state: doc.State
        }),
        faceValue: getFloatPrice(doc.FaceValue)
    });

    return newEvent;
});


/*
EventSchema.methods.upvote = function (cb) {
    this.upvotes += 1;
    this.save(cb);
};
*/

