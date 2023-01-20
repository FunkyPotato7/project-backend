const Joi = require("joi");

const { EMAIL } = require("../enum/regexp.enum");

module.exports = {
    registerValidator: Joi.object({
        name: Joi.string().trim().required(),
        surname: Joi.string().trim().required(),
        email: Joi.string().regex(EMAIL).lowercase().trim().required(),
        password: Joi.string().required(), // add regexp soon
        is_superuser: Joi.number().optional().min(0).max(1)
    }),

    loginValidator: Joi.object({
       email: Joi.string().regex(EMAIL).lowercase().trim().required(),
       password: Joi.string().required() // add regexp soon
    })
};