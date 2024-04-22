const asyncHandeler = require('express-async-handler');
const mongoose = require('mongoose');

const Website = require('../../../../Models/Website');
const Action = require('../../../../Models/Action');
const ActionSchema = require('../../../../Models/ActionSchema');


exports.deleteWebsite = asyncHandeler(async (req, res, next) => {
    const userId = req.query.userId;
    const websiteId = req.params.id;


    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const deleted = await Website.deleteOne({
            _id: websiteId,
            userId,
        });
        if (deleted.deletedCount == 0) {
            throw new Error("Can't find this website")
        }
        const deletedActions = await Action.deleteMany({
            websiteId: websiteId,
            userId,
        });
        const deletedActionScehma = await ActionSchema.deleteMany({
            websiteId,
            userId,
        });
        await session.commitTransaction();
        res.sendStatus(200);
    } catch (error) {
        await session.abortTransaction();
        res.status(400).json({ msg: error.message });
    } finally {
        session.endSession();
    }
});
