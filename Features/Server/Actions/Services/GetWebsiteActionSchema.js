const asyncHandeler = require('express-async-handler');
const ActionSchema = require('../../../../Models/ActionSchema');
const Action = require('../../../../Models/Action');
const configs = require('../../../../Configs.json');
const { toNumber } = require('../../../../Utils/GeneralUtils');
exports.getWebsiteActionsSchemaById = asyncHandeler(async (req, res, next) => {
    const { userId, websiteId, includeSubActions, page } = req.query;
    const { actionId } = req.params;
    const pageNumber = parseInt(toNumber(page)) ?? 0;
    const action = await ActionSchema.findOne({
        _id: actionId,
        userId,
        websiteId,
    });
    let subActions = null;
    if (includeSubActions == "true") {
        subActions = await Action.find({
            websiteId,
            actionId,
        }).sort('-createdAt').skip(pageNumber * configs.maxPageItems).limit(configs.maxPageItems);
    }


    res.status(200).json({ action, subActions });
});
