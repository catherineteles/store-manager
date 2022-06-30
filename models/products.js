const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products;',
  );
  return products;
};

const getById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?';
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