const express = require("express");
const subCategoryController = require("../controllers/subCategory.controller");
const {
  createSubCategoryValidator,
  getSubCategoryByIdValidator,
} = require("../utils/validators/subCategoryValidator");

const router = express.Router();

router
  .route("/")
  .get(subCategoryController.getAllSubCategory)
  .post(createSubCategoryValidator, subCategoryController.createSubCategory);

router
  .route("/:id")
  .get(getSubCategoryByIdValidator, subCategoryController.getSubCategoryById);

module.exports = router;
