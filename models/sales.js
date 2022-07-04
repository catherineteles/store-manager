const connection = require('./connection');

const sales = {
  create: async () => {
    const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
    const [{ insertId }] = await connection.execute(query);
    return insertId;
  },

  addProducts: async ({ id, salesProducts }) => {
    const { productId, quantity } = salesProducts;
    const query = `
    INSERT INTO StoreManager.sales_products
    (sale_id, product_id, quantity)
    VALUES (?,?,?)`;

    const [{ insertId }] = await connection.execute(query, [id, productId, quantity]);
    return insertId;
  },

};

module.exports = sales;