const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Brand = require("../models/BrandModel");
const httpStatus = require("../utils/http_status");
const AppError = require("../utils/appError");

// @desc Get all Brands
// @route GET /api/v1/Brands
// @access Public
exports.getAllBrands = asyncHandler(async (req, res, next) => {
  const limit = +req.query.limit || 10;
  const page = +req.query.page || 1;
  const skip = (page - 1) * limit;

  const brands = await Brand.find(
    {},
    { __v: 0, createdAt: 0, updatedAt: 0 }
  )
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    status: httpStatus.success,
    page: +page,
    totalPages: Math.ceil((await Brand.countDocuments()) / limit),
    brands,
  });
});

// @desc Get brands by ID
// @route GET /api/v1/brands/:id
// @access Public
exports.getBrandById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id, {
    __v: 0,
    createdAt: 0,
    updatedAt: 0,
  });
  if (!brand) {
    const err = new AppError("Brand not found", 404);
    return next(err);
  }

  res.status(200).json({
    status: httpStatus.success,
    brand,
  });
});

// @desc Create a new brand
// @route POST /api/v1/brands
// @access Private
exports.createBrand = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const slug = slugify(name);

  const brand = new Brand({ name, slug });
  const result = await brand.save();
  res.status(201).json({
    status: httpStatus.success,
    message: "Brand created",
    Brand: { id: result._id, name: result.name, slug: result.slug },
  });
});

// @desc Update a Brand
// @route PUT /api/v1/brands/:id
// @access Private
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const slug = slugify(name);

  const brand = await Brand.findByIdAndUpdate(
    id,
    { name, slug },
    { new: true }
  );

  if (!brand) {
    const err = new AppError("Brand not found", 404);
    return next(err);
  }

  res.status(200).json({
    status: httpStatus.success,
    message: "Brand updated",
    Brand: { id: brand._id, name: brand.name, slug: brand.slug },
  });
});

// @desc Delete a Brand
// @route DELETE /api/v1/brands/:id
// @access Private
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);
  if (!brand) {
    const err = new AppError("Brand not found", 404);
    return next(err);
  }

  res.status(204).json({
    status: httpStatus.success,
    message: "Brand deleted",
    Brand: { id: brand._id, name: brand.name, slug: brand.slug },
  });
});
