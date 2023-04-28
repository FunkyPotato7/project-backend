const { Group } = require("../model");
const {sanitizeFilter} = require("mongoose");

module.exports = {
    findAll: async (filter = {}) => {
        const [count, groups] = await Promise.all([
            Group.count(filter),
            Group.find(filter, {name: 1, _id: 1, createdAt: 1})
        ]);
        return {
            count,
            groups
        };
    },

    findOne: async (filter = {}) => {
        return Group.findOne(filter);
    },

    findById: async (id) => {
        return Group.findById(id, {name: 1, _id: 1, createdAt: 1});
    },

    create: async (name) => {
        return Group.create(name);
    },

    update: async (id, data) => {
        return Group.updateOne(id, data);
    },

    deleteById: async (id) => {
        return Group.findByIdAndDelete(id);
    }
};