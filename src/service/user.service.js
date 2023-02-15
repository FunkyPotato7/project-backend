const { User, Profile } = require("../schema");

module.exports = {

    findAll: async (filter = {}) => {
        return User.aggregate([
            {
                $match: filter
            },
            {
                $lookup: {
                    from: 'profiles',
                    localField: '_id',
                    foreignField: '_user_id',
                    as: 'profile'
                }
            },
            {
                $unset: ["updatedAt"]
            }
        ]);
    },

    findOne: async (filter = {}) => {
        const result = await User.aggregate([
            {
                $match: filter
            },
            {
                $lookup: {
                    from: 'profiles',
                    localField: '_id',
                    foreignField: '_user_id',
                    as: 'profile'
                }
            },
            {
                $unset: ["updatedAt"]
            }
        ]);

        return result[0];
    },

    findOneById: async (id) => {
        return User.findOne(id);
    },

    create: async (email, profile) => {
        const user = await User.create(email);
        await Profile.create({ ...profile, _user_id: user._id });
    },

    updateById: async (userId, newInfo) => {
        return User.updateOne(userId, newInfo);
    }

};
