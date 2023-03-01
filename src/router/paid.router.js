const router = require('express').Router();

const { paidController } = require('../controller');
const { authMiddleware, paidMiddleware, userMiddleware} = require('../middleware');


router.get('/',
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserDynamically('_user_id', 'tokenInfo', '_id'),
    paidController.getAll
);

router.get('/excel',
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserDynamically('_user_id', 'tokenInfo', '_id'),
    paidController.export
);

router.get('/statistic',
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserDynamically('_user_id', 'tokenInfo', '_id'),
    paidController.getStatistic
);

router.get('/:id',
    paidMiddleware.isPaidIdValid,
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserDynamically('_user_id', 'tokenInfo', '_id'),
    paidController.getOneById
);

router.put('/:id',
    paidMiddleware.isPaidIdValid,
    paidMiddleware.isUpdateBodyValid,
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserDynamically('_user_id', 'tokenInfo', '_id'),
    paidController.update
);


module.exports = router;

