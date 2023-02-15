const { paidService, userService } = require('../service');
const { Comment } = require("../schema");


module.exports = {
    getAll: async (req, res, next) => {
        try {
            const { profile } = await userService.findOne({_id: req.tokenInfo._user_id})

            const result = await paidService.find(req.query, profile[0]._id);

            res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    },

    getOneById: async (req, res, next) => {
        try {
            const { _id } = req;

            const paid = await paidService.findOneById({ _id } );

            res.status(200).json(paid);
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            const { _id, body } = req;

            const { profile } = await userService.findOne({_id: req.tokenInfo._user_id});

            body._manager_id = profile[0]._id;

            if (body.status === 'Новый') {
                body._manager_id = null;
                body.comment = null;
                await Comment.deleteMany({_paid_id: _id});
            }

            await paidService.updateById({ _id }, body);

            if (body.comment) {
                await Comment.create({ _paid_id: _id, comment: body.comment });
            }

            res.status(200).json('Updated');
        } catch (e) {
            next(e);
        }
    }
};