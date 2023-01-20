const { Paid } = require('../schema');
const { paidHelper } = require("../helper");

module.exports = {
    find: async (query) => {
        const { limit = 10, page = 1 } = query;

        const filter = paidHelper.finder(query);

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
