const categoryCintroller = require("../controllers/category.controller");
const express = require("express");
const router = express.Router();

router.get("/", categoryCintroller.getAllCategories);

module.exports = router;
