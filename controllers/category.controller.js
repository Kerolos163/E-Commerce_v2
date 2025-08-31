const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Category = require("../models/CategoryModel");

// @desc Get all categories
// @route GET /api/v1/categories
// @access Public
exports.getAllCategories = asyncHandler(async (req, res) => {
  const limit = +req.query.limit || 10;
  const page = +req.query.page || 1;
  const skip = (page - 1) * limit;

  const categories = await Category.find(
    {},
    { __v: 0, createdAt: 0, updatedAt: 0 }
  )
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    status: "success",
    page: +page,
    totalPages: Math.ceil((await Category.countDocuments()) / limit),
    categories,
  });
});

// @desc Get category by ID
// @route GET /api/v1/categories/:id
// @access Public
exports.getCategoryById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const category = await Category.findById(id, {
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
  });
  if (!category) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  res.status(200).json({
    status: "success",
    category,
  });
});

// @desc Create a new category
// @route POST /api/v1/categories
// @access Private
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const slug = slugify(name);

  const category = new Category({ name, slug });
  const result = await category.save();
  res.status(201).json({
    message: "Category created",
    category: { id: result._id, name: result.name, slug: result.slug },
  });
});

// @desc Update a category
// @route PUT /api/v1/categories/:id
// @access Private
exports.updateCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const slug = slugify(name);

  const category = await Category.findByIdAndUpdate(
    id,
    { name, slug },
    { new: true }
  );

  if (!category) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  res.status(200).json({
    message: "Category updated",
    category: { id: category._id, name: category.name, slug: category.slug },
  });
});

// @desc Delete a category
// @route DELETE /api/v1/categories/:id
// @access Private
exports.deleteCategory = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    return res.status(404).json({
      message: "Category not found",
    });
  }

  res.status(204).json({
    message: "Category deleted",
    category: { id: category._id, name: category.name, slug: category.slug },
  });
});
