const CustomError = require("../error/CustomError");
const { groupValidator, commonValidator } = require("../validator");

module.exports = {
    isGroupIdValid: async (req, res, next) => {
        try {
            const { id } = req.params;

            const validate = await commonValidator.idValidator.validate(id);

            if (validate.error) {
                throw new CustomError(validate.error.message, 400);
            }

            req._id = id;

            next();
        } catch (e) {
            next(e);
        }
    },

    isCreateBodyValid: async (req, res, next) => {
        try {

            const validate = groupValidator.createValidator.validate(req.body);

            if (validate.error) {
                throw new CustomError(validate.error.message, 400);
            }

            req.body = validate.value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUpdateBodyValid: async (req, res, next) => {
        try {

            const validate = groupValidator.updateValidator.validate(req.body);

            if (validate.error) {
                throw new CustomError(validate.error.message, 400);
            }

            req.body = validate.value;

            next();
        } catch (e) {
            next(e);
        }
    }
};