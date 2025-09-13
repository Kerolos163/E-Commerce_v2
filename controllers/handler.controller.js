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
