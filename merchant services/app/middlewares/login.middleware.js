const Validator = require("validatorjs");
const validator = require("validator");

const loginValidation = (req, res, next) => {
  Validator.register(
    "mobilePhone",
    (value) => {
      return validator.isMobilePhone(value, "id-ID");
    },
    "The phone number format is invalid. Please use Indonesian format."
  );

  const data = {
    phone_number: req.body.phone_number,
    password: req.body.password,
  };

  const rules = {
    phone_number: "required|mobilePhone",
    password: "required|string|min:6",
  };

  const validation = new Validator(data, rules);

  if (validation.passes() === true) {
    next();
  } else {
    res.status(400).json({
      message: validation.errors.all(),
    });
  }
};

module.exports = {
  loginValidation,
};
