const Joi = require("joi");

module.exports = {
    createValidator: Joi.object({
        name: Joi.string().min(2).max(30).required()
    }),

    updateValidator: Joi.object({
        name: Joi.string().min(2).max(30).allow('', null).optional()
    })
};