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
    const value = await productService.validateBody(req.body);
    const id = await productService.create(value);
    const newProduct = { id, ...value };
  
    res.status(201).json(newProduct);
  },

  updateProduct: async (req, res) => {
    const { id } = await productService.validateId(req.params);
    const data = await productService.validateBody(req.body);

    await productService.exists(id);

    await productService.edit(id, data);
    const product = await productService.getById(id);
    res.status(200).json(product);
  },

};

module.exports = productController;
