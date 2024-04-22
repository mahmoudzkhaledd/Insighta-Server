const mongoose = require('mongoose');
const configs = require('../Configs.json');
const schemaKey = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    apiKey: {
        type: String,
        unique: true,
        index: true,
        required: true,
    },
    totalUses: {
        type: Number,
        default: 0,
    },
    access: {
        type: String,
        enum: configs.apiKeyAccess,
        required: true,
    },
    valid: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true, });

const schema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true,
    },
    keys: {
        type: [schemaKey],
        default: [],
    }
}, { timestamps: true, });

module.exports = mongoose.model('ApiKey', schema);