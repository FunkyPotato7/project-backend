const { Paid } = require('../model');
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
                    $unwind: {path: "$manager", preserveNullAndEmptyArrays: true}
                },
                {
                    $unset: ["_manager_id", "comments.updatedAt", "comments._paid_id"],
                },
                {
                    $sort: sortObject
                },
                {
                    $skip:  (page - 1) * parsedLimit,
                },
                {
                    $limit: parsedLimit
                },
            ]),
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

    findOneById: async (_id) => {
        const result = await Paid.aggregate([
            {
                $match: { _id }
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
                $unwind: {path: "$manager", preserveNullAndEmptyArrays: true}
            },
            {
                $unset: ["_manager_id", "comments.updatedAt", "comments._paid_id"]
            }
       ]);
         return result[0];
    },

    updateById: async (id, newInfo) => {
        const { _id } = await Paid.findOneAndUpdate(id, newInfo);

        const result = await Paid.aggregate([
            {
                $match: { _id }
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
                $unwind: {path: "$manager", preserveNullAndEmptyArrays: true}
            },
            {
                $unset: ["_manager_id", "comments.updatedAt", "comments._paid_id"]
            }
       ]);
        return result[0];
    }
};
