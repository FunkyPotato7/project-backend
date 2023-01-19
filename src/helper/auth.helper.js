const bcrypt = require('bcrypt');

const CustomError = require("../error/CustomError");

module.exports = {

    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePasswords: async (hashPassword, password) => {
        const isPasswordsSame = await bcrypt.compare(password, hashPassword);

        if (!isPasswordsSame) {
            throw new CustomError('Wrong password', 400);
        }
    }
};