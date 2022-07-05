const Joi = require('joi');
const sales = require('../models/sales');

const productService = {
  
  validateBody: async (params) => {
    const schema = Joi.object({
      productId: Joi.required(),
      quantity: Joi.number().integer().min(1).required(),
    });

    const { error, value } = schema.validate(params);

    if (error) throw error;

    return value;
  },

  addNewSale: async (salesProducts) => {
    const id = await sales.create();

    await Promise.all(salesProducts.map((sale) => sales.addProducts(id, sale)));

    return ({ id, itensSold: salesProducts });
  },

};

module.exports = productService;
