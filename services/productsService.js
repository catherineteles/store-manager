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
  
  validateId: runSchema(Joi.object({
    id: Joi.number().min(1).required(),
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

  edit: async (id, { name }) => {
    if (!name) return false;

    await products.edit(id, name);

    return true;
  },

  delete: async (id) => {
    if (!id) return false;
    
    await products.deleteById(id);

    return true;
  },

};

module.exports = productService;
