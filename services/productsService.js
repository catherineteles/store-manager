const Joi = require('joi');
const { runSchema } = require('../helpers/erroHandling');
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

  validateBody: runSchema(Joi.object({
      name: Joi.string().min(5).required(),
    })),

  create: async ({ name }) => {
    const id = await products.create({ name });
    return id;
  },

  exists: async (id) => {
    const exists = await products.exists(id);
    if (!exists) {
      throw new Error('Product not found');
    }
    return true;
  },
};

module.exports = productService;
