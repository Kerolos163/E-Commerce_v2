const express = require("express");
const brandController = require("../controllers/brand.controller");
const {
  getBrandByIdValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validators/brandValidator");

const router = express.Router();

router
  .route("/")
  .get(brandController.getAllBrands)
  .post(createBrandValidator, brandController.createBrand);

router
  .route("/:id")
  .get(getBrandByIdValidator, brandController.getBrandById)
  .put(updateBrandValidator, brandController.updateBrand)
  .delete(deleteBrandValidator, brandController.deleteBrand);

module.exports = router;
