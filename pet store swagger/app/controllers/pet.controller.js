const db = require("../../config/dbConnection");

// get all pet data
const getAllPetData = (req, res) => {
  const selectQuery = `SELECT p.id, pc.name AS category, p.name, p.status, p.quantity FROM pet as p JOIN pet_category as pc ON p.category_id = pc.id;`;

  db.query(selectQuery, (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  });
};

// get pet data by id
const getPetDataById = (req, res) => {
  const id = parseInt(req.params.id);

  const selectQuery = `SELECT p.id, pc.name AS category, p.name, p.status, p.quantity FROM pet as p JOIN pet_category as pc ON p.category_id = pc.id WHERE p.id = ?;`;

  db.query(selectQuery, [id], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  });
};

// get pet data by status
const getPetDataByStatus = (req, res) => {
  const status = req.query.status;

  const selectQuery = `SELECT p.id, pc.name AS category, p.name, p.status, p.quantity FROM pet as p JOIN pet_category as pc ON p.category_id = pc.id WHERE p.status = ?;`;

  db.query(selectQuery, [status], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results.length > 0) {
        res.status(200).json(results);
      } else {
        res.status(404).json({
          message: `Data with status '${status}' not found.`,
        });
      }
    }
  });
};

// add new pet data
const addPetData = (req, res) => {
  const name = req.body.name;
  const category_id = req.body.category_id;
  const status = "available";
  const quantity = req.body.quantity;

  const insertQuery = `INSERT INTO pet (name, category_id, status, quantity) VALUES (?, ?, ?, ?);`;

  if (quantity > 0) {
    db.query(
      insertQuery,
      [name, category_id, status, quantity],
      (error, results) => {
        if (error) {
          res.status(500).json(error);
        } else {
          res.status(200).json({
            message: "Pet data added successfully.",
          });
        }
      }
    );
  } else {
    res.status(400).json({
      message: "Quantity must be greater than 0.",
    });
  }
};

// update exiting pet data
const updatePetData = (req, res) => {
  const id = parseInt(req.body.id);
  const name = req.body.name;
  const category_id = req.body.category_id;
  const status = req.body.status;
  const quantity = req.body.quantity;

  const updateQuery = `UPDATE pet SET name = ?, category_id = ?, status = ?, quantity = ?, updated_at = CURRENT_TIMESTAMP() WHERE id = ?;`;

  db.query(
    updateQuery,
    [name, category_id, status, quantity, id],
    (error, results) => {
      if (error) {
        res.json(error);
      } else {
        if (results.affectedRows > 0) {
          res.status(200).json({
            message: "Pet data updated successfully.",
          });
        } else {
          res.status(404).json({
            message: `Pet data with id '${id}' not found.`,
          })
        }
      }
    }
  );
};

// delete exiting pet data
const deletePetData = (req, res) => {
  const id = parseInt(req.params.id);

  const deleteQuery = `DELETE FROM pet WHERE id = ?;`;

  db.query(deleteQuery, [id], (error, results) => {
    if (error) {
      res.json(error);
    } else {
      if (results.affectedRows > 0) {
        res.status(200).json({
          message: "Pet data deleted successfully.",
        });
      } else {
        res.status(404).json({
          message: `Pet data with id '${id}' not found.`,
        });
      }
    }
  });
};

module.exports = {
  getAllPetData,
  getPetDataById,
  getPetDataByStatus,
  addPetData,
  updatePetData,
  deletePetData
};
