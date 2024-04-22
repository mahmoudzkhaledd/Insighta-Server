// TODO: SECURE THIS ROUTE

const router = require('express').Router();

// let count = 0;
// router.use((req, res, next) => {
//     count++;
//     console.log(`request ${count}`);
//     next();
// })

const websitesRoutes = require('./Websites/WebsiteRoutes');
const apiRoutes = require('./Api/ApiRoutes');
const webConfigsRoutes = require('./WebsiteConfigs/WebsiteConfigsRoutes')
const actionsRoutes = require('./Actions/ActionsRoutes');

router.use("/configs", webConfigsRoutes);

router.use("/actions", actionsRoutes);
router.use("/", apiRoutes)
router.use("/", websitesRoutes);
module.exports = router;