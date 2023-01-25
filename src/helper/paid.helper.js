module.exports = {

    find: (query) => {
        const {
            id, course, name, surname, email, phone, age, course_format,
            course_type, created_at, utm, msg, status, sum, already_paid
            } = query;


        let filter = {};

        if (id) {
            filter = {
                ...filter,
                _id: { $regex: id }
            }
        }

        if (course) {
            filter = {
                ...filter,
                course: { $regex: course }
            }
        }

        if (name) {
            filter = {
                ...filter,
                name: { $regex: name }
            }
        }

        if (surname) {
            filter = {
                ...filter,
                surname: { $regex: surname }
            }
        }

        if (email) {
            filter = {
                ...filter,
                email: { $regex: email }
            }
        }

        if (phone) {
            filter = {
                ...filter,
                phone: { $regex: phone }
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
                course_format: { $regex: course_format }
            }
        }

        if (course_type) {
            filter = {
                ...filter,
                course_type: { $regex: course_type }
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
                status: { $regex: status }
            }
        }

        if (sum) {
            filter = {
                ...filter,
                name: { $regex: sum }
            }
        }

        if (already_paid) {
            filter = {
                ...filter,
                already_paid: { $regex: already_paid }
            }
        }

        return filter;
    }
};
