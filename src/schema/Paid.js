const { Schema, model } = require('mongoose');

const paidScheme = new Schema(
    {
        age: { type: Number, min: 0, max: 60 },
        already_paid: { type: Boolean },
        course: { type: String },
        course_format: { type: String },
        course_type: { type: String },
        created_at: { type: String, required: true },
        email: { type: String },
        msg: { type: String },
        name: { type: String },
        phone: { type: String },
        status: { type: String },
        sum: { type: Number },
        surname: { type: String },
        utm: { type: String },
    },

    {
        collection: 'paid',
    }

);


module.exports = model('Paid', paidScheme);
