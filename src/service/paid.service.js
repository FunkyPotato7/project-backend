const { Paid } = require('../schema');
const { paidHelper } = require("../helper");

module.exports = {
    find: async (query) => {
        const { page = 1, limit = 10 } = query;

        const filter = paidHelper.finder(query);


        const [data, count_on_page, total_count] = await Promise.all([
            Paid.find(filter).limit(limit).skip((page - 1) * limit),
            Paid.count(filter).limit(limit),
            Paid.count(filter)
        ]);

        return {
            data,
            page: +page,
            count_on_page,
            total_count
        };
    },
};
