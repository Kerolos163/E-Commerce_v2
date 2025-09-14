const SubCategory = require("../models/SubCategoryModel");
const factory = require("./handler.controller");

// @route GET /api/v1/categories/:categoryId/subcategories
exports.CreateFilter = (req, res, next) => {
  let filter = {};
  if (req.params.categoryId) filter = { category: req.params.categoryId };
  req.filter = filter;
  next();
};

// @desc Get all subcategories
// @route GET /api/v1/subcategories
// @access Public
exports.getAllSubCategory = factory.getAll(SubCategory);
//! Get Without Factory
// exports.getAllSubCategory = asyncHandler(async (req, res, next) => {
//   const apiFeatures = new ApiFeatures(SubCategory.find(), req.query)
//     .filter()
//     .search()
//     .limitFields()
//     .sort()
//     .paginate(await SubCategory.countDocuments());
//   const subCategory = await apiFeatures.mongooseQuery.populate("category", [
//     "-__v",
//   ]);

//   res.status(200).json({
//     status: httpStatus.success,
//     count: subCategory.length,
//     pagination: {
//       limit: apiFeatures.paginationResult.limit,
//       currentPage: apiFeatures.paginationResult.page,
//       previousPage: apiFeatures.paginationResult.Previous,
//       nextPage: apiFeatures.paginationResult.nextPage,
//       totalPages: apiFeatures.paginationResult.totalPages,
//     },
//     subCategory,
//   });
// });

// @desc Get single subcategories
// @route GET /api/v1/subcategories/:id
// @access Public
exports.getSubCategoryById = factory.getOne(SubCategory, "category");
//! Get Without Factory
// exports.getSubCategoryById = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const subCategory = await SubCategory.findById(id, {
//     __v: 0,
//     createdAt: 0,
//     updatedAt: 0,
//   }).populate("category", ["-__v"]);
//   if (!subCategory) {
//     const err = new AppError("SubCategory not found", 404);
//     return next(err);
//   }
//   res.status(200).json({
//     status: httpStatus.success,
//     subCategory,
//   });
// });

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};
// @desc Create new subcategories
// @route POST /api/v1/subcategories
// @access Private
exports.createSubCategory = factory.createOne(SubCategory);
//! Create Without Factory
// exports.createSubCategory = asyncHandler(async (req, res, next) => {
//   const { name, category } = req.body;
//   const slug = slugify(name);

//   const subCategory = new SubCategory({ name, slug, category });
//   const result = await subCategory.save();

//   res.status(201).json({
//     status: httpStatus.success,
//     message: "SubCategory created",
//     subCategory: {
//       id: result._id,
//       name: result.name,
//       slug: result.slug,
//       category: result.category,
//     },
//   });
// });

// @desc Update subcategories
// @route PUT /api/v1/subcategories/:id
// @access Private
exports.updateSubCategory = factory.updateOne(SubCategory);
//! Update Without Factory
// exports.updateSubCategory = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const { name, category } = req.body;
//   const slug = slugify(name);

//   const result = await SubCategory.findByIdAndUpdate(
//     id,
//     { name, slug, category },
//     { new: true }
//   );
//   if (!result) {
//     const err = new AppError("SubCategory not found", 404);
//     return next(err);
//   }

//   res.status(200).json({
//     status: httpStatus.success,
//     message: "SubCategory updated",
//     subCategory: {
//       id: result._id,
//       name: result.name,
//       slug: result.slug,
//       category: result.category,
//     },
//   });
// });

// @desc Delete subcategories
// @route DELETE /api/v1/subcategories/:id
// @access Private
exports.deleteSubCategory = factory.DeleteOne(SubCategory);
//! Delete Without Factory
// exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const result = await SubCategory.findByIdAndDelete(id);

//   if (!result) {
//     const err = new AppError("SubCategory not found", 404);
//     return next(err);
//   }

//   res.status(200).json({
//     status: httpStatus.success,
//     message: "SubCategory deleted",
//     subCategory: {
//       id: result._id,
//       name: result.name,
//       slug: result.slug,
//       category: result.category,
//     },
//   });
// });
