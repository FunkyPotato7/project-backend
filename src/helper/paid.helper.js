const CustomError = require("../error/CustomError");

module.exports = {

    find: async (query, userId, groupId) => {
        let {
            _id, course, name, surname, email, phone, age, course_format, course_type,
            utm, msg, status, sum, already_paid, my, start_date, end_date, num
        } = query;


        let filter = {};

        if (_id) {
            filter = {
                ...filter,
                _id: _id
            }
        }

        if (course) {
            filter = {
                ...filter,
                course: course
            }
        }

        if (name) {
            filter = {
                ...filter,
                name:  { $regex: name, $options: 'i' }
            }
        }

        if (surname) {
            filter = {
                ...filter,
                surname: { $regex: surname, $options: 'i' }
            }
        }

        if (email) {
            filter = {
                ...filter,
                email: { $regex: email, $options: 'i' }
            }
        }

        if (phone) {
            filter = {
                ...filter,
                phone: { $regex: phone.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') }
            }
        }

        if (age) {
            if (isNaN(age)) {
                throw new CustomError('field "age" must be a number', 400);
            }

            filter = {
                ...filter,
                age: { $eq: +age }
            }
        }

        if (course_format) {
            filter = {
                ...filter,
                course_format: course_format
            }
        }

        if (course_type) {
            filter = {
                ...filter,
                course_type: course_type
            }
        }

        if (utm) {
            filter = {
                ...filter,
                utm: { $regex: utm }
            }
        }

        if (msg) {
            filter = {
                ...filter,
                msg: { $regex: msg }
            }
        }

        if (status) {
            filter = {
                ...filter,
                status: status
            }
        }

        if (groupId) {
            filter = {
                ...filter,
                _group_id: groupId
            }
        }

        if (sum) {
            if (isNaN(sum)) {
                throw new CustomError('field "sum" must be a number', 400);
            }

            filter = {
                ...filter,
                sum: { $eq: sum }
            }
        }

        if (already_paid) {
            if (isNaN(already_paid)) {
                throw new CustomError('field "already_paid" must be a number', 400);
            }

            filter = {
                ...filter,
                already_paid: { $eq: already_paid }
            }
        }

        if (my === 'true') {
            filter = {
                ...filter,
                _manager_id: userId
            }

        }

        if (start_date && end_date) {
            start_date = new Date(start_date);
            end_date = new Date(end_date);

            const isoStartDate = start_date.toISOString();
            const isoEndDate = end_date.toISOString();

            filter = {
                ...filter,
                created_at: {
                    $gte: isoStartDate,
                    $lte: isoEndDate
                }
            }
        }

        return filter;
    },

    sort: (order) => {
        let sortObject = {[order]: 1};

        if (order.slice(0, 1) === '-') {
            sortObject = {[order.slice(1)]: -1}
        }

        return sortObject;
    }
};
