const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

exports.createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters")
    .isLength({ max: 100 })
    .withMessage("Title must be at most 100 characters"),

  check("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 20 })
    .withMessage("Description must be at least 20 characters"),

  check("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isNumeric()
    .withMessage("Quantity must be a number"),

  check("solid").optional().isNumeric().withMessage("Solid must be a number"),

  check("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number"),

  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("Price after discount must be a number")
    .toFloat()
    .custom((value, { req }) => {
      if (value > req.body.price) {
        throw new Error("Price after discount must be less than price");
      }
      return true;
    }),

  check("colors").optional().isArray().withMessage("Colors must be an array"),

  check("imageCover")
    .notEmpty()
    .withMessage("Image cover is required")
    .isString()
    .withMessage("Image cover must be a string"),

  check("images").optional().isArray().withMessage("Images must be an array"),

  check("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Invalid category id"),

  check("subCategory")
    .optional()
    .isMongoId()
    .withMessage("Invalid subCategory id")
    .isArray()
    .withMessage("SubCategory must be an array"),

  check("brand").optional().isMongoId().withMessage("Invalid brand id"),

  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("Rating must be a number")
    .isLength({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),

  check("ratingQuantity")
    .optional()
    .isNumeric()
    .withMessage("Rating quantity must be a number"),

  validatorMiddleware,
];

exports.getProductByIdValidator = [
  check("id").isMongoId().withMessage("Invalid brand id"),
  validatorMiddleware,
];

exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid brand id"),

  validatorMiddleware,
];

exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid brand id"),
  validatorMiddleware,
];
