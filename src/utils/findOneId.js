const { createError } = require("./createError");

const findOneId = async (Model, id, title) => {
    const data = await Model.findById(id);
    if (!data) {
        throw createError(404, 'error', `${title} not found`, null);
    }
    return data;
};

module.exports = findOneId;
