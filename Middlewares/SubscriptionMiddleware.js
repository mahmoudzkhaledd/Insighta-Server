
const { getUserSubscription } = require('../Services/Subscription/GetUserSubscription');
const { validateCuid } = require('../Validators/ValidateCuid');



module.exports.subscriptionMiddleware = async (req, res, next) => {
    const userId = res.locals.apiKeyModel?.userId;

    const msg = "You are not subscribed in a package.";
    if (!validateCuid(userId, true)) {
        return res.status(400).json({
            msg: msg,
            type: "subscription",
        });
    }    
    const sub = await getUserSubscription(userId);
    if (sub?.package == null) {
        return res.status(400).json({
            msg: msg,
            type: "subscription",
        });
    }
    res.locals.subscription = sub;
    return next();
};