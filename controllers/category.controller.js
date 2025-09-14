const asyncHandler = require("express-async-handler");
const Category = require("../models/CategoryModel");
const httpStatus = require("../utils/http_status");
const AppError = require("../utils/appError");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handler.controller");

// @desc Get all categories
// @route GET /api/v1/categories
// @access Public
exports.getAllCategories = asyncHandler(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(Category.find(), req.query)
    .filter()
    .search()
    .limitFields()
    .sort()
    .paginate(await Category.countDocuments());
  const categories = await apiFeatures.mongooseQuery;

  res.status(200).json({
    status: httpStatus.success,
    count: categories.length,
    pagination: {
      limit: apiFeatures.paginationResult.limit,
      currentPage: apiFeatures.paginationResult.page,
      previousPage: apiFeatures.paginationResult.Previous,
      nextPage: apiFeatures.paginationResult.nextPage,
      totalPages: apiFeatures.paginationResult.totalPages,
    },
    categories,
  });
});

// @desc Get category by ID
// @route GET /api/v1/categories/:id
// @access Public
exports.getCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id, {
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
  });
  if (!category) {
    const err = new AppError("Category not found", 404);
    return next(err);
  }

  res.status(200).json({
    status: httpStatus.success,
    category,
  });
});

// @desc Create a new category
// @route POST /api/v1/categories
// @access Private
exports.createCategory = factory.createOne(Category);
//! Create without factory
// exports.createCategory = asyncHandler(async (req, res, next) => {
//   const { name } = req.body;
//   const slug = slugify(name);

//   const category = new Category({ name, slug });
//   const result = await category.save();
//   res.status(201).json({
//     status: httpStatus.success,
//     message: "Category created",
//     category: { id: result._id, name: result.name, slug: result.slug },
//   });
// });

// @desc Update a category
// @route PUT /api/v1/categories/:id
// @access Private
exports.updateCategory = factory.updateOne(Category);
//! Update without factory
// exports.updateCategory = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const { name } = req.body;
//   const slug = slugify(name);

//   const category = await Category.findByIdAndUpdate(
//     id,
//     { name, slug },
//     { new: true }
//   );

//   if (!category) {
//     const err = new AppError("Category not found", 404);
//     return next(err);
//   }

//   res.status(200).json({
//     status: httpStatus.success,
//     message: "Category updated",
//     category: { id: category._id, name: category.name, slug: category.slug },
//   });
// });

// @desc Delete a category
// @route DELETE /api/v1/categories/:id
// @access Private
exports.deleteCategory = factory.DeleteOne(Category);
//! Delete without factory
// exports.deleteCategory = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const category = await Category.findByIdAndDelete(id);
//   if (!category) {
//     const err = new AppError("Category not found", 404);
//     return next(err);
//   }

//   res.status(204).json({
//     status: httpStatus.success,
//     message: "Category deleted",
//     category: { id: category._id, name: category.name, slug: category.slug },
//   });
// });
