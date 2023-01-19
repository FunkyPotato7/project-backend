const router = require('express').Router();

const { paidController } = require('../controller');
const { authMiddleware } = require('../middleware');


router.get('/', authMiddleware.checkAccessToken, paidController.getAll);


module.exports = router;

