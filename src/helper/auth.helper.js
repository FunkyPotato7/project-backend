const bcrypt = require('bcrypt');

const CustomError = require("../error/CustomError");
const { ACTIVATE_KEY } = require("../config/config");
const { tokenTypeEnum } = require("../enum");

module.exports = {

    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePasswords: async (hashPassword, password) => {
        if (!hashPassword || !password) {
            throw new CustomError('Password is not provided', 400);
        }

        return await bcrypt.compare(password, hashPassword);
    },

    getSecretWord: (actionType) => {
        let secretWord = '';

        switch (actionType) {
            case tokenTypeEnum.activate:
                secretWord = ACTIVATE_KEY;
                break
        }

        return secretWord;
    }
};