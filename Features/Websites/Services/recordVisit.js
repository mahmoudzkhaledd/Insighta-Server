const asyncHandeler = require('express-async-handler');
const configs = require('../../../Configs.json');
const Website = require('../../../Models/Website');
const { lookup } = require('geoip-lite');
const { addView, getDeviceName, increaseMap } = require('../../../Utils/WebsiteRecordUtils');
const { getUserSubscription } = require('../../../Services/Subscription/GetUserSubscription');

exports.recordVisit = asyncHandeler(async (req, res, next) => {
    const cookie = req.cookies[configs.cookieName];

    const { url } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // const country = awaitgetUserCountry(ip);
    const country = lookup(ip)?.country;

    const parsedUrl = new URL(url);
    const website = await Website.findOne({
        url: parsedUrl.origin,
    });
    if (website == null) return res.sendStatus(200);
    const sub = await getUserSubscription(website.userId);
    if (sub == null) {
        return res.status(400).json({ message: "User is not subscribed" });
    }
    if (cookie == null) {
        website.visitors++;

        website.visitorsHistory = addView(website.visitorsHistory ?? [], website.visitorsHistory.length == 0 ? website.visitors : 1, sub?.package?.maxGraphPoints);

        res.setHeader('Set-Cookie', `${configs.cookieName}=true; Secure=true; Path=/; SameSite=None; HttpOnly`);
    }
    website.visits++;
    website.visitsHistory = addView(website.visitsHistory ?? [], website.visitsHistory.length == 0 ? website.visits : 1, sub?.package?.maxGraphPoints);

    website.pages = increaseMap(website.pages, parsedUrl.pathname);

    if (country != null) website.countries = increaseMap(website.countries, country);

    const userAgent = req.headers['user-agent'];
    const browserName = getDeviceName(userAgent);
    if (browserName != null) website.browsers = increaseMap(website.browsers, browserName)

    await website.updateOne(JSON.parse(JSON.stringify(website)));
    return res.status(200).json({
        newUser: cookie == null,
    });
});
