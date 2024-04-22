const { createWebsite } = require('./Services/CreateWebsite');
const { deleteWebsite } = require('./Services/DeleteWebsite');
const { editWebsite } = require('./Services/EditWebsite');
const { getUserWebsites } = require('./Services/getUserWebsites');
const { getWebsite } = require('./Services/getWebsite');
const { getUserWebsitesValidator, getWebsiteValidator } = require('./Validators/getUserWebsitesValidator');
const { validateUrl } = require('../../../Validators/validateUrl');
const { createWebsiteValidator } = require('./Validators/validator');

const router = require('express').Router();




router.get('/websites/:id',  getWebsiteValidator, getWebsite);

router.put('/websites/:id/edit', createWebsiteValidator, validateUrl, editWebsite);

router.delete('/websites/:id/delete',getWebsiteValidator, deleteWebsite);


router.get('/websites', getUserWebsitesValidator, getUserWebsites)
router.post('/create-website',  createWebsiteValidator, validateUrl, createWebsite)

module.exports = router;