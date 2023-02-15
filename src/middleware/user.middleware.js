const { userService } = require("../service");
const { userNormalizator } = require("../helper");
const CustomError = require("../error/CustomError");
const {  commonValidator } = require("../validator");

module.exports = {

    getUserDynamically: (fieldName, from = 'body', dbField = fieldName) => async (req, res, next) => {
        try {
            const fieldToSearch = req[from][fieldName];

            const user = await userService.findOne({ [dbField]: fieldToSearch });

            if (!user) {
                throw new CustomError('User not found', 404);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e)
        }
    },

    isUserIdValid: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const validate = await commonValidator.idValidator.validate(userId);

            if (validate.error) {
                throw new CustomError(validate.error.message, 400);
            }

            const user = await userService.findOneById({ _id: userId });

            if (!user) {
                throw new CustomError('Wrong ID');
            }

            req.userId = userId;

            next();
        } catch (e) {
            next(e);
        }
    },

    isEmailUnique: async (req, res, next) => {
        try {
            const { email } = req.body;

            if (!email) {
                throw new CustomError('Email is not presented', 400);
            }

            const user = await userService.findOne({ email });

            if (user) {
                throw new CustomError('User with this email already exist', 400);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    userNormalizator: (req, res, next) => {

         let { name, surname } = req.body;

         req.body.name = userNormalizator.name(name);
         req.body.surname = userNormalizator.name(surname);

         next();
    }
};