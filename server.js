const express = require("express");
const morgan = require("morgan");
const connectToDB = require("./config/db");
require("dotenv").config();

connectToDB();
const app = express();

//#region Middleware
app.use(express.json());
if (process.env.node_env === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.node_env}`);
}
//#endregion

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.portNumber, () => {
  console.log(`Server is running on port ${process.env.portNumber}`);
});
