const { paidValidator, commonValidator} = require("../validator");
const CustomError = require("../error/CustomError");

module.exports = {

    isPaidIdValid: async (req, res, next) => {
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

    isUpdateBodyValid: async (req, res, next) => {
        try {

            const validate = paidValidator.updateValidator.validate(req.body);

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