const mongoose = require("mongoose");
const Product = require("./productModel");

const categorySchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  categoryName: String,
  productsInside: [
    {
      type: mongoose.Schema.ObjectId,
      ref: Product,
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
