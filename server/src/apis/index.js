
const router = require('express').Router();

// all api routes
router.use('/user', require('./user'));
router.use('/todos', require('./todo'));

module.exports = router;
