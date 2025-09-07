const slugify = require("slugify");
const qs = require("qs");
const asyncHandler = require("express-async-handler");
const Product = require("../models/ProductModel");
const httpStatus = require("../utils/http_status");
const AppError = require("../utils/appError");

// @desc Get all Products
// @route GET /api/v1/Products
// @access Public
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  //! Filering
  const queryObj = { ...req.query };
  const excludeFilds = ["page", "sort", "limit", "fields"];
  excludeFilds.forEach((item) => delete queryObj[item]);

  //? Advanced filtering [gte, gt, lte, lt]
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  const filteringQuery = qs.parse(JSON.parse(queryStr));

  //! Pagination
  const limit = +req.query.limit || 10;
  const page = +req.query.page || 1;
  const skip = (page - 1) * limit;

  const products = await Product.find(filteringQuery, {
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
  })
    .populate("category", ["-__v"])
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    status: httpStatus.success,
    count: products.length,
    page: +page,
    totalPages: Math.ceil((await Product.countDocuments()) / limit),
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
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

  if (!product) {
    const err = new AppError("Product not found", 404);
    return next(err);
  }

  res.status(200).json({
    status: httpStatus.success,
    message: "Product updated",
    product: { id: product._id, name: product.name, slug: product.slug },
  });
});

// @desc Delete a product
// @route DELETE /api/v1/Products/:id
// @access Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    const err = new AppError("Product not found", 404);
    return next(err);
  }

  res.status(204).json({
    status: httpStatus.success,
    message: "Category deleted",
    product: { id: product._id, name: product.name, slug: product.slug },
  });
});
