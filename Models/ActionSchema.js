const mongoose = require('mongoose');
const configs = require('../Configs.json');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    subActionsCount: {
        type: Number,
        default: 0,
    },
    websiteId: {
        type: mongoose.Schema.ObjectId,
        ref: "Website",
        required: true,
    },
    color: {
        type: String,
        default: null,
    },
    messageShape: {
        type: String,
        default: "",
    },
}, { timestamps: true, });

module.exports = mongoose.model('ActionSchema', schema); 