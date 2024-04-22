const validator = require('../../../../Middlewares/validatorMiddleware');
const { query, check } = require('express-validator');
const { validateCuid } = require('../../../../Validators/ValidateCuid');
const configs = require('../../../../Configs.json');
const { extractKeys } = require('../../../../Utils/ActionUtils');

module.exports.createActionValidaotr = [
    query('userId').isString().custom(validateCuid).withMessage("Pelase enter a valid user id"),
    check('websiteId').isMongoId().withMessage("Pelase enter a valid website id"),
    check('name').isString().isLength({ min: 1, max: 50 }).withMessage("Message name must be between 1 and 50 characters."),
    check('messageShape').isString().isLength({ min: 1, max: 500 })
        .custom((data)=> extractKeys(data, false)),
    check('color').isString().isIn(Object.values(configs.actionsColorTypes))
        .withMessage("Please enter a valid color code in HEX format."),
    validator,
];
