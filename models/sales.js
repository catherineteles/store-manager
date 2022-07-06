const connection = require('./connection');

const sales = {
  create: async () => {
    const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
    const [{ insertId }] = await connection.execute(query);
    return insertId;
  },

  addProducts: async (id, products) => {
    const { productId, quantity } = products;
    const query = `
    INSERT INTO StoreManager.sales_products
    (sale_id, product_id, quantity)
    VALUES (?,?,?)`;

    const [{ insertId }] = await connection.execute(query, [id, productId, quantity]);
    return insertId;
  },

  list: async () => {
    const query = `
      SELECT
      sale_id AS saleId,
      date,
      product_id AS productId,
      quantity
      FROM StoreManager.sales AS s 
      INNER JOIN StoreManager.sales_products AS sp
      ON s.id = sp.sale_id
      ORDER BY saleId, productId;    
    `;
    const [salesList] = await connection.execute(query);
    return salesList;
  },

  getById: async (id) => {
    const query = `
      SELECT
      date,
      product_id AS productId,
      quantity
      FROM StoreManager.sales AS s 
      INNER JOIN StoreManager.sales_products AS sp
      ON s.id = sp.sale_id
      WHERE id = ?
      ORDER BY productId;    
    `;
    const [salesList] = await connection.execute(query, [id]);
    if (salesList.length === 0) return null;

    return salesList;
  },

};

module.exports = sales;