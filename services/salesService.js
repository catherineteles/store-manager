const Joi = require('joi');
const { runSchema } = require('../helpers/erroHandling');
const sales = require('../models/sales');

const salesService = {
  
  validateBody: runSchema(Joi.object({
    productId: Joi.required(),
    quantity: Joi.number().integer().min(1).required(),
  })),

  addNewSale: async (salesProducts) => {
    const id = await sales.create();

    await Promise.all(salesProducts.map((sale) => sales.addProducts(id, sale)));

    return ({ id, itemsSold: salesProducts });
  },

  list: async () => {
    const salesList = await sales.list();

    return salesList;
  },

  getById: async (id) => {
    const salesList = await sales.getById(id);

    return salesList;
  },

};

module.exports = salesService;
