const { Paid } = require('../schema');
const { paidHelper } = require("../helper");

module.exports = {
    find: async (query) => {
        const { page = 1, limit = 10, order = '_id' } = query;

        const filter = paidHelper.find(query);
        const sortObject = paidHelper.sort(order);


        const [data, count_on_page, total_count] = await Promise.all([
            Paid.find(filter).sort(sortObject).limit(limit).skip((page - 1) * limit),
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
