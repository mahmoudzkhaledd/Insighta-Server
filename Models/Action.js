const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    websiteId: {
        type: mongoose.Schema.ObjectId,
        ref: "Website",
        required: true,
    },
    actionId: {
        type: mongoose.Schema.ObjectId,
        ref: "ActionSchema",
        required: true,
        index: true,
    },
    color: {
        type: String,
        default: null,
    },
    message: {
        type: String,
        default: "",
    },

}, { timestamps: true, });


module.exports = mongoose.model('Action', schema);