const jwt = require('jsonwebtoken');

const { ACCESS_KEY, REFRESH_KEY } = require("../config/config");
const { tokenTypeEnum } = require("../enum");
const CustomError = require("../error/CustomError");
const { Auth } = require("../schema");


module.exports = {

    generateAccessTokenPair: (dataToSing = {}) => {
        const accessToken = jwt.sign(dataToSing, ACCESS_KEY, { expiresIn: '6h' });
        const refreshToken = jwt.sign(dataToSing, REFRESH_KEY, { expiresIn: '12h' });

        return {
            accessToken,
            refreshToken
        }
    },

    checkToken: (token = '', tokenType = tokenTypeEnum.accessToken) => {
        try {
            let key = '';

            if (tokenType === tokenTypeEnum.accessToken) key = ACCESS_KEY;
            else if (tokenType === tokenTypeEnum.refreshToken) key = REFRESH_KEY;

            return jwt.verify(token, key);
        } catch (e) {
            throw new CustomError('Token not valid', 401);
        }
    },

    findToken: (token) => {
        return Auth.findOne(token);
    }
};