const express = require("express");
const loginRoutes = require("../controllers/login.controller");
const loginMiddleware = require("../middlewares/login.middleware");

const router = express.Router();

router.post("/login", loginMiddleware.loginValidation, loginRoutes.login);

module.exports = router;
