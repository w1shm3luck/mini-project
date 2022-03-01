const db = require("../../config/dbConnection");
const Validator = require("validatorjs");
const validator = require("validator");

// add new user
const addUser = (req, res) => {
  const userObj = {
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    password_confirmation: req.body.password_confirmation,
    phone: req.body.phone,
  };

  const dataValidation = dataValidatorAdd(userObj);

  if (dataValidation === true) {
    // check if user already exist
    const selectQuery = `SELECT COUNT(*) AS count FROM user WHERE email = ? OR username = ?;`;

    db.query(selectQuery, [userObj.email, userObj.username], (error, results) => {
      if (error) {
        res.status(500).json(error);
      } else {
        if (results[0]["count"] > 0) {
          res.status(400).json({
            message: "User already exist! Use another email or username.",
          });
        } else {
          // insert user
          const insertQuery = `INSERT INTO user (username, first_name, last_name, email, password, phone) VALUES (?, ?, ?, ?, ?, ?);`;

          db.query(
            insertQuery,
            [
              userObj.username,
              userObj.first_name,
              userObj.last_name,
              userObj.email,
              userObj.password,
              userObj.phone,
            ],
            (error, results) => {
              if (error) {
                res.status(500).json(error);
              } else {
                res.status(200).json({
                  message: "User has been created!",
                });
              }
            }
          );
        }
      }
    });
  } else {
    res.status(400).json({
      message: dataValidation,
    });
  }
};

const dataValidatorAdd = (dataObj) => {
  Validator.register(
    "mobilePhone",
    (value) => {
      return validator.isMobilePhone(value, "id-ID");
    },
    "The phone number format is invalid. Please use Indonesian format."
  );

  const rules = {
    username: "required|string|between:5,20",
    first_name: "required|string",
    last_name: "required|string",
    email: "required|email",
    password: "required|string|min:8|confirmed",
    phone: "required|mobilePhone",
  };

  const validation = new Validator(dataObj, rules);

  if (validation.passes() === true) {
    return true;
  } else {
    return validation.errors.all();
  }
};

// get user by username
const getUser = (req, res) => {
  const username = req.params.username;

  const selectQuery = `SELECT username, first_name, last_name, email, phone FROM user WHERE username = ?;`;

  db.query(selectQuery, [username], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results.length > 0) {
        res.status(200).json({
          data: results[0],
        });
      } else {
        res.status(404).json({
          message: `User with username '${username}' not found!`,
        });
      }
    }
  });
};

// update exiting user
const updateUser = (req, res) => {
  const username = req.params.username;
  const userObj = {
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
  };

  // check if user exist and validate password
  const selectQuery = `SELECT password FROM user WHERE username = ?;`;

  db.query(selectQuery, [username], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results.length > 0) {
        // verify password
        if (results[0].password === userObj.password) {
          // validate new data
          const dataValidation = dataValidatorUpdate(userObj);

          if (dataValidation === true) {
            // check if user already exist with new data updated
            const selectQuery = `SELECT COUNT(*) AS count FROM user WHERE email = ? OR username = ?;`;

            db.query(
              selectQuery,
              [userObj.email, userObj.username],
              (error, results) => {
                if (error) {
                  res.status(500).json(error);
                } else {
                  if (results[0]["count"] > 0) {
                    res.status(400).json({
                      message:
                        "User already exist! Use another email or username.",
                    });
                  } else {
                    // update user
                    const updateQuery = `UPDATE user SET username = ?, first_name = ?, last_name = ?, email = ?, phone = ?, updated_at = CURRENT_TIMESTAMP() WHERE username = ?;`;

                    db.query(
                      updateQuery,
                      [
                        userObj.username,
                        userObj.first_name,
                        userObj.last_name,
                        userObj.email,
                        userObj.phone,
                        username,
                      ],
                      (error, results) => {
                        if (error) {
                          res.status(500).json(error);
                        } else {
                          res.status(200).json({
                            message: "User has been updated!",
                          });
                        }
                      }
                    );
                  }
                }
              }
            );
          } else {
            res.status(400).json({
              message: dataValidation,
            });
          }
        } else {
          res.status(400).json({
            message: "Password is incorrect!",
          });
        }
      } else {
        res.status(404).json({
          message: `User with username '${username}' not found!`,
        });
      }
    }
  });
};

const dataValidatorUpdate = (dataObj) => {
  Validator.register(
    "mobilePhone",
    (value) => {
      return validator.isMobilePhone(value, "id-ID");
    },
    "The phone number format is invalid. Please use Indonesian format."
  );

  const rules = {
    username: "required|string|between:5,20",
    first_name: "required|string",
    last_name: "required|string",
    email: "required|email",
    phone: "required|mobilePhone",
  };

  const validation = new Validator(dataObj, rules);

  if (validation.passes() === true) {
    return true;
  } else {
    return validation.errors.all();
  }
};

// delete exiting user
const deleteUser = (req, res) => {
  const username = req.params.username;

  // check if user exist
  const selectQuery = `SELECT COUNT(*) AS count FROM user WHERE username = ?;`;

  db.query(selectQuery, [username], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results[0]["count"] > 0) {
        // delete selected user
        const deleteQuery = `DELETE FROM user WHERE username = ?;`;

        db.query(deleteQuery, [username], (error, results) => {
          if (error) {
            res.status(500).json(error);
          } else {
            res.status(200).json({
              message: "User has been deleted!",
            });
          }
        });
      } else {
        res.status(404).json({
          message: `User with username '${username}' not found!`,
        });
      }
    }
  });
};

module.exports = {
  addUser,
  getUser,
  updateUser,
  deleteUser,
};
