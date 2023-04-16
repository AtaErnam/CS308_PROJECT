const express = require("express");
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");

const productRouter = express.Router();

productRouter
  .route("/")
  .get(productController.getAllProduct)
  .post(productController.createProduct);

productRouter
  .route("/:id")
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    productController.deleteProduct
  );

module.exports = productRouter;
