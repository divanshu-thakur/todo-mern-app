
const router = require('express').Router();
const { asyncExecute, isAuthenticated } = require('../middlewares');
const controller = require('../components/user/controller');

router.post('/signUp', asyncExecute(controller.signUp));
router.post('/signIn', asyncExecute(controller.signIn));
router.post('/logout', asyncExecute(isAuthenticated), asyncExecute(controller.logout));

router.get('/profile', asyncExecute(isAuthenticated), asyncExecute(controller.getProfile));
router.put('/profile', asyncExecute(isAuthenticated), asyncExecute(controller.updateProfile));

module.exports = router;
