const express = require("express");
const categoryController = require("../controllers/category.controller");
const {
  getCategoryByIdValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");

const router = express.Router();
router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(createCategoryValidator, categoryController.createCategory);

router
  .route("/:id")
  .get(getCategoryByIdValidator, categoryController.getCategoryById)
  .put(updateCategoryValidator, categoryController.updateCategory)
  .delete(deleteCategoryValidator, categoryController.deleteCategory);

module.exports = router;
