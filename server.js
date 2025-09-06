const express = require("express");
const morgan = require("morgan");
const connectToDB = require("./config/db");
const appError = require("./middleware/error");

//#region config
require("dotenv").config();

connectToDB();
const app = express();
//#endregion

//#region Middleware
app.use(express.json());
if (process.env.node_env === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.node_env}`);
}
//#endregion

//#region Routes
app.use("/api/v1/categories", require("./routes/category.route"));
app.use("/api/v1/subCategories", require("./routes/subCategory.route"));
app.use("/api/v1/brands", require("./routes/brand.route"));
app.use("/api/v1/products", require("./routes/product.route"));
//#endregion

//#region Error Handling
app.use(appError.notFoundRoute);
app.use(appError.errorHandler);
//#endregion

const server = app.listen(process.env.portNumber, () => {
  console.log(`Server is running on port ${process.env.portNumber}`);
});

//! Handle Exceptions outside express
process.on("unhandledRejection", (err) => {
  console.error("☠️ Unhandled Rejection : ☠️", err.name, err.message);
  server.close(() => {
    console.error("Shutting down...");
    process.exit(1);
  });
});
