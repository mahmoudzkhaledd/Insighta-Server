const asyncHandeler = require('express-async-handler');

const Website = require('../../../../Models/Website');
const { addView } = require('../../../../Utils/WebsiteRecordUtils');

 
exports.getWebsite = asyncHandeler(async (req, res, next) => {
    const userId = req.query.userId;
    const websiteId = req.params.id;
    const website = await Website.findOne({
        _id: websiteId,
    });
    if (website == null) {
        return res.status(404).json({ msg: "Can't find the website" });
    }
    if (!website.available && website.userId != userId) {
        return res.status(404).json({ msg: "Can't find the website" });
    }
    website.visitorsHistory = addView(website.visitorsHistory ?? [], 0);

    website.visitsHistory = addView(website.visitsHistory ?? [], 0);

    await website.updateOne(JSON.parse(JSON.stringify(website)));
    res.status(200).json({ website });
});
