const router = require('express').Router();

const { authController } = require('../controller');
const { userMiddleware, authMiddleware  } = require('../middleware');


router.post('/login', authMiddleware.isLoginBodyValid, userMiddleware.getUserDynamically('email'), authController.login);

router.post('/refresh', authMiddleware.checkRefreshToken, authController.refresh);


module.exports = router;
