const validator = require('../../../../Middlewares/validatorMiddleware');
const { param,check } = require('express-validator');

const isStringObject = (value) => {
    if (typeof value !== 'object' || Array.isArray(value)) {
      throw new Error('Input must be an object');
    }
  
    for (const key in value) {
      if (typeof key !== 'string' || typeof value[key] !== 'string') {
        throw new Error('Object must have string keys and string values');
      }
    }
  
    return true;
  };


module.exports.createNewActionValidator = [
    param('schemaId').isMongoId().withMessage("Pelase provide a valid website id"),
    check('parameters').isObject().custom(isStringObject).optional(),
    validator,
];
