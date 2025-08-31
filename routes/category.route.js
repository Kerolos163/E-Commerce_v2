const categoryController = require("../controllers/category.controller");
const { param, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory);

router
  .route("/:id")
  .get(
    param("id").isMongoId().withMessage("Invalid category id"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
    categoryController.getCategoryById
  )
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
