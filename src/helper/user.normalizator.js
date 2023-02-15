module.exports = {
    name: (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    },

    surname: (surname) => {
        return surname.charAt(0).toUpperCase() + surname.slice(1).toLowerCase();
    }
}