module.exports = {

    find: (query, userId) => {
        const {
            _id, course, name, surname, email, phone, age, course_format, course_type,
            created_at, utm, msg, status, group, sum, already_paid, my
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

        if (created_at) {
            filter = {
                ...filter,
                created_at: { $regex: created_at }
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

        if (group) {
            filter = {
                ...filter,
                group: { $regex: group, $options: 'i' }
            }
        }

        if (sum) {
            filter = {
                ...filter,
                sum: { $eq: sum }
            }
        }

        if (already_paid) {
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
