const { Schema, model } = require('mongoose');

const groupSchema = new Schema(
    {
        name: { type: String, default: null },
    },
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = model('Group', groupSchema)
