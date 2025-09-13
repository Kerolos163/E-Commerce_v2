const { check } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

// @desc Validator to get category by ID
exports.getCategoryByIdValidator = [
  check("id").isMongoId().withMessage("Invalid category id"),
  validatorMiddleware,
];

//@desc Validator to create a new category
exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3 })
    .withMessage("Category name must be at least 3 characters")
    .isLength({ max: 32 })
    .withMessage("Category name must be at most 32 characters"),
  validatorMiddleware,
];

//@desc Validator to update a category
exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id"),
  check("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3 })
    .withMessage("Category name must be at least 3 characters")
    .isLength({ max: 32 })
    .withMessage("Category name must be at most 32 characters")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

//@desc Validator to delete a category
exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id"),
  validatorMiddleware,
];
