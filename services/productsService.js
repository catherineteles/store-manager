const Joi = require('joi');
const products = require('../models/products');

const productService = {
  list: async () => {
    const productList = await products.getAll();

    return productList;
  },

  getById: async (id) => {
    const product = await products.getById(id);

    return product;
  },

  validateBody: async (params) => {
    const schema = Joi.object({
      name: Joi.string().min(5).required(),
    });

    const { error, value } = schema.validate(params);

    if (error) throw error;

    return value;
  },

  create: async ({ name }) => {
    const id = await products.create({ name });
    return id;
  },
};

module.exports = productService;
