const express = require("express");
const merchantRoutes = require("../controllers/merchant.controller");
const merchantMiddleware = require("../middlewares/merchant.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post(
  "/merchant",
  merchantMiddleware.createValidation,
  merchantRoutes.registerMerchant
);

router.put(
  "/merchant",
  authMiddleware.isAuthenticate,
  merchantMiddleware.updateValidation,
  merchantRoutes.updateMerchant
);

router.put(
  "/merchant/updatePassword",
  authMiddleware.isAuthenticate,
  merchantMiddleware.updatePasswordValidation,
  merchantRoutes.updateMerchantPassword
);

router.put(
  "/merchant/softDelete",
  authMiddleware.isAuthenticate,
  merchantMiddleware.deleteValidaiton,
  merchantRoutes.softDeleteMerchant
);

router.delete(
  "/merchant",
  authMiddleware.isAuthenticate,
  merchantMiddleware.deleteValidaiton,
  merchantRoutes.deleteMerchant
);

module.exports = router;
