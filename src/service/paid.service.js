const { Paid } = require('../model');
const { paidHelper } = require("../helper");

module.exports = {
    find: async (query, userId, groupId) => {
        const { page = 1, limit = '10', order = '_id' } = query;

        const parsedLimit = parseInt(limit);
        const filter = await paidHelper.find(query, userId, groupId);
        const sortObject = paidHelper.sort(order);

        const [data, count_on_page, total_count] = await Promise.all([
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
                    $lookup: {
                        from: 'groups',
                        localField: '_group_id',
                        foreignField: '_id',
                        as: 'group'
                    }
                },
                {
                    $unwind: {path: "$manager", preserveNullAndEmptyArrays: true}
                },
                {
                    $unwind: {path: "$group", preserveNullAndEmptyArrays: true}
                },
                {
                    $unset: ["_manager_id", "_group_id", "group.updatedAt", "group.createdAt", "comments.updatedAt", "comments._paid_id"],
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
            Paid.count(filter),
        ]);

        return {
            data,
            page: +page,
            count_on_page,
            total_count,
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
                $lookup: {
                    from: 'groups',
                    localField: '_group_id',
                    foreignField: '_id',
                    as: 'group'
                }
            },
            {
                $unwind: {path: "$manager", preserveNullAndEmptyArrays: true}
            },
            {
                $unwind: {path: "$group", preserveNullAndEmptyArrays: true}
            },
            {
                $unset: ["_manager_id", "_group_id", "group.updatedAt", "group.createdAt", "comments.updatedAt", "comments._paid_id"],
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
                $lookup: {
                    from: 'groups',
                    localField: '_group_id',
                    foreignField: '_id',
                    as: 'group'
                }
            },
            {
                $unwind: {path: "$manager", preserveNullAndEmptyArrays: true}
            },
            {
                $unwind: {path: "$group", preserveNullAndEmptyArrays: true}
            },
            {
                $unset: ["_manager_id", "_group_id", "group.updatedAt", "group.createdAt", "comments.updatedAt", "comments._paid_id"],
            }
       ]);
        return result[0];
    },

    getStatusStatistic: async () => {
        const result = await Paid.aggregate([
            {
                $group: {
                    _id: {
                        status: {
                            $cond: [
                                { $or: [{ $eq: ["$status", "New"] }, { $eq: ["$status", null] }] },
                                "Free",
                                "$status"
                            ]
                        }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: null,
                    total_count: { $sum: "$count" },
                    status_count: { $push: { status: "$_id.status", count: "$count" } }
                }
            },
            {
                $addFields: {
                    "status_count": {
                        $concatArrays: [
                            "$status_count",
                            {
                                $map: {
                                    input: {
                                        $setDifference: [
                                            ["Agree", "Disagree", "Doubling", "Free", "In work"],
                                            "$status_count.status"
                                        ]
                                    },
                                    as: "status",
                                    in: {
                                        status: "$$status",
                                        count: 0
                                    }
                                }
                            }
                        ],
                    },
                }
            },
            {
                $unwind: "$status_count"
            },
            {
                $sort: {
                    "status_count.status": 1,
                }
            },
            {
                $group: {
                    _id: null,
                    status_count: { $push: "$status_count"},
                    total_count: { $first: "$total_count" }
                }
            },
            {
                $project: {
                    _id: 0,
                    status_count: "$status_count",
                    total_count: 1
                }
            },
        ]);

        return result[0];
    }
};
