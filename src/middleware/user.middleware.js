const User = require('../schema/User');
const CustomError = require("../error/CustomError");

module.exports = {

    getUserDynamically: (fieldName, from = 'body', dbField = fieldName) => async (req, res, next) => {
        try {
            const fieldToSearch = req[from][fieldName];

            const user = await User.findOne({ [dbField]: fieldToSearch });

            if (!user) {
                throw new CustomError('User not found', 404);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e)
        }
    },
};