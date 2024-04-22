const asyncHandeler = require('express-async-handler');
const ApiKey = require('../../../../Models/ApiKey');
const configs = require('../../../../Configs.json');

exports.updateApiKey = asyncHandeler(async (req, res, next) => {
    const { userId } = req.query;
    const { id: keyId } = req.params;
    const { name, access } = req.body;

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
    keys[keyIdx].name = name;
    keys[keyIdx].access = access;
    await userKeys.updateOne({
        keys: keys,
    })
    res.sendStatus(200);

});
