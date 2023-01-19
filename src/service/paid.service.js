const { Paid } = require('../schema');

module.exports = {
    find: async (query) => {
        const { limit = 10, page = 1, name, age } = query;

        let filter = {};

        if (name) {
            filter = {
                ...filter,
                name: { $regex: name }
            }
        }

        if (age) {
            filter = {
                ...filter,
                age: { $eq: age }
            }
        }

        const [data, count] = await Promise.all([
            Paid.find(filter).limit(limit).skip((page - 1) * limit),
            Paid.count(filter).limit(limit),
        ]);

        return {
            data,
            page: +page,
            count
        };
    },
};
