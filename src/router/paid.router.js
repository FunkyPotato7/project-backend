const router = require('express').Router();

const { paidController } = require('../controller');
const { authMiddleware, paidMiddleware } = require('../middleware');


router.get('/', authMiddleware.checkAccessToken, paidController.getAll);

router.get('/:id', paidMiddleware.isPaidIdValid, authMiddleware.checkAccessToken, paidController.getOneById);

router.put('/:id',
    paidMiddleware.isPaidIdValid,
    paidMiddleware.isUpdateBodyValid,
    authMiddleware.checkAccessToken,
    paidController.update
);


module.exports = router;

