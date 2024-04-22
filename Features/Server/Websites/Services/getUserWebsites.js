const asyncHandeler = require('express-async-handler');

const Website = require('../../../../Models/Website');


exports.getUserWebsites = asyncHandeler(async (req, res, next) => {
    const userId = req.query.userId;
    const websites = await Website.find({
        userId,
    });
    res.status(200).json({ websites });
});
