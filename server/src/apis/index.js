
const router = require('express').Router();

// all api routes
router.use('/user', require('./user'));

module.exports = router;
