const { Categories } = require('../models/index');

const create = async (name) => Categories.create({ name });
const findAll = async () => Categories.findAll();

module.exports = { create, findAll };
