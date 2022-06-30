// const Joi = require('joi');
const products = require('../models/products');

const productService = {
  // validateBody: (params) => {
  //   const schema = Joi.object({
  //     name: Joi.string().required(),
  //   });

  //   const { error, value } = schema.validate(params);

  //   if (error) throw error;

  //   return value;
  // },
  list: async () => {
    const productList = await products.getAll();

    return productList;
  },

  getById: async (id) => {
    const product = await products.getById(id);

    return product;
  },

  // create: async ({ name }) => {
  //   const id = await products.create({ name });
  //   return id;
  // },
};

module.exports = productService;
