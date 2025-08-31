const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: [true, "Category name must be unique"],
      minlength: [3, "Category name must be at least 3 characters"],
      maxlength: [32, "Category name must be at most 32 characters"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
