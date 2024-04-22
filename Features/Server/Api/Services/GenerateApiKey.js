const asyncHandeler = require('express-async-handler');
const ApiKey = require('../../../../Models/ApiKey');
const configs = require('../../../../Configs.json');
const { v4: uuidv4 } = require('uuid');
exports.generateApiKey = asyncHandeler(async (req, res, next) => {
    const { userId, } = req.query;
    const { name, access } = req.body;
    const key = uuidv4();
    const userApiKey = await ApiKey.findOne({
        userId,
    });
    if (userApiKey == null) {
        const apiKey = await ApiKey.create({
            userId: userId,
            keys: [
                {
                    name,
                    apiKey: key,
                    access,
                },
            ]
        });
        return res.sendStatus(200);
    } else {
        if (userApiKey.keys.length >= configs.maxUserApiKeys) {
            return res.status(400).json({ msg: "You have already reached the maximum api keys limit." });
        }

        const obj = await userApiKey.updateOne({
            $push: {
                keys: {
                    name,
                    apiKey: key,
                    access,
                },
            }
        });
        return res.sendStatus(200);
    }


});
