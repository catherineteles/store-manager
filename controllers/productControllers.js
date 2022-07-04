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

  create: async (req, res) => {
    try {
      const value = await productService.validateBody(req.body);
      const id = await productService.create(value);
      const newProduct = { id, ...value };
  
      res.status(201).json(newProduct);
    } catch (e) {
      const http = e.message === '"name" is required' ? 400 : 422;
      res.status(http).json({ message: e.message });
    }
  },

};

module.exports = productController;
