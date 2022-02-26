const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost", 
  user: "root",
  password: "",
  database: "game_stop",
});

module.exports = db;