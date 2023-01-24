const normalize = (paid) => {
    return {
        id: paid._id,
        name: paid.name
    }
};

const normalizeMany = (paids) => {
    return paids.map(paid => normalize(paid));
};

module.exports = {
    normalize,
    normalizeMany
};