const db = require('../config/db') 

let deleteQuery = `DELETE FROM todo WHERE id = ?`
let data = [2]
db.query(deleteQuery, data, function (err, deleted) {
  if (err) throw err;
  console.log(deleted);
});
