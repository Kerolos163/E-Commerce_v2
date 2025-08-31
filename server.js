const express = require("express");
const morgan = require("morgan");
const connectToDB = require("./config/db");

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
//#endregion

app.listen(process.env.portNumber, () => {
  console.log(`Server is running on port ${process.env.portNumber}`);
});
