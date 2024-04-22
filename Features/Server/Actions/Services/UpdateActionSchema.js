const asyncHandeler = require('express-async-handler');
const ActionSchema = require('../../../../Models/ActionSchema');

exports.updateActionSchema = asyncHandeler(async (req, res, next) => {
    const { userId, websiteId } = req.query;
    const { actionId } = req.params;
    const { name, color, messageShape } = req.body;
    const action = await ActionSchema.updateOne({
        _id: actionId,
        userId,
        websiteId,
    }, {
        name,
        color,
        messageShape,
    });

    res.status(action.modifiedCount == 0 ? 400 : 200).json({  msg: action.modifiedCount == 0 ? "Error occured, please try again later." : null });
});
