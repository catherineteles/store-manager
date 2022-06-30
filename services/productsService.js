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
  getAll: async (_req, res) => {
    const product = await products.getAll();

    res.status(200).json(product);
  },

  getById: async (_req, res) => {
    const product = await products.getById();

    res.status(200).json(product);
  },

  // create: async ({ name }) => {
  //   const id = await products.create({ name });
  //   return id;
  // },
};

module.exports = productService;
