const asyncHandeler = require('express-async-handler');
const Website = require('../../../../Models/Website');
exports.getUserWebsiteAnalytics = asyncHandeler(async (req, res, next) => {
    const userId = res.locals.apiKeyModel.userId;
    const websiteId = req.params.websiteId;
    const website = await Website.findOne({
        userId,
        _id: websiteId,
    });
    if (website == null) return res.status(404).json({
        msg: "Website not found!",
    })
    res.status(200).json({ website });
});
