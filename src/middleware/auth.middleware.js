const CustomError = require("../error/CustomError");
const { authService, userService } = require('../service');
const { authHelper } = require("../helper");
const { authValidator } = require("../validator");
const { tokenTypeEnum } = require("../enum");

module.exports = {

    isCreateBodyValid: async (req, res, next) => {
        try {

            const validate = await authValidator.createValidator.validate(req.body);

            if (validate.error) {
                throw new CustomError(validate.error.message, 400);
            }

            req.body = validate.value;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkLoginBody: async (req, res, next) => {
        try {
            const { body } = req;

            const validate = await authValidator.loginValidator.validate(body);

            if (validate.error) {
                throw new CustomError(validate.error.message, 400);
            }

            const user = await userService.findOne({email: body.email});

            if (!user) {
                throw new CustomError(`Wrong email or password`, 400);
            }

            const isPasswordsSame = await authHelper.comparePasswords(user.password, body.password);

            if (!isPasswordsSame) {
                throw new CustomError(`Wrong email or password`, 400);
            }

            req.body = validate.value;

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

            authService.checkAccessToken(accessToken);

            const tokenInfo = await authService.findAccessTokens({ accessToken });

            if (!tokenInfo) {
                throw new CustomError('Wrong access token', 401);
            }

            req.tokenInfo = tokenInfo;

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

            authService.checkAccessToken(refreshToken, tokenTypeEnum.refresh);

            const tokenInfo = await authService.findAccessTokens({ refreshToken });

            if (!tokenInfo) {
                throw new CustomError('Wrong refresh token', 401);
            }

            req.tokenInfo = tokenInfo;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkActivateToken: async (req, res, next) => {
        try {
            const { token } = req.params;

            if (!token) {
                throw new CustomError('No token', 400);
            }

            authService.checkActionToken(token, tokenTypeEnum.activate);

            const tokenInfo = await authService.findActionToken({ token, tokenType: tokenTypeEnum.activate });

            if (!tokenInfo) {
                throw new CustomError('Wrong Token', 401);
            }

            req.body._id = tokenInfo._user_id;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkPermission: async (req, res, next) => {
        try {
            const { _user_id } = req.tokenInfo;

            const user = await userService.findOne({ _id: _user_id });

            if (!user) {
                throw new CustomError('User is not exist', 404);
            }

            if (user.is_superuser !== 1) {
                throw new CustomError('Permission denied', 403);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};