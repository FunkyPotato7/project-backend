const { Schema, model } = require('mongoose');

const ActionTokenSchema = new Schema(
    {
        _user_id: {type: Schema.Types.ObjectId, ref: 'Users'},
        token: {type: String},
        tokenType: {type: String},
    },
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = model('ActionToken', ActionTokenSchema);