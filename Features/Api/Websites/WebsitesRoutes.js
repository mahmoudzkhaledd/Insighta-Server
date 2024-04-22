const { apiAccessRolesValidator } = require('../../../Middlewares/ApiAccessRolesMiddleware');
const { createAction } = require('./Services/CreateAction');
const { getWebsiteActionsSchema } = require('./Services/GetWebsiteActionSchemas');
const { getUserWebsiteAnalytics } = require('./Services/GetWebsiteAnalytics');
const { createNewActionValidator } = require('./Validators/CreateNewAction');
const { getUserActionsValidator } = require('./Validators/GetUserActions');

const router = require('express').Router({mergeParams: true});



router.get('/analytics', apiAccessRolesValidator(["analytics"]), getUserWebsiteAnalytics);

router.get(
    '/actions/:schemaId',
    getUserActionsValidator,
    apiAccessRolesValidator(["actions"]),
    getWebsiteActionsSchema,
);


router.post(
    '/actions/:schemaId/create-action',
    createNewActionValidator,
    apiAccessRolesValidator(["actions"]),
    createAction,
);

module.exports = router;