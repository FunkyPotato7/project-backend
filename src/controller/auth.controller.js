const { authService, userService } = require("../service");
const { authHelper } = require("../helper");
const { activate } = require("../enum/tokenType.enum");


module.exports = {

    login: async (req, res, next) => {
        try {
            const { user, body } = req;

            await authHelper.comparePasswords(user.password, body.password);

            const tokenPair = authService.generateAccessTokenPair({ id: user._id });

            await authService.createAccessTokensInfo({ ...tokenPair, _user_id: user._id });

            await userService.updateById({_id: user._id}, { last_login: Date.now() });
            
            res.status(202).json({
                user,
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const { refresh, _user_id } = req.tokenInfo;

            await authService.deleteAccessTokens({ refresh });

            const tokenPair = authService.generateAccessTokenPair({ id: _user_id });

            await authService.createAccessTokensInfo({ ...tokenPair, _user_id });

            res.status(201).json(tokenPair);
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const { accessToken } = req.tokenInfo;

            await authService.deleteAccessTokens({ accessToken });

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },

    activate: async (req, res, next) => {
        try {
            const { body } = req;

            const hashedPassword = await authHelper.hashPassword(body.password);

            await userService.updateById({ _id: body._id }, { password: hashedPassword, is_active: 1 } );

            await authService.deleteActionToken({ _user_id: body._id });

            res.status(201).json('Activated');
        } catch (e) {
            next(e);
        }
    },

    recreate: async (req, res, next) => {
        try {
            const { userId } = req;

            const actionToken = authService.generateActionToken(activate, { _id: userId } );

            await authService.createActionTokenInfo({ _user_id: userId, token: actionToken, tokenType: activate });

            res.status(201).json({ actionToken });
        } catch (e) {
            next(e);
        }
    }

};
