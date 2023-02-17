const { Schema, model } = require('mongoose');

const profileSchema = new Schema(
    {
        name: { type: String, required: true},
        surname: { type: String, required: true },
        _user_id: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    {
        versionKey: false
    }
);

module.exports = model('Profile', profileSchema);