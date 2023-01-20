const { authService } = require('../service');
const { tokenTypeEnum } = require("../enum");
const CustomError = require("../error/CustomError");
const { authValidator } = require("../validator");
const { authNormalizator } = require("../helper");
const { User } = require("../schema");

module.exports = {

    isRegisterBodyValid: async (req,res, next) => {
        try {
            const validate = await authValidator.registerValidator.validate(req.body);

            if (validate.error) {
                throw new CustomError(validate.error.message, 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

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

    isEmailUnique: async (req, res, next) => {
        try {
            const { email } = req.body;


            if (!email) {
                throw new CustomError('Email nor present', 400);
            }

            const user = await User.findOne({ email });

            if (user) {
                throw new CustomError('User with this email already exist', 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const accessToken = req.get('Authorization');

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
            const refreshToken = req.get('Authorization');

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

    bodyNormalizator: (req, res, next) => {

        const { name, surname } = req.body;

        req.body.name = authNormalizator.name(name);
        req.body.surname = authNormalizator.surname(surname);

        next();
    }
};