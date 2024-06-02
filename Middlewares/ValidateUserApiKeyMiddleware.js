const ApiKey = require('../Models/ApiKey');
const ObjectId = require('mongoose').Types.ObjectId;
const validateUserApiKey = async (req, res, next) => {

    const apiKey = req.headers['api-key'];
    const userId = req.headers['account-id'];

    if (apiKey == null || userId == null || !ObjectId.isValid(userId)) {
        return res.status(400).json({
            msg: "Not authorized",
        });
    }
    const userApiKey = await ApiKey.findById(`${userId}`);
    if (userApiKey == null) return res.status(400).json({
        msg: "Not authorized",
    });
    let keyIdx = -1;
    for (let i = 0; i < userApiKey.keys.length; i++) {
        if (userApiKey.keys[i].apiKey == apiKey) {
            keyIdx = i;
            break;
        }
    }
    if (keyIdx == -1) {
        return res.status(404).json({ msg: "Not authorized", });
    }
    userApiKey.keys[keyIdx].totalUses ++;
    userApiKey.save();
    res.locals.apiKeyModel = {
        key: userApiKey.keys[keyIdx],
        userId: userApiKey.userId,
    };
    next();
};

module.exports = {
    validateUserApiKey,
}