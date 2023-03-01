const router = require('express').Router();

const { authController } = require('../controller');
const { userMiddleware, authMiddleware  } = require('../middleware');


router.post('/login', authMiddleware.isLoginBodyValid, userMiddleware.checkUserDynamically('email'), authController.login);

router.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh);

router.post('/logout', authMiddleware.checkAccessToken, authController.logout);

router.post('/activate/:token', authMiddleware.checkActivateToken, authController.activate);


module.exports = router;
