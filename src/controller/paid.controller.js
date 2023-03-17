const excelJs = require("exceljs");
const path = require('path');

const { paidService, userService, commentService } = require('../service');
const { Profile, Paid } = require("../model");
const { pathsEnum } = require("../enum");
const colums = require("../config/colums");


module.exports = {
    getAll: async (req, res, next) => {
        try {
            const { _user_id } = req.tokenInfo;
            const { _id } = await Profile.findOne({ _user_id });

            const result = await paidService.find(req.query, _id);

            res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    },

    getOneById: async (req, res, next) => {
        try {
            const { _id } = await Paid.findById(req._id);

            const paid = await paidService.findOneById(_id);

            res.status(200).json(paid);
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            const { _id, body, tokenInfo } = req;

            const { profile } = await userService.findOne({_id: tokenInfo._user_id});

            body._manager_id = profile._id;

            if (body.status === 'New' || !body.status) {
                body._manager_id = null;
                body.comment = null;
                await commentService.deleteById({_paid_id: _id});
            }

            if (body.comment) {
                await commentService.create({ _paid_id: _id, comment: body.comment });
            }

            const newPaid = await paidService.updateById({ _id }, body);

            res.status(200).json(newPaid);
        } catch (e) {
            next(e);
        }
    },

    export: async (req, res, next) => {
        try {
            const workbook = new excelJs.Workbook();
            const worksheet = workbook.addWorksheet("Paid");

            worksheet.columns = colums;

            const { _user_id } = req.tokenInfo;
            const { _id } = await Profile.findOne({ _user_id });

            const { data } = await paidService.find(req.query, _id);


            data.forEach((paid) => {
                paid.manager = paid.manager?.name
                worksheet.addRow(paid);
            });

            worksheet.getRow(1).eachCell((cell) => {
                cell.style = {
                    alignment: {horizontal: "center"},
                    font: {bold: true}
                }
            });

            const filePath = path.join(pathsEnum.files + '/paid.xlsx');

            await workbook.xlsx.writeFile(filePath);

            res.status(200).download(filePath);
        } catch (e) {
            next(e);
        }
    },

    getStatistic: async (req, res, next) => {
        try {
            const statistic = await paidService.getStatusStatistic();

            res.status(200).json(statistic);
        } catch (e) {
            next(e);
        }
    }
};