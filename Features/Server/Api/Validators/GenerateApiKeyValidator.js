const validator = require('../../../../Middlewares/validatorMiddleware');
const { query, check, param, } = require('express-validator');
const configs = require('../../../../Configs.json');
const { validateCuid } = require('../../../../Validators/ValidateCuid');

module.exports.generateApiKeyValidator = [
    query("userId").isString().custom(validateCuid).withMessage("Please enter valid user id."),
    check('name').isString().withMessage("Please provide valid name")
        .isLength({ min: 1, max: 100 }).withMessage("Api key name must be between 1 and 100 characters"),
    check('access').isString().isIn(configs.apiKeyAccess).withMessage("Please provide valid access to api key"),

    validator,
];
