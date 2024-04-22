const asyncHandeler = require('express-async-handler');
const configs = require('../../../../Configs.json');
exports.getWebsiteConfigs = asyncHandeler(async (req, res, next) => {
    res.status(200).json({ configs })
});