const validator = require('../../../../Middlewares/validatorMiddleware');
const { query,param } = require('express-validator');
const { validateCuid } = require('../../../../Validators/ValidateCuid');

module.exports.getUserWebsitesValidator = [
    query("userId").isString().custom(validateCuid).withMessage("Please enter a valid user id."),
    validator,
];
module.exports.getWebsiteValidator = [
    query("userId").isString().custom(validateCuid).optional().withMessage("Please enter a valid user id."),
    param("id").isMongoId(),
    validator,
];
