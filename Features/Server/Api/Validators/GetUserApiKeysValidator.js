const validator = require('../../../../Middlewares/validatorMiddleware');
const { query } = require('express-validator');
const { validateCuid } = require('../../../../Validators/ValidateCuid');
module.exports.getUserApiKeysValidator = [
    query("userId").isString().custom(validateCuid).withMessage("Please enter a valid user id."),
    validator,
];
