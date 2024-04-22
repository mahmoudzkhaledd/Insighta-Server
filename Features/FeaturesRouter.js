const router = require('express').Router();
const websiteRouter = require('./Websites/WebsiteRoutes');

const { validateUserApiKey } = require('../Middlewares/ValidateUserApiKeyMiddleware');
const server2Routes = require('./Server/Server2Routes');
const apiRoutes = require('./Api/ApiRoutes');
const { secureServerRoutesMiddleware } = require('../Middlewares/SecureServerRoutesMiddleware');
const { appAxios } = require('../Utils/AppAxios');
const { getUserSubscription } = require('../Services/Subscription/GetUserSubscription');
router.get("/test", async (req, res, next) => {
 
    res.sendStatus(200);
})
router.use("/", websiteRouter);
router.use("/server", secureServerRoutesMiddleware, server2Routes);
router.use("/api", validateUserApiKey, apiRoutes);


module.exports = router;