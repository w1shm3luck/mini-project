const db = require("../../config/db");

const getByMerchant = (params, callback) => {
  const selectQuery = `SELECT id, name, quantity, price FROM product WHERE merchant_id = ? AND is_deleted = FALSE;`;
  db.query(selectQuery, params, callback);
};

const create = (params, callback) => {
  const insertQuery = `INSERT INTO product (merchant_id, name, quantity, price) VALUES (?, ?, ?, ?);`;
  db.query(insertQuery, params, callback);
};

const update = (params, callback) => {
  const updateQuery = `UPDATE product SET name = ?, quantity = ?, price = ?, updated_at = CURRENT_TIMESTAMP() WHERE id = ? AND merchant_id = ?;`;
  db.query(updateQuery, params, callback);
};

const softDelete = (params, callback) => {
  const deleteQuery = `UPDATE product SET updated_at = CURRENT_TIMESTAMP(), is_deleted = TRUE WHERE id = ? AND merchant_id = ?;`;
  db.query(deleteQuery, params, callback);
};

const productDelete = (params, callback) => {
  const deleteQuery = `DELETE FROM product WHERE id = ? AND merchant_id = ?;`;
  db.query(deleteQuery, params, callback);
};

module.exports = {
  getByMerchant,
  create,
  update,
  softDelete,
  productDelete,
};
