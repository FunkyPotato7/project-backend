const { Paid } = require('../schema');
const { paidHelper } = require("../helper");

module.exports = {
    find: async (query, userId) => {
        const { page = 1, limit = '10', order = '_id' } = query;

        const parsedLimit = parseInt(limit);

        const filter = paidHelper.find(query, userId);
        const sortObject = paidHelper.sort(order);

        let [data, count_on_page, total_count] = await Promise.all([
            Paid.aggregate([
                {
                    $match: filter,
                },
                {
                    $lookup: {
                        from: 'comments',
                        localField: '_id',
                        foreignField: '_paid_id',
                        as: 'comments',
                    },
                },
                {
                    $lookup: {
                        from: 'profiles',
                        localField: '_manager_id',
                        foreignField: '_id',
                        as: 'manager'

                    }
                },
                {
                    $unset: ["manager_id", "comments.updatedAt", "comments._paid_id"]
                },
            ]).sort(sortObject).limit(parsedLimit).skip((page - 1) * parsedLimit),
            Paid.count(filter).limit(parsedLimit),
            Paid.count(filter)
        ]);


        return {
            data,
            page: +page,
            count_on_page,
            total_count
        };
    },

    findOneById: async (id) => {

        const p = await Paid.find(id);

        return Paid.aggregate([
            {
                $match: {_id: p[0]._id}
            },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: '_paid_id',
                    as: 'comments'
                }
            },
            {
                $lookup: {
                    from: 'profiles',
                    localField: '_manager_id',
                    foreignField: '_id',
                    as: 'manager'
                }
            },
            {
                $unset: ["manager_id", "comments.updatedAt", "comments._paid_id"]
            },
       ])
    },

    updateById: async (id, newInfo) => {
       return Paid.updateOne(id, newInfo);
    }
};
