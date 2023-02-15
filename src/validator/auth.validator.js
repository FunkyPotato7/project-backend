const Joi = require("joi");

const { EMAIL } = require("../enum/regexp.enum");

module.exports = {
    createValidator: Joi.object({
        name: Joi.string().trim().required(),
        surname: Joi.string().trim().required(),
        email: Joi.string().regex(EMAIL).trim().lowercase().required()
    }),

    passwordValidator: Joi.string().trim().required(),

    loginValidator: Joi.object({
       email: Joi.string().regex(EMAIL).lowercase().trim().required(),
       password: Joi.string().required()
    })
};