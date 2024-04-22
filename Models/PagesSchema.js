const mongoose = require('mongoose');
const pagesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Website name is required"],
    },
    count: {
        type: Number,
        default: 0,
    },
}, { timestamps: true, });
module.exports = pagesSchema;