const asyncHandeler = require('express-async-handler');
const ApiKey = require('../../../../Models/ApiKey');

exports.getUserApiKeys = asyncHandeler(async (req, res, next) => {
    const { userId } = req.query;
    const keys = await ApiKey.findOne({
        userId,
    });
    res.status(200).json({ apiKeys: keys });
});
