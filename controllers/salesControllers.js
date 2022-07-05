// const salesService = require('../services/salesService');

// const salesController = {
//   create: async (req, res) => {
//     const products = req.body;

//     await Promise.all(products.map(async (product) => {
//       try {
//         await salesService.validateBody(product);
//       } catch (e) {
//         const http = e.message === '"productId" is required' ? 400 : 422;
//         return res.status(http).json({ message: e.message });
//       }
//      }));

//     res.status(201).json(products);   
//   },

// };

// module.exports = salesController;
