const asyncHandeler = require('express-async-handler');
const ApiKey = require('../../../../Models/ApiKey');

exports.deleteApiKey = asyncHandeler(async (req, res, next) => {
    const { userId } = req.query;
    const { id: keyId } = req.params;

    const userKeys = await ApiKey.findOne({
        userId,
    });
    if (userKeys == null) {
        return res.status(404).json({ msg: "Can't find the key." });
    }
    let keys = [...userKeys.keys];

    let keyIdx = -1;
    for (let i = 0; i < keys.length; i++) {
        if (keys[i]._id == keyId) {
            keyIdx = i;
            break;
        }
    }
    if (keyIdx == -1) {
        return res.status(404).json({ msg: "Can't find the key." });
    }
    keys.splice(keyIdx, 1)
    await userKeys.updateOne({
        keys,
    })
    res.sendStatus(200);
});
