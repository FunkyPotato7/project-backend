const { authService } = require("../service");
const { authHelper } = require("../helper");
const { Auth, User, Profile } = require("../schema");


module.exports = {
    register: async (req, res, next) => {
        try {
            const userInfo = req.body;

            const hashedPassword = await authHelper.hashPassword(userInfo.password);

            const user = await User.create({ ...userInfo, password: hashedPassword });
            await Profile.create({ name: userInfo.name, surname: userInfo.surname, _user_id: user._id});

            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    },

    login: async (req, res, next) => {
        try {
            const { user, body } = req;

            await authHelper.comparePasswords(user.password, body.password);

            const tokenPair = authService.generateAccessTokenPair({ id: user._id });

            await Auth.create({ ...tokenPair, _user_id: user._id });

            await User.findByIdAndUpdate(user._id, { last_login: Date.now() });

            res.status(201).json({
                ...tokenPair
            });
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const { refreshToken, _user_id } = req.tokenInfo;

            await Auth.deleteOne({ refreshToken });

            const tokenPair = authService.generateAccessTokenPair({ id: _user_id });

            await Auth.create({ ...tokenPair, _user_id });

            res.status(201).json(tokenPair);
        } catch (e) {
            next(e);
        }
    },

};
