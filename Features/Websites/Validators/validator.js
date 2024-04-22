const validator = require('../../../Middlewares/validatorMiddleware');
const { check } = require('express-validator');

module.exports.visitValidator = [
    check('url').isString()
        .isURL({ require_tld: false }).withMessage("Invalid URL").custom((data) => {

            let url = `${data}`
            if (!url.startsWith('https://') && !url.startsWith('http://')) {
                throw new Error("URL must start with http or https");
            }
            return true
        }),
    validator,
];
