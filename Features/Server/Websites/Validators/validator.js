const validator = require('../../../../Middlewares/validatorMiddleware');
const { check } = require('express-validator');
const { validateCuid } = require('../../../../Validators/ValidateCuid');



module.exports.createWebsiteValidator = [
    check('url').isString()
        .isURL({ require_tld: false }).withMessage("Invalid URL").custom((data) => {
            let url = `${data}`
            if (!url.startsWith('https://') && !url.startsWith('http://')) {
                throw new Error("URL must start with http or https");
            }
            return true
        }),
    check('available').isBoolean().optional().withMessage("Please enter valid data"),
    check('name').isString().isLength({ min: 1, max: 50 }).withMessage("Website name should be between 1 and 50 characters."),
    check('userId').isString().custom(validateCuid).withMessage("Please enter a valid user id."),
    validator,
];