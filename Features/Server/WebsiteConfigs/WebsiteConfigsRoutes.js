const { getWebsiteConfigs } = require('./Services/GetWebsiteConfigs');

const router = require('express').Router();
router.get('/', getWebsiteConfigs);
module.exports = router;