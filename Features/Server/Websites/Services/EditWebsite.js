const asyncHandeler = require('express-async-handler');

const Website = require('../../../../Models/Website');

exports.editWebsite = asyncHandeler(async (req, res, next) => {
    const { name, available, userId } = req.body;
    let parsedUrl = (new URL(`${req.body.url}`)).origin;
    try {
        const website = await Website.findOneAndUpdate({
            url: parsedUrl,
            userId: userId,
        }, {
            name,
            url: parsedUrl,
            available,
        }, { new: true });
        return res.status(200).json({ website });
    } catch (ex) {

        return res.sendStatus(500);
    }
});