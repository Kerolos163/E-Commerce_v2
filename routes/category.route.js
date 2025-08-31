const categoryCintroller = require("../controllers/category.controller");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(categoryCintroller.getAllCategories)
  .post(categoryCintroller.createCategory);

router
  .route("/:id")
  .get(categoryCintroller.getCategoryById)
  .put(categoryCintroller.updateCategory)
  .delete(categoryCintroller.deleteCategory);
module.exports = router;
