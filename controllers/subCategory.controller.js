const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const SubCategory = require("../models/SubCategoryModel");
const httpStatus = require("../utils/http_status");
const AppError = require("../utils/appError");

// @desc Get all subcategories
// @route GET /api/v1/subcategories
// @access Public
exports.getAllSubCategory = asyncHandler(async (req, res, next) => {});

// @desc Get single subcategories
// @route GET /api/v1/subcategories/:id
// @access Public
exports.getSubCategoryById = asyncHandler(async (req, res, next) => {});

// @desc Create new subcategories
// @route POST /api/v1/subcategories
// @access Private
exports.createSubCategory = asyncHandler(async (req, res, next) => {
  const { name, category } = req.body;
  const slug = slugify(name);

  const subCategory = new SubCategory({ name, slug, category });
  const result = await subCategory.save();

  res.status(201).json({
    status: httpStatus.success,
    message: "SubCategory created",
    subCategory: {
      id: result._id,
      name: result.name,
      slug: result.slug,
      category: result.category,
    },
  });
});

// @desc Update subcategories
// @route PUT /api/v1/subcategories/:id
// @access Private
exports.updateSubCategory = asyncHandler(async (req, res, next) => {});

// @desc Delete subcategories
// @route DELETE /api/v1/subcategories/:id
// @access Private
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {});
