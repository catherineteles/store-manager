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

  getList: async (_req, res) => {
    const product = await salesService.list();

    res.status(200).json(product);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const sale = await salesService.getById(id);

    if (!sale) return res.status(404).json({ message: 'Sale not found' });

    res.status(200).json(sale);
  },

  deleteSale: async (req, res) => {
    const { id } = await productService.validateId(req.params);

    const sale = await salesService.getById(id);

    if (!sale) return res.status(404).json({ message: 'Sale not found' });

    await salesService.delete(id);
    res.status(204).json();
  },
};

module.exports = salesController;
