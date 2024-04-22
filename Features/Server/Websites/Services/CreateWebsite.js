const asyncHandeler = require('express-async-handler');

const Website = require('../../../../Models/Website');
exports.createWebsite = asyncHandeler(async (req, res, next) => {
    const { name, userId } = req.body;
    let parsedUrl = (new URL(`${req.body.url}`)).origin;
   
    try {
        const website = await Website.create({
            name, url: parsedUrl, userId,
        });
        return res.status(200).json({ website });
    } catch (ex) {
        if (ex.code == 11000) {
            return res.status(405).json({ msg: "Website already exists" });
        }
        return res.sendStatus(500);
    }
});