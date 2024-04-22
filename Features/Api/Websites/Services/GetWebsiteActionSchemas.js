const asyncHandeler = require('express-async-handler');
const Action = require('../../../../Models/Action');
const { toInt } = require('../../../../Utils/GeneralUtils');
const configs = require('../../../../Configs.json');
exports.getWebsiteActionsSchema = asyncHandeler(async (req, res, next) => {
    const { userId } = res.locals.apiKeyModel;
    let { websiteId, schemaId, page } = req.params;
    page = toInt(page) ?? 0;

    const actions = await Action.find({
        _id: schemaId,
        userId,
        websiteId,
    }).skip(page * configs.maxPageItems)
        .limit(configs.maxPageItems);

    res.status(200).json({ actions });
});
