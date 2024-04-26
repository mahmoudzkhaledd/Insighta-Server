const asyncHandeler = require('express-async-handler');

const Website = require('../../../../Models/Website');
const { addView } = require('../../../../Utils/WebsiteRecordUtils');
const configs = require('../../../../Configs.json');
const { getUserSubscription } = require('../../../../Services/Subscription/GetUserSubscription');

exports.getWebsite = asyncHandeler(async (req, res, next) => {
    const userId = req.query.userId;
    const withGraph = req.query.withGraph == 'true';
    const websiteId = req.params.id;
    const website = await Website.findOne({
        _id: websiteId,
    }, !withGraph ? { visitorsHistory: 0, visitsHistory: 0 } : {});
    if (website == null) {
        return res.status(404).json({ msg: "Can't find the website" });
    }
    if (!website.available && website.userId != userId) {
        return res.status(404).json({ msg: "Can't find the website" });
    }
    const sub = await getUserSubscription(website.userId);

    if (withGraph == true) {
        website.visitorsHistory = addView(website.visitorsHistory ?? [], 0, sub?.package?.maxGraphPoints);
        website.visitsHistory = addView(website.visitsHistory ?? [], 0, sub?.package?.maxGraphPoints);
        await website.updateOne(JSON.parse(JSON.stringify(website)));
    } else {
        website.visitorsHistory = [];
        website.visitsHistory = [];
    }


    res.status(200).json({ website });
});
