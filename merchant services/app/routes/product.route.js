const express = require("express");
const productRoutes = require("../controllers/product.controller");
const productMiddleware = require("../middlewares/product.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get(
  "/product",
  authMiddleware.isAuthenticate,
  productRoutes.getListProduct
);

router.post(
  "/product",
  authMiddleware.isAuthenticate,
  productMiddleware.productValidation,
  productRoutes.addProduct
);

router.put(
  "/product/:id",
  authMiddleware.isAuthenticate,
  productMiddleware.productValidation,
  productRoutes.updateProduct
);

router.put(
  "/product/softDelete/:id",
  authMiddleware.isAuthenticate,
  productRoutes.softDeleteProduct
);

router.delete(
  "/product/:id",
  authMiddleware.isAuthenticate,
  productRoutes.deleteProduct
);

module.exports = router;
