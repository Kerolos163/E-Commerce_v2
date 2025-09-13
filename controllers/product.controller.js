const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Product = require("../models/ProductModel");
const httpStatus = require("../utils/http_status");
const AppError = require("../utils/appError");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handler.controller");

// @desc Get all Products
// @route GET /api/v1/Products
// @access Public
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .filter()
    .search("Product")
    .limitFields()
    .sort()
    .paginate(await Product.countDocuments());

  const products = await apiFeatures.mongooseQuery.populate("category", [
    "-__v",
  ]);

  res.status(200).json({
    status: httpStatus.success,
    count: products.length,
    pagination: {
      limit: apiFeatures.paginationResult.limit,
      currentPage: apiFeatures.paginationResult.page,
      previousPage: apiFeatures.paginationResult.Previous,
      nextPage: apiFeatures.paginationResult.nextPage,
      totalPages: apiFeatures.paginationResult.totalPages,
    },
    products,
  });
});

// @desc Get product by ID
// @route GET /api/v1/products/:id
// @access Public
exports.getProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id, {
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
  }).populate("category", ["-__v"]);
  if (!product) {
    const err = new AppError("Category not found", 404);
    return next(err);
  }

  res.status(200).json({
    status: httpStatus.success,
    product,
  });
});

// @desc Create a new product
// @route POST /api/v1/products
// @access Private
exports.createProduct = asyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);

  const product = new Product(req.body);
  const result = await product.save();
  res.status(201).json({
    status: httpStatus.success,
    message: "Product created",
    product: { id: result._id, name: result.name, slug: result.slug },
  });
});

// @desc Update a product
// @route PUT /api/v1/products/:id
// @access Private
exports.updateProduct = factory.updateOne(Product);
//! Update Without Factory
// exports.updateProduct = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   if (req.body.title) {
//     req.body.slug = slugify(req.body.title);
//   }

//   const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

//   if (!product) {
//     const err = new AppError("Product not found", 404);
//     return next(err);
//   }

//   res.status(200).json({
//     status: httpStatus.success,
//     message: "Product updated",
//     product: { id: product._id, name: product.name, slug: product.slug },
//   });
// });

// @desc Delete a product
// @route DELETE /api/v1/Products/:id
// @access Private
exports.deleteProduct = factory.DeleteOne(Product);
//! Delete Without factory
// exports.deleteProduct = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const product = await Product.findByIdAndDelete(id);
//   if (!product) {
//     const err = new AppError("Product not found", 404);
//     return next(err);
//   }

//   res.status(204).json({
//     status: httpStatus.success,
//     message: "Category deleted",
//     product: { id: product._id, name: product.name, slug: product.slug },
//   });
// });
