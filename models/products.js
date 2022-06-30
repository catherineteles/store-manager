const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products;',
  );
  return products;
};

const findById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?';
  const [productData] = await connection.execute(query, [id]);

  if (productData.length === 0) return null;

  return productData;
};

module.exports = {
  getAll,
  findById,
};