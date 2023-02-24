const Joi = require("joi");

const { regexpEnum } = require("../enum");

module.exports = {
    updateValidator: Joi.object({
        name: Joi.string().min(2).max(20).optional(),
        surname: Joi.string().min(2).max(20).optional(),
        email: Joi.string().regex(regexpEnum.EMAIL).lowercase().trim().optional(),
        phone: Joi.string().allow('', null).optional(),
        age: Joi.number().allow(null).optional(),
        group: Joi.string().allow('', null).optional(),
        status: Joi.string().allow('', null).optional(),
        course: Joi.string().allow('', null).uppercase().optional(),
        course_format: Joi.string().allow(null),
        course_type: Joi.string().allow('', null).lowercase().optional(),
        sum: Joi.number().allow('', null).optional(),
        already_paid: Joi.number().allow('', null).optional(),
        message: Joi.string().allow('', null).optional(),
        utm: Joi.string().allow('', null).optional(),
        comment: Joi.string().allow('', null).optional(),
        _manager_id: Joi.string().allow('', null).optional()
    })
};