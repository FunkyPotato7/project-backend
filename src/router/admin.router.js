const router = require('express').Router();

const { userController, authController} = require("../controller");
const { authMiddleware, userMiddleware } = require("../middleware");


router.get('/users', authMiddleware.checkAccessToken, authMiddleware.checkPermission, userController.getAll);

router.post('/create',
    authMiddleware.isCreateBodyValid,
    authMiddleware.checkAccessToken,
    authMiddleware.checkPermission,
    userMiddleware.isEmailUnique,
    userMiddleware.userNormalizator,
    userController.create
);

router.put('/users/:userId',
    userMiddleware.isUserIdValid,
    authMiddleware.checkAccessToken,
    authMiddleware.checkPermission,
    authMiddleware.dontBanYourSelf,
    authController.block
);

router.get('/users/:userId/re_token',
    userMiddleware.isUserIdValid,
    authMiddleware.checkAccessToken,
    authMiddleware.checkPermission,
    authController.recreate
);


module.exports = router;