const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
// const dashboardRoutes = require('./blogDashboardRoutes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
// router.use('/dashboard',dashboardRoutes)

module.exports = router;
