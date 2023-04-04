const { Comment } = require("../model");

module.exports = {
    create: async (data) => {
        return Comment.create(data);
    },

    deleteById: async (id) => {
        return Comment.deleteMany(id);
    }
};