const configs = require('../Configs.json');
const crypto = require('crypto');


module.exports.secureServerRoutesMiddleware = (req, res, next) => {

    const apiSecret = req.headers['api-secret'];
    const decryptedData = crypto.privateDecrypt({
        key: process.env.PRIVATE_KEY,
    }, Buffer.from(apiSecret, 'base64'));

    if (decryptedData.toString('utf8') != process.env.API_SECRET) {
        return res.status(400).json({
            msg: "Not allowed to do this operation.",
        })
    }
    return next();
};