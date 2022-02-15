const db = require('../config/db') 
 
let updateQuery = `UPDATE todo SET description = ? WHERE id = ?`
let data = ['Saya ingin menulis sebuah tulisan', 1]
db.query(updateQuery, data, function (err, updated) {
  if (err) throw err;
  console.log(updated);
});
