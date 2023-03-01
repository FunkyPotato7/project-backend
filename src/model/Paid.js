const { Schema, model } = require('mongoose');


const paidScheme = new Schema(
    {
        age: { type: Number, min: 0, max: 60, default: null },
        already_paid: { type: Number, default: null },
        course: { type: String, default: null },
        course_format: { type: String, default: null },
        course_type: { type: String, default: null },
        created_at: { type: String, required: true },
        email: { type: String, required: true },
        msg: { type: String, default: null },
        name: { type: String, default: null },
        phone: { type: String, default: null },
        status: { type: String, default: null },
        sum: { type: Number, default: null },
        surname: { type: String, default: null },
        _manager_id: { type: Schema.Types.ObjectId, ref: 'Profile', default: null }
    },

    {
        collection: 'paid',
    }

);


module.exports = model('Paid', paidScheme);
