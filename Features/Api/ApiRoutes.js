const router = require('express').Router();
const websitesRoutes = require('./Websites/WebsitesRoutes');
const validator = require('../../Middlewares/validatorMiddleware');
const { param, header } = require('express-validator');
const { subscriptionMiddleware } = require('../../Middlewares/SubscriptionMiddleware');
const { validateCuid } = require('../../Validators/ValidateCuid');

router.use(
    "/my-websites/:websiteId",
    param('websiteId').isMongoId().withMessage("Pelase provide a valid website id"),
    header('account-id').isMongoId().withMessage("Please Enter valid account id"),
    header('api-key').isUUID().withMessage("Please enter a valid api-key"),
    validator,
    subscriptionMiddleware,
    websitesRoutes,
);

module.exports = router;