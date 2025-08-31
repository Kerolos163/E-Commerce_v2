const httpStatus = require("../utils/http_status");
const appError = require("../utils/appError");
exports.notFoundRoute = (req, res, next) => {
  const err = new appError(`Not Found - ${req.originalUrl}`, 404);
  next(err);
};

exports.errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || httpStatus.error;
  res.status(err.statusCode).json({
    Error: {
      status: err.status,
      message: err.message,
      stack: err.stack,
    },
  });
};
