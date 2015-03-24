/*jslint node: true */
"use strict";

var mongoose = require('mongoose');
require('./Venue');
var Venue = mongoose.model('Venue');

/* Sample:
 {

 },
 */

mongoose.model('Event', new mongoose.Schema({
    name: { type: String, default: "" },
    date: { type: Date, null: true },
    wasOpener: { type: Boolean, default: false },
    festivalName: { type: String, default: "", null: true },
    genre: { type: String, default: "" },
    subGenre: { type: String, default: "", null: true },
    //venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue' },
    venueName: { type: String, default: "", null: false },
    venueCity: { type: String, default: "", null: false },
    venueState: { type: String, default: "", null: false },
    faceValue: { type: Number, default: null }
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
        venueName: doc.Venue,
        venueCity: doc.City,
        venueState: doc.State,
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

