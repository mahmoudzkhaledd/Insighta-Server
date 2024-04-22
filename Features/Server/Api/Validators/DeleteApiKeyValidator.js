const validator = require('../../../../Middlewares/validatorMiddleware');
const { query,param } = require('express-validator');
const configs = require('../../../../Configs.json');
const { validateCuid } = require('../../../../Validators/ValidateCuid');

module.exports.deleteApiKeyValidator = [
    query("userId").isString().custom(validateCuid).withMessage("Please enter valid userId."),
    param("id").isMongoId().withMessage("Please enter valid key Id."),
    validator,
];
