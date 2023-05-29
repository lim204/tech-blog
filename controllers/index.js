const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = ('./blogDashboardRoutes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use ('/dashboard', dashboardRoutes);

module.exports = router;