const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        email: { type: String, trim: true, lowercase: true, required: true },
        password: { type: String, default: null },
        is_active: { type: Number, default: 0 },
        is_superuser: { type: Number, default: 0 },
        last_login: { type: Date, default: null }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = model('User', userSchema);