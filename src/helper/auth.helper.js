const bcrypt = require('bcrypt');

const CustomError = require("../error/CustomError");
const { ACTIVATE_KEY } = require("../config/config");
const { tokenTypeEnum } = require("../enum");

module.exports = {

    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePasswords: async (hashPassword, password) => {
        const isPasswordsSame = await bcrypt.compare(password, hashPassword);

        if (!isPasswordsSame) {
            throw new CustomError('Wrong password', 400);
        }
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