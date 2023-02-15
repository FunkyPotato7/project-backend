const Joi = require("joi");

const { regexpEnum } = require("../enum");

module.exports = {
    updateValidator: Joi.object({
        name: Joi.string().min(2).max(20).optional(),
        surname: Joi.string().min(2).max(20).optional(),
        email: Joi.string().regex(regexpEnum.EMAIL).lowercase().trim().required(),
        phone: Joi.string().optional(),
        age: Joi.number().optional(),
        group: Joi.string().optional(),
        status: Joi.string().optional(),
        course: Joi.string().uppercase().optional(),
        course_format: Joi.string().allow(null),
        course_type: Joi.string().lowercase().optional(),
        sum: Joi.number().optional(),
        already_paid: Joi.bool().allow(''),
        message: Joi.string().optional(),
        utm: Joi.string().optional(),
        comment: Joi.string().optional(),
        _manager_id: Joi.string().optional()
    })
};