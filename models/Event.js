/*jslint node: true */
"use strict";

var mongoose = require('mongoose');

/* Sample:
 {
     "_id": "5510f0e237fc453742f61eb0",
     "date": "2007-06-29T07:00:00.000Z",
     "__v": 0,
     "faceValue": 12,
     "venueState": "WA",
     "venueCity": "Seattle",
     "venueName": "El Corazon",
     "subGenre": "Metal",
     "genre": "Music",
     "festivalName": "",
     "wasOpener": true,
     "name": "3 Inches of Blood"
 }
 */

mongoose.model('Event', new mongoose.Schema({
    name: { type: String, default: "" },
    date: { type: Date, null: true },
    wasOpener: { type: Boolean, default: false },
    festivalName: { type: String, default: "", null: true },
    genre: { type: String, default: "" },
    subGenre: { type: String, default: "", null: true },
    venueName: { type: String, default: "", null: false },
    venueCity: { type: String, default: "", null: false },
    venueState: { type: String, default: "", null: false },
    faceValue: { type: Number, default: null }
}));
