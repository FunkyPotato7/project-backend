const { userService, authService } = require("../service");
const { activate } = require("../enum/tokenType.enum");

module.exports = {

    getAll: async (req, res, next) => {
        try {
            const result = await userService.findAll();

            res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    },

    getOneById: async (req, res, next) => {
        try {
            const { user } = req;

            res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const { email, name, surname } = req.body;

            await userService.create({ email }, {name, surname} );

            const user = await userService.findOne({ email });

            const actionToken = await authService.generateActionToken(activate, { _id: user._id });

            await authService.createActionTokenInfo({ _user_id: user._id, token: actionToken, tokenType: activate });

            res.status(201).json({
                user,
                actionToken
            });
        } catch (e) {
            next(e);
        }
    }
};