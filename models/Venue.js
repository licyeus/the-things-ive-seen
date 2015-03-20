/*jslint node: true */
"use strict";

var mongoose = require('mongoose');

var VenueSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" }
});

mongoose.model('Venue', VenueSchema);