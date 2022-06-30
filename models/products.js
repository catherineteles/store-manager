const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products;',
  );
  return products;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [productData] = await connection.execute(query, [id]);
  const [data] = productData;
  if (productData.length === 0) return null;

  return data;
};

const create = async (name) => connection.execute(
  'INSERT INTO products (name) VALUES (?)',
  [name],
);

module.exports = {
  getAll,
  getById,
  create,
};