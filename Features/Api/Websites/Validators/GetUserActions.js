const validator = require('../../../../Middlewares/validatorMiddleware');
const { param } = require('express-validator');

module.exports.getUserActionsValidator = [
    param('schemaId').isMongoId().withMessage("Pelase provide a valid website id"),

    validator,
];
