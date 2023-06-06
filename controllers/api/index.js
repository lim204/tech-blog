const router = require('express').Router();

const userRoutes = require('./userRoutes');
const blogpostRoutes = require('./blogpostRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/post', blogpostRoutes);
router.use('/comment', commentRoutes);


module.exports = router;
