const asyncHandeler = require('express-async-handler');
const ActionSchema = require('../../../../Models/ActionSchema');
const Website = require('../../../../Models/Website');
const mongoose = require('mongoose');

exports.createAction = asyncHandeler(async (req, res, next) => {
    const { userId } = req.query;
    const { name, color, messageShape, websiteId } = req.body;


    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const ubd = await Website.updateOne({ _id: websiteId }, {
            $inc: {
                currentActions: 1,
            },
        });
        if (ubd.modifiedCount == 0) {
            throw new Error("Website not found");
        }
        const action = await ActionSchema.create({
            name,
            color,
            messageShape,
            websiteId,
            userId,
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
