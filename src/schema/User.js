const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        is_active: { type: Number, default: 1},
        is_superuser: { type: Number, required: true, default: 0 },
        last_login: { type: Date, default: null }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = model('User', userSchema);