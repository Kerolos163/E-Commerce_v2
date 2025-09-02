const express = require("express");
const subCategoryController = require("../controllers/subCategory.controller");
const {
  createSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

const router = express.Router();

router
  .route("/")
  .get(subCategoryController.getAllSubCategory)
  .post(createSubCategoryValidator, subCategoryController.createSubCategory);

module.exports = router;
