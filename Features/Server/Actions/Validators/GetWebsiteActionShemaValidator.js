const validator = require('../../../../Middlewares/validatorMiddleware');
const { query,param } = require('express-validator');
const { validateCuid } = require('../../../../Validators/ValidateCuid');

module.exports.getWebsiteActionShemaValidator = [
    query('userId').isString().custom(validateCuid).withMessage("Pelase enter a valid user id"),
    query('websiteId').isMongoId().withMessage("Pelase enter a valid website id"),
    param('actionId').isMongoId().withMessage("Pelase enter a valid action id"),
    validator,
];
