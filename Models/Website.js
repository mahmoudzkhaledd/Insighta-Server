const mongoose = require('mongoose');
const countriesSchema = require('./CountriesSchema');
const pagesSchema = require('./PagesSchema');

const pointSchema = new mongoose.Schema({
    count: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        required: true,
    },
});
const schema = new mongoose.Schema({
    url: {
        type: String,
        required: [true, "URL is required"],
        index: true,
        unique: true,
    },
    name: {
        type: String,
        required: [true, "Website name is required"],
    },
    totalSubActions: {
        type: Number,
        default: 0,
    },
    currentActions: {
        type: Number,
        default: 0,
    },
    available: {
        type: Boolean,
        default: false,
    },
    visitors: {
        type: Number,
        default: 0,
    },
    visits: {
        type: Number,
        default: 0,
    },
    visitsHistory: {
        type: [pointSchema],
        default: [],
    },
    visitorsHistory: {
        type: [pointSchema],
        default: [],
    },
    countries: {
        type: Map,
        of: Number,
        default: new Map()
    },
    browsers: {
        type: Map,
        of: Number,
        default: new Map()
    },
    operatinySystem: {
        type: Map,
        of: Number,
        default: new Map()
    },
    pages: {
        type: Map,
        of: Number,
        default: new Map()
    },
    userId: {
        type: String,
        required: [true, "User Id is required"],
    },

}, { timestamps: true, });

module.exports = mongoose.model('Website', schema);