const { Group } = require("../model");

module.exports = {
    find: async (filter = {}) => {
        const [count, groups] = await Promise.all([
            Group.count(filter),
            Group.find(filter, {name: 1, _id: 1, createdAt: 1})
        ]);
        return {
            count,
            groups
        };
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