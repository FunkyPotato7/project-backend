const { groupService } = require("../service");

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const groups = await groupService.findAll();

            res.status(200).json(groups);
        } catch (e) {
            next(e);
        }
    },

    getOneById: async (req, res, next) => {
        try {
            const group = await groupService.findById(req._id);

            res.status(200).json(group);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const { name } = req.body;

            const createdGroup = await groupService.create({name})

            const group = await groupService.findById(createdGroup._id);

            res.status(201).json(group);
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            const { _id } = req;

            await groupService.update({_id}, req.body);

            const group = await groupService.findById(_id);

            res.status(200).json(group);
        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        try {
            await groupService.deleteById(req._id);

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
};
