const asyncHandeler = require('express-async-handler');
const Website = require('../../../../Models/Website');
const Action = require('../../../../Models/Action');
const ActionSchema = require('../../../../Models/ActionSchema');
const { extractKeys, replaceVariablesWithParameters } = require('../../../../Utils/ActionUtils');
const mongoose = require('mongoose');
exports.createAction = asyncHandeler(async (req, res, next) => {
    const { userId } = res.locals.apiKeyModel;
    const { websiteId, schemaId } = req.params;
    let {
        parameters,
    } = req.body;
    parameters = parameters ?? {};
    const schema = await ActionSchema.findOne({
        _id: schemaId,
        websiteId,
        userId,
    });
    if (schema == null) {
        return res.status(404).json({
            msg: "Action schema not found.",
        })
    }
    const paramsArr = extractKeys(schema.messageShape);

    if (paramsArr.length != Object.keys(parameters).length && paramsArr.length > 0) {
        return res.status(400).json({
            msg: "Parameters does not match.",
            requiredParameters: paramsArr,
        });
    }
    for (const x of paramsArr) {
        if (!Object.keys(parameters).includes(x)) {
            return res.status(400).json({
                msg: `Parameter ${x} not found in the parameters object.`,
                parameterKey: x,
            });
        }
    }






    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const web = await Website.updateOne({ _id: schema.websiteId }, {
            $inc: {
                totalSubActions: 1,
            },
        })
        if (web.modifiedCount == 0) {
            throw new Error("Website not found!");
        }
        const msgStr = replaceVariablesWithParameters(schema.messageShape, parameters);
        const action = await Action.create({
            actionId: schemaId,
            websiteId,
            userId,
            message: msgStr,
            color: schema.color,
        });

        const updated = await schema.updateOne({
            $inc: {
                subActionsCount: 1,
            }
        });

        await session.commitTransaction();

        res.status(200).json({ action });
    } catch (error) {
        await session.abortTransaction();
        res.status(400).json({ msg: error.message });
    } finally {
        session.endSession();
    }

});
