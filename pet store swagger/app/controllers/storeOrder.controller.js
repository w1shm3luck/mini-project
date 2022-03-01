const db = require("../../config/dbConnection");
const moment = require("moment");

const date = new Date();
const getHours = date.getHours();

// add store order
const addStoreOrder = (req, res) => {
  const petId = req.body.pet_id;
  const quantity = req.body.quantity;
  const status = "placed";

  // Check if pet exists
  const selectQuery = `SELECT name, status, quantity FROM pet WHERE id = ?;`;

  db.query(selectQuery, [petId], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results.length > 0) {
        if (results[0].status !== "available") {
          res.status(404).json({
            message: `Pet with name '${results[0].name}' and id '${petId}' is not available or sold out.`,
          });
        } else {
          if (results[0].quantity < quantity) {
            res.status(400).json({
              message: `Pet with name '${results[0].name}' and id '${petId}' has only ${results[0].quantity} units available.`,
            });
          } else {
            if (quantity > 0) {
              // insert store order data
              const insertQuery = `INSERT INTO store_order (pet_id, quantity, status) VALUES (?, ?, ?);`;

              if (quantity === results[0].quantity) {
                db.query(
                  insertQuery,
                  [petId, quantity, status],
                  (error, results) => {
                    if (error) {
                      res.status(500).json(error);
                    } else {
                      // update quantity pet data after add store order
                      const updateQuery = `UPDATE pet SET quantity = quantity - ?, updated_at = CURRENT_TIMESTAMP(), status = "sold" WHERE id = ?;`;

                      db.query(
                        updateQuery,
                        [quantity, petId],
                        (error, results) => {
                          if (error) {
                            res.status(500).json(error);
                          } else {
                            res.status(200).json({
                              message: "Store order added successfully.",
                            });
                          }
                        }
                      );
                    }
                  }
                );
              } else {
                db.query(
                  insertQuery,
                  [petId, quantity, status],
                  (error, results) => {
                    if (error) {
                      res.status(500).json(error);
                    } else {
                      // update quantity pet data after add store order
                      const updateQuery = `UPDATE pet SET quantity = quantity - ?, updated_at = CURRENT_TIMESTAMP() WHERE id = ?;`;

                      db.query(
                        updateQuery,
                        [quantity, petId],
                        (error, results) => {
                          if (error) {
                            res.status(500).json(error);
                          } else {
                            res.status(200).json({
                              message: "Store order added successfully.",
                            });
                          }
                        }
                      );
                    }
                  }
                );
              }
            } else {
              res.status(400).json({
                message: "Quantity must be greater than 0.",
              });
            }
          }
        }
      } else {
        res.status(404).json({
          message: `Pet with id '${petId}' not found.`,
        });
      }
    }
  });
};

// get store order by id
const getStoreOrder = (req, res) => {
  const orderId = parseInt(req.params.id);

  const selectQuery = `SELECT so.id, p.name AS pet_name, so.quantity, so.ship_date, so.status, so.complete FROM store_order AS so JOIN pet AS p ON so.pet_id = p.id WHERE so.id = ?;`;

  db.query(selectQuery, [orderId], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res.status(404).json({
          message: `Store order with id '${orderId}' not found.`,
        });
      }
    }
  });
};

// update store order complete and status approved
const updateOrderComplete = (req, res) => {
  const orderId = req.body.id;
  const shipDate =
    getHours < 13
      ? moment().format("YYYY-MM-DD") + " 14:59:59"
      : dateTomorrow(moment().format("YYYY-MM-DD"));

  const updateQuery = `UPDATE store_order SET complete = TRUE, status = "approved", ship_date = ?, updated_at = CURRENT_TIMESTAMP() WHERE id = ?;`;

  db.query(updateQuery, [shipDate, orderId], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results.affectedRows > 0) {
        res.status(200).json({
          message: "Store order updated successfully.",
        });
      } else {
        res.status(404).json({
          message: `Store order with id '${orderId}' not found.`,
        });
      }
    }
  });
};

const dateTomorrow = (date) => {
  const dateArr = date.split("-");
  const replaceDate = parseInt(dateArr[dateArr.length - 1]) + 1;
  dateArr.pop();
  dateArr.push(replaceDate.toString());
  return dateArr.join("-") + " 08:59:59";
};

// update store order status delivered
const updateOrderDelivered = (req, res) => {
  const orderId = req.body.id;

  const updateQuery = `UPDATE store_order SET status = "delivered", updated_at = CURRENT_TIMESTAMP() WHERE id = ?;`;

  db.query(updateQuery, [orderId], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results.affectedRows > 0) {
        res.status(200).json({
          message: "Store order updated successfully.",
        });
      } else {
        res.status(404).json({
          message: `Store order with id '${orderId}' not found.`,
        });
      }
    }
  });
};

// delete exitist store order that haven't been approved yet
const deleteStoreOrder = (req, res) => {
  const orderId = parseInt(req.params.id);

  // check if order id exists and get pet_id, quantity from store_order
  const selectQuery = `SELECT pet_id, quantity FROM store_order WHERE id = ? AND complete = FALSE;`;

  db.query(selectQuery, [orderId], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results.length > 0) {
        const petId = results[0].pet_id;
        const orderQuantity = results[0].quantity;

        // check if pet exists and get quantity from pet
        const selectQuery = `SELECT quantity FROM pet WHERE id = ?;`;

        db.query(selectQuery, [petId], (error, results) => {
          if (error) {
            res.status(500).json(error);
          } else {
            const quantity = results[0].quantity;

            // executing delete store order if status order is not complete or false
            const deleteQuery = `DELETE FROM store_order WHERE id = ? AND complete = FALSE;`;

            db.query(deleteQuery, [orderId], (error, results) => {
              if (error) {
                res.status(500).json(error);
              } else {
                if (quantity === 0) {
                  // updating pet status to available if quantity is 0
                  const updateQuery = `UPDATE pet SET quantity = quantity + ?, status = "available", updated_at = CURRENT_TIMESTAMP() WHERE id = ?;`;
                  db.query(
                    updateQuery,
                    [orderQuantity, petId],
                    (error, results) => {
                      if (error) {
                        res.status(500).json(error);
                      } else {
                        res.status(200).json({
                          message: `Store order with id '${orderId}' has been deleted.`,
                        });
                      }
                    }
                  );
                } else {
                  // updating pet quantity as value quantity of order that has been deleted
                  const updateQuery = `UPDATE pet SET quantity = quantity + ?, updated_at = CURRENT_TIMESTAMP() WHERE id = ?;`;
                  db.query(
                    updateQuery,
                    [orderQuantity, petId],
                    (error, results) => {
                      if (error) {
                        res.status(500).json(error);
                      } else {
                        res.status(200).json({
                          message: `Store order with id '${orderId}' has been deleted.`,
                        });
                      }
                    }
                  );
                }
              }
            });
          }
        });
      } else {
        res.status(404).json({
          message: `Store order with id '${orderId}' not found or maybe has delivered.`,
        });
      }
    }
  });
};

module.exports = {
  addStoreOrder,
  getStoreOrder,
  updateOrderComplete,
  updateOrderDelivered,
  deleteStoreOrder,
};
