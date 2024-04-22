const { deleteApiKey } = require('./Services/DeleteApiKey');
const { generateApiKey } = require('./Services/GenerateApiKey');
const { getUserApiKeys } = require('./Services/GetUserApiKeys');
const { updateApiKey } = require('./Services/UpdateApiKey');
const { deleteApiKeyValidator } = require('./Validators/DeleteApiKeyValidator');
const { generateApiKeyValidator } = require('./Validators/GenerateApiKeyValidator');
const { getUserApiKeysValidator } = require('./Validators/GetUserApiKeysValidator');
const { updateApiKeyValidator } = require('./Validators/UpdateApiKeyValidator');

const router = require('express').Router();

router.delete('/api-keys/:id', deleteApiKeyValidator, deleteApiKey);


router.get('/api-keys', getUserApiKeysValidator, getUserApiKeys);

router.put('/api-keys/:id', updateApiKeyValidator, updateApiKey);

router.post('/generate-key', generateApiKeyValidator, generateApiKey);
module.exports = router;