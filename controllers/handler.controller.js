const asyncHandler = require("express-async-handler");
const AppError = require("../utils/appError");
const ApiFeatures = require("../utils/apiFeatures");
const httpStatus = require("../utils/http_status");

exports.DeleteOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await model.findByIdAndDelete(id);

    if (!document) {
      const err = new AppError(`No decument for this id ${id}`, 404);
      return next(err);
    }

    res.status(200).json({
      status: httpStatus.success,
      message: "decument deleted",
      subCategory: {
        id: document._id,
        name: document.name,
        slug: document.slug,
        category: document.category,
      },
    });
  });

exports.updateOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const decument = await model.findByIdAndUpdate(id, req.body, { new: true });

    if (!decument) {
      const err = new AppError(`Decument not found with id ${id}`, 404);
      return next(err);
    }

    res.status(200).json({
      status: httpStatus.success,
      message: "Decument updated",
      Brand: { id: decument._id, name: decument.name, slug: decument.slug },
    });
  });

exports.createOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const result = await model.create(req.body);
    res.status(201).json({
      status: httpStatus.success,
      message: "Brand created",
      document: { id: result._id, name: result.name, slug: result.slug },
    });
  });

exports.getOne = (model, populateOptions) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const mongooseQuery = model.findById(id, {
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });
    let document;
    if (populateOptions) {
      document = await mongooseQuery.populate(populateOptions, ["-__v"]);
    } else {
      document = await mongooseQuery;
    }

    if (!document) {
      const err = new AppError(`No document for this id ${id}`, 404);
      return next(err);
    }

    res.status(200).json({
      status: httpStatus.success,
      document,
    });
  });

exports.getAll = (model, modelName) =>
  asyncHandler(async (req, res, next) => {
    const apiFeatures = new ApiFeatures(model.find(), req.query)
      .filter()
      .search(modelName)
      .limitFields()
      .sort()
      .paginate(await model.countDocuments());

    const documents = await apiFeatures.mongooseQuery;

    res.status(200).json({
      status: httpStatus.success,
      count: documents.length,
      pagination: {
        limit: apiFeatures.paginationResult.limit,
        currentPage: apiFeatures.paginationResult.page,
        previousPage: apiFeatures.paginationResult.Previous,
        nextPage: apiFeatures.paginationResult.nextPage,
        totalPages: apiFeatures.paginationResult.totalPages,
      },
      documents,
    });
  });
