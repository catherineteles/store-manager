const salesService = require('../services/salesService');
const productService = require('../services/productsService');

const salesController = {
  create: async (req, res) => {
    const products = req.body;

    await Promise.all(products.map(async (product) => {
      await salesService.validateBody(product);
      await productService.exists(product.productId);
    }));

    const newSale = await salesService.addNewSale(products);

    res.status(201).json(newSale);   
  },

};

module.exports = salesController;
