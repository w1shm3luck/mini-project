const productModel = require("../models/product.model");

const getListProduct = (req, res) => {
  const merchantId = res.locals.payload.id;

  productModel.getByMerchant([merchantId], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  });
};

const addProduct = (req, res) => {
  const merchantId = res.locals.payload.id;
  const { name, quantity, price } = req.body;

  productModel.create([merchantId, name, quantity, price], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json({
        message: "Product has been added.",
      });
    }
  });
};

const updateProduct = (req, res) => {
  const productId = parseInt(req.params.id);
  const merchantId = res.locals.payload.id;
  const { name, quantity, price } = req.body;

  productModel.update(
    [name, quantity, price, productId, merchantId],
    (error, results) => {
      if (error) {
        res.status(500).json(error);
      } else {
        if (results.affectedRows === 0) {
          res.status(404).json({
            message: `Product with id '${productId}' not found in your merchant.`,
          });
        } else {
          res.status(200).json({
            message: "Product has been updated.",
          });
        }
      }
    }
  );
};

const softDeleteProduct = (req, res) => {
  const productId = parseInt(req.params.id);
  const merchantId = res.locals.payload.id;

  productModel.softDelete([productId, merchantId], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({
          message: `Product with id '${productId}' not found in your merchant.`,
        });
      } else {
        res.status(200).json({
          message: "Product has been soft deleted.",
        });
      }
    }
  });
};

const deleteProduct = (req, res) => {
  const productId = parseInt(req.params.id);
  const merchantId = res.locals.payload.id;

  productModel.productDelete([productId, merchantId], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({
          message: `Product with id '${productId}' not found in your merchant.`,
        });
      } else {
        res.status(200).json({
          message: "Product has been deleted.",
        });
      }
    }
  });
};

module.exports = {
  getListProduct,
  addProduct,
  updateProduct,
  softDeleteProduct,
  deleteProduct,
};
