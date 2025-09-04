const express = require("express");
const subCategoryController = require("../controllers/subCategory.controller");
const {
  createSubCategoryValidator,
  getSubCategoryByIdValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

//mergeParams: Allaw the router to merge params from the parent router
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(subCategoryController.CreateFilter,subCategoryController.getAllSubCategory)
  .post(
    subCategoryController.setCategoryIdToBody,
    createSubCategoryValidator,
    subCategoryController.createSubCategory
  );

router
  .route("/:id")
  .get(getSubCategoryByIdValidator, subCategoryController.getSubCategoryById)
  .put(updateSubCategoryValidator, subCategoryController.updateSubCategory)
  .delete(deleteSubCategoryValidator, subCategoryController.deleteSubCategory);

module.exports = router;
