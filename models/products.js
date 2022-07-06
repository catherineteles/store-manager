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

const create = async ({ name }) => {
  if (!name) return null;
  
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [{ insertId }] = await connection.execute(query, [name]);
  return insertId;
};

const edit = async (id, changes) => {
  const query = `
      UPDATE db.character 
      SET ? 
      WHERE id = ?
    `;
  const [{ affectedRows }] = await connection.execute(query, [changes, id]);
  return Boolean(affectedRows);
};

const exists = async (id) => {
  const query = `
      SELECT * 
      FROM StoreManager.products 
      WHERE id = ?
    `;
  const [[product]] = await connection.execute(query, [id]);
  return !!product;
};

module.exports = {
  getAll,
  getById,
  create,
  edit,
  exists,
};