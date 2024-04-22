const { createAction } = require('./Services/CreateActionsSchema');
const { deleteActionSchema } = require('./Services/DeleteActionSchema');
const { getAllActionsLogs } = require('./Services/GetAllActionsLogs');
const { getWebsiteActionsSchemaById } = require('./Services/GetWebsiteActionSchema');
const { getWebsiteActionsSchemas } = require('./Services/GetWebsiteActions');
const { updateActionSchema } = require('./Services/UpdateActionSchema');
const { createActionValidaotr } = require('./Validators/CreateActionValidator');
const { getWebsiteActionsSchemasValidator } = require('./Validators/GetWebsiteActionSchemasValidator');
const { getWebsiteActionShemaValidator } = require('./Validators/GetWebsiteActionShemaValidator');
const { updateActionSchemaValidator } = require('./Validators/UpdateActionSchemaValidator');

const router = require('express').Router();
router.post('/create-schema', createActionValidaotr, createAction);
router.get('/schemas', getWebsiteActionsSchemasValidator, getWebsiteActionsSchemas);
router.get('/all', getWebsiteActionsSchemasValidator, getAllActionsLogs);
router.get('/schemas/:actionId', getWebsiteActionShemaValidator, getWebsiteActionsSchemaById);
router.delete('/schemas/:actionId', getWebsiteActionShemaValidator, deleteActionSchema);
router.put('/schemas/:actionId', updateActionSchemaValidator, updateActionSchema);

module.exports = router;