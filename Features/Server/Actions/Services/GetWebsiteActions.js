const asyncHandeler = require('express-async-handler');
const ActionSchema = require('../../../../Models/ActionSchema');

exports.getWebsiteActionsSchemas = asyncHandeler(async (req, res, next) => {
    const { userId, websiteId } = req.query;
    const actions = await ActionSchema.find({
        userId,
        websiteId,
    });

    res.status(200).json({ actions });
});
