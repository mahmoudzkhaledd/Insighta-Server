
const { recordVisit } = require('./Services/recordVisit');
const { validateUrl } = require('../../Validators/validateUrl');
const { visitValidator,  } = require('./Validators/validator');

const router = require('express').Router();

router.post('/visit', visitValidator, validateUrl, recordVisit)

module.exports = router;