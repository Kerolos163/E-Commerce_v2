const httpStatus = require("../utils/http_status");
const appError = require("../utils/appError");
exports.notFoundRoute = (req, res, next) => {
  const err = new appError(`Not Found - ${req.originalUrl}`, 404);
  next(err);
};

exports.errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || httpStatus.error;

  if (process.env.node_env === "development") {
    sendErrorForDev(res, err);
  } else {
    sendErrorForProd(res, err);
  }
};

//? Send detailed error in development mode
const sendErrorForDev = (res, err) => {
  return res.status(err.statusCode).json({
    Error: {
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    },
  });
};

//! Send simplified error in production mode
const sendErrorForProd = (res, err) => {
  return res.status(err.statusCode).json({
    Error: {
      status: err.status,
      message: err.message,
    },
  });
};
