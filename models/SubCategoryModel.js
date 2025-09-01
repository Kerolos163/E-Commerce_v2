const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: [true, "SubCategory name must be unique"],
      minlength: [2, "SubCategory name must be at least 2 characters"],
      maxlength: [32, "SubCategory name must be at most 32 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    Category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "SubCategory must belong to a Category"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", SubCategorySchema);
