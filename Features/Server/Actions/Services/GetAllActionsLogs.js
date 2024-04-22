const asyncHandeler = require('express-async-handler');
const Action = require('../../../../Models/Action');
const { toNumber } = require('../../../../Utils/GeneralUtils');
const configs = require('../../../../Configs.json')
exports.getAllActionsLogs = asyncHandeler(async (req, res, next) => {
    const { userId, websiteId, page } = req.query;
    const pageNumber = parseInt(toNumber(page)) ?? 0;
    const actions = await Action.find({
        userId,
        websiteId,
    }).sort("-createdAt").skip(pageNumber * configs.maxPageItems).limit(configs.maxPageItems);

    res.status(200).json({ actions });
});
