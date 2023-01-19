const { paidService } = require('../service');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const result = await paidService.find(req.query);

            res.json(result);
        } catch (e) {
            next(e);
        }
    }
};