const validator = require('../../../../Middlewares/validatorMiddleware');
const { query } = require('express-validator');
const { validateCuid } = require('../../../../Validators/ValidateCuid');

module.exports.getWebsiteActionsSchemasValidator = [
    query('userId').isString().custom(validateCuid).withMessage("Pelase enter a valid user id"),
    query('websiteId').isMongoId().withMessage("Pelase enter a valid website id"),
    validator,
];
