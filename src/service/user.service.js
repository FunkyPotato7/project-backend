const { User, Profile } = require("../model");

module.exports = {

    findAll: async (filter = {}) => {
        return User.aggregate([
            {
                $match: filter
            },
            {
                $lookup: {
                    from: "profiles",
                    localField: "_id",
                    foreignField: "_user_id",
                    as: "profile",
                }
            },
            {
                $unwind: "$profile"
            },
            {
                $unset: ["profile._user_id"]
            },
            {
                $lookup: {
                    from: "paid",
                    localField: "profile._id",
                    foreignField: "_manager_id",
                    pipeline: [
                        {
                            $match: {
                                $and: [
                                    { status: { $ne: null } },
                                ]
                            }
                        },
                        {
                            $group: {
                                _id: "$status",
                                count: { $sum: 1 }
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                total_count: { $sum: "$count" },
                                status_count: { $push: {  status: "$_id", count: "$count"} }
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
                                                        ["Agree", "Disagree", "Doubling", "In work"],
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
                            $sort: { "status_count.status": 1 }
                        },
                        {
                            $group: {
                                _id: 0,
                                total_count: { $first: "$total_count" },
                                status_count: { $push: "$status_count" },
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                total_count: 1,
                                status_count: 1
                            }
                        },
                    ],
                    as: "orders"
                }
            },
            {
                $unwind: { path: "$orders", preserveNullAndEmptyArrays: true }
            },
            {
                $project: {
                    _id: 1,
                    email: 1,
                    password: 1,
                    is_active: 1,
                    is_superuser: 1,
                    last_login: 1,
                    createdAt: 1,
                    profile: 1,
                    orders: {
                        $ifNull: ["$orders", {
                            total_count: 0,
                            status_count: [
                                {
                                    status: "Agree",
                                    count: 0
                                },
                                {
                                    status: "Disagree",
                                    count: 0
                                },
                                {
                                    status: "Doubling",
                                    count: 0
                                },
                                {
                                    status: "In work",
                                    count: 0
                                }]
                        }]
                    }
                }
            },
        ]);
    },

    findOne: async (filter = {}) => {
        const result = await User.aggregate([
            {
                $match: filter
            },
            {
                $lookup: {
                    from: "profiles",
                    localField: "_id",
                    foreignField: "_user_id",
                    as: "profile",
                }
            },
            {
                $unwind: "$profile"
            },
            {
                $unset: ["profile._user_id"]
            },
            {
                $lookup: {
                    from: "paid",
                    localField: "profile._id",
                    foreignField: "_manager_id",
                    pipeline: [
                        {
                            $match: {
                                $and: [
                                    { status: { $ne: null } },
                                ]
                            }
                        },
                        {
                            $group: {
                                _id: "$status",
                                count: { $sum: 1 }
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                total_count: { $sum: "$count" },
                                status_count: { $push: {  status: "$_id", count: "$count"} }
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
                                                        ["Agree", "Disagree", "Doubling", "In work"],
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
                            $sort: { "status_count.status": 1 }
                        },
                        {
                            $group: {
                                _id: 0,
                                total_count: { $first: "$total_count" },
                                status_count: { $push: "$status_count" },
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                total_count: 1,
                                status_count: 1
                            }
                        },
                    ],
                    as: "orders"
                }
            },
            {
                $unwind: { path: "$orders", preserveNullAndEmptyArrays: true }
            },
            {
                $project: {
                    _id: 1,
                    email: 1,
                    password: 1,
                    is_active: 1,
                    is_superuser: 1,
                    last_login: 1,
                    createdAt: 1,
                    profile: 1,
                    orders: {
                        $ifNull: ["$orders", {
                            total_count: 0,
                            status_count: [
                                {
                                    status: "Agree",
                                    count: 0
                                },
                                {
                                    status: "Disagree",
                                    count: 0
                                },
                                {
                                    status: "Doubling",
                                    count: 0
                                },
                                {
                                    status: "In work",
                                    count: 0
                                }]
                        }]
                    }
                }
            },
        ]);

        return result[0];
    },

    findOneById: async (id) => {
        return User.findById(id);
    },

    create: async (email, profile) => {
        const user = await User.create(email);
        await Profile.create({ ...profile, _user_id: user._id });
    },

    updateById: async (userId, newInfo) => {
        const { _id } = await User.findOneAndUpdate(userId, newInfo);

        const result = await User.aggregate([
            {
                $match: { _id }
            },
            {
                $lookup: {
                    from: "profiles",
                    localField: "_id",
                    foreignField: "_user_id",
                    as: "profile",
                }
            },
            {
                $unwind: "$profile"
            },
            {
                $unset: ["profile._user_id"]
            },
            {
                $lookup: {
                    from: "paid",
                    localField: "profile._id",
                    foreignField: "_manager_id",
                    pipeline: [
                        {
                            $match: {
                                $and: [
                                    { status: { $ne: null } },
                                ]
                            }
                        },
                        {
                            $group: {
                                _id: "$status",
                                count: { $sum: 1 }
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                total_count: { $sum: "$count" },
                                status_count: { $push: {  status: "$_id", count: "$count"} }
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
                                                        ["Agree", "Disagree", "Doubling", "In work"],
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
                            $sort: { "status_count.status": 1 }
                        },
                        {
                            $group: {
                                _id: 0,
                                total_count: { $first: "$total_count" },
                                status_count: { $push: "$status_count" },
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                total_count: 1,
                                status_count: 1
                            }
                        },
                    ],
                    as: "orders"
                }
            },
            {
                $unwind: { path: "$orders", preserveNullAndEmptyArrays: true }
            },
            {
                $project: {
                    _id: 1,
                    email: 1,
                    password: 1,
                    is_active: 1,
                    is_superuser: 1,
                    last_login: 1,
                    createdAt: 1,
                    profile: 1,
                    orders: {
                        $ifNull: ["$orders", {
                            total_count: 0,
                            status_count: [
                                {
                                    status: "Agree",
                                    count: 0
                                },
                                {
                                    status: "Disagree",
                                    count: 0
                                },
                                {
                                    status: "Doubling",
                                    count: 0
                                },
                                {
                                    status: "In work",
                                    count: 0
                                }]
                        }]
                    }
                }
            },
        ]);
        return result[0]
    }

};
