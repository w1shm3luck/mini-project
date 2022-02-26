const db = require("../../config/db");

const signin = (params, callback) => {
  const selectQuery = `SELECT id, name, phone_number, address FROM merchant WHERE phone_number = ? AND password = ?;`;
  db.query(selectQuery, params, callback);
};

const findByPhoneNumber = (params, callback) => {
  const selectQuery = `SELECT COUNT(*) AS count FROM merchant WHERE phone_number = ?;`;
  db.query(selectQuery, params, callback);
};

module.exports = {
  signin,
  findByPhoneNumber,
};
