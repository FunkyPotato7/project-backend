const router = require('express').Router();

const { userController } = require('../controller');
const { userMiddleware, authMiddleware } = require("../middleware");


router.get('/me',
    authMiddleware.checkAccessToken,
    userMiddleware.getUserDynamically('_user_id', 'tokenInfo', '_id'),
    userController.getOneById
);


module.exports = router;