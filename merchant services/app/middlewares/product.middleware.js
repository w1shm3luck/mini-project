const Validator = require("validatorjs");

const productValidation = (req, res, next) => {
  const data = {
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
  };

  const rules = {
    name: "required|string|min:3|max:50",
    quantity: "required|integer|min:1",
    price: "required|integer|min:10000",
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
  productValidation,
};
