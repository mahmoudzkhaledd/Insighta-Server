const asyncHandeler = require('express-async-handler');
const Action = require('../../../../Models/Action');
const ActionSchema = require('../../../../Models/ActionSchema');
const Website = require('../../../../Models/Website');
const mongoose = require('mongoose');
exports.deleteActionSchema = asyncHandeler(async (req, res, next) => {
    const { userId, websiteId } = req.query;
    const { actionId } = req.params;

    const session = await mongoose.startSession();
    session.startTransaction();
    try {

        const deleted = await ActionSchema.findOneAndDelete({
            _id: actionId,
            userId,
            websiteId,
        });
        if (deleted == null) {
            throw new Error("Can't find this action.");
        }
        const updWebsite = await Website.updateOne({
            _id: websiteId,
        }, {
            $inc: {
                currentActions: -1,
                totalSubActions: -1 * deleted.subActionsCount,
            },
        });
        if (updWebsite.modifiedCount == 0) {
            throw new Error("Can't find the webiste specified");
        }
        const subDeleted = await Action.deleteMany({
            actionId: actionId,
            userId,
            websiteId,
        });
        // if (deleted.subActionsCount != subDeleted.deletedCount) {
        //     throw new Error("Error in deleting subactions.");
        // }

        await session.commitTransaction();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        await session.abortTransaction();
        res.status(400).json({ msg: error.message });
    } finally {
        session.endSession();
    }
});
