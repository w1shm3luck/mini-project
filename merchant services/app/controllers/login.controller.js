const loginModel = require("../models/login.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

const login = (req, res) => {
  const { phone_number, password } = req.body;

  loginModel.findByPhoneNumber([phone_number], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results[0].count < 1) {
        res.status(404).json({
          message: "Phone number is not registered.",
        });
      } else {
        loginModel.signin(
          [phone_number, passwordHash(password)],
          (error, results) => {
            if (error) {
              res.status(500).json(error);
            } else {
              if (results.length < 1) {
                res.status(400).json({
                  message: "Login failed, wrong password",
                });
              } else {
                const payload = {
                  id: results[0].id,
                  name: results[0].name,
                  phone_number: results[0].phone_number,
                  address: results[0].address,
                };

                const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
                  expiresIn: "7d",
                });

                res.status(200).json({
                  message: "Login success",
                  data: { token: token },
                });
              }
            }
          }
        );
      }
    }
  });
};

const passwordHash = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

module.exports = {
  login,
};
