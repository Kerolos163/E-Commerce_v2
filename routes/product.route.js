const express = require("express");
const productController = require("../controllers/product.controller");
const {
  getProductByIdValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");

const router = express.Router();

router
  .route("/")
  .get(productController.getAllProducts)
  .post(createProductValidator, productController.createProduct);

router
  .route("/:id")
  .get(getProductByIdValidator, productController.getProductById)
  .put(updateProductValidator, productController.updateProduct)
  .delete(deleteProductValidator, productController.deleteProduct);

module.exports = router;
