
const router = require('express').Router();
const { isAuthenticated } = require('../middlewares');
const controller = require('../components/user/controller');

router.post('/signUp', controller.signUp);
router.post('/signIn', controller.signIn);
router.post('/logout', isAuthenticated, controller.logout);

router.get('/profile', isAuthenticated, controller.getProfile);
router.put('/profile', isAuthenticated, controller.updateProfile);

module.exports = router;
