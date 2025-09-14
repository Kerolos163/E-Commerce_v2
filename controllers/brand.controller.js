const asyncHandler = require("express-async-handler");
const Brand = require("../models/BrandModel");
const httpStatus = require("../utils/http_status");
const AppError = require("../utils/appError");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handler.controller");

// @desc Get all Brands
// @route GET /api/v1/Brands
// @access Public
exports.getAllBrands = asyncHandler(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(Brand.find(), req.query)
    .filter()
    .search()
    .limitFields()
    .sort()
    .paginate(await Brand.countDocuments());
  const brands = await apiFeatures.mongooseQuery;

  res.status(200).json({
    status: httpStatus.success,
    count: brands.length,
    pagination: {
      limit: apiFeatures.paginationResult.limit,
      currentPage: apiFeatures.paginationResult.page,
      previousPage: apiFeatures.paginationResult.Previous,
      nextPage: apiFeatures.paginationResult.nextPage,
      totalPages: apiFeatures.paginationResult.totalPages,
    },
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
exports.createBrand = factory.createOne(Brand);
//! Create without factory
// exports.createBrand = asyncHandler(async (req, res, next) => {
//   const { name } = req.body;
//   const slug = slugify(name);

//   const brand = new Brand({ name, slug });
//   const result = await brand.save();
//   res.status(201).json({
//     status: httpStatus.success,
//     message: "Brand created",
//     Brand: { id: result._id, name: result.name, slug: result.slug },
//   });
// });

// @desc Update a Brand
// @route PUT /api/v1/brands/:id
// @access Private
exports.updateBrand = factory.updateOne(Brand);
//! Update without factory
// exports.updateBrand = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;

//   const brand = await Brand.findByIdAndUpdate(id, req.body, { new: true });

//   if (!brand) {
//     const err = new AppError(`Brand not found with id ${id}`, 404);
//     return next(err);
//   }

//   res.status(200).json({
//     status: httpStatus.success,
//     message: "Brand updated",
//     Brand: { id: brand._id, name: brand.name, slug: brand.slug },
//   });
// });

// @desc Delete a Brand
// @route DELETE /api/v1/brands/:id
// @access Private

exports.deleteBrand = factory.DeleteOne(Brand);
//! Delete without factory
// exports.deleteBrand = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const brand = await Brand.findByIdAndDelete(id);
//   if (!brand) {
//     const err = new AppError("Brand not found", 404);
//     return next(err);
//   }

//   res.status(204).json({
//     status: httpStatus.success,
//     message: "Brand deleted",
//     Brand: { id: brand._id, name: brand.name, slug: brand.slug },
//   });
// });
