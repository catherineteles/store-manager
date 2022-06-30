const productService = require('../services/productsService');

const productController = {
  getAll: async (_req, res) => {
    const product = await productService.list();

    res.status(200).json(product);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const product = await productService.getById(id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(product);
  },

};

module.exports = productController;
