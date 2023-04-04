const Joi = require("joi");

const { regexpEnum } = require("../enum");

module.exports = {
    updateValidator: Joi.object({
        name: Joi.string().max(20).allow('', null).optional(),
        surname: Joi.string().max(20).allow('', null).optional(),
        email: Joi.string().regex(regexpEnum.EMAIL).lowercase().trim().allow('', null).optional(),
        phone: Joi.string().allow('', null).optional(),
        age: Joi.number().max(99).allow('', null).optional(),
        group: Joi.string().allow('', null).optional(),
        status: Joi.string().equal("Agree", "Disagree", "In work", "Doubling", "New").allow(null).optional(),
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