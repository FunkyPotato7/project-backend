const { authService } = require('../service');
const { tokenTypeEnum } = require("../enum");
const CustomError = require("../error/CustomError");
const { authValidator } = require("../validator");

module.exports = {

    isLoginBodyValid: async (req, res, next) => {
        try {
            const validate = await authValidator.loginValidator.validate(req.body);

            if (validate.error) {
                throw new CustomError(validate.error.message, 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            let accessToken = req.get('Authorization');

            if (!accessToken) {
                throw new CustomError('No token', 401);
            }

            authService.checkToken(accessToken);

            const tokenInfo = await authService.findToken({ accessToken });

            if (!tokenInfo) {
                throw new CustomError('Wrong token', 401);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                throw new CustomError('No token', 401);
            }

            authService.checkToken(refreshToken, tokenTypeEnum.refreshToken);

            const tokenInfo = await authService.findToken({ refreshToken });

            if (!tokenInfo) {
                throw new CustomError('Wrong token', 401);
            }

            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {
            next(e);
        }
    },

};