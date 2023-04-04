const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
    {
        comment: { type: String },
        _paid_id: { type: Schema.Types.ObjectId, ref: "Paid" }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = model('Comment', commentSchema);