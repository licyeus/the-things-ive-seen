/*jslint node: true */
"use strict";

var mongoose = require('mongoose');

var VenueSchema = new mongoose.Schema({
    name: { type: String, default: "", null: false },
    city: { type: String, default: "", null: false },
    state: { type: String, default: "", null: false }
});

mongoose.model('Venue', VenueSchema);