const router = require('express').Router();
const websitesRoutes = require('./Websites/WebsitesRoutes');
const validator = require('../../Middlewares/validatorMiddleware');
const { param } = require('express-validator');
const { subscriptionMiddleware } = require('../../Middlewares/SubscriptionMiddleware');

router.use(
    "/my-websites/:websiteId",
    param('websiteId').isMongoId().withMessage("Pelase provide a valid website id"),
    validator,
    subscriptionMiddleware,
    websitesRoutes,
);

module.exports = router;