const router = require('express').Router();

const { groupController } = require("../controller");
const { authMiddleware, groupMiddleware } = require("../middleware");


router.get('/', authMiddleware.checkAccessToken, groupController.getAll);

router.post('/', groupMiddleware.isCreateBodyValid, authMiddleware.checkAccessToken, groupController.create);

router.get('/:id', groupMiddleware.isGroupIdValid, authMiddleware.checkAccessToken, groupController.getOneById);

router.put('/:id', groupMiddleware.isGroupIdValid, groupMiddleware.isUpdateBodyValid, authMiddleware.checkAccessToken, groupController.update);

router.delete('/:id', groupMiddleware.isGroupIdValid, authMiddleware.checkAccessToken, groupController.delete);


module.exports = router;
