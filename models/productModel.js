const mongoose = require("mongoose");
const Category = require("./categoryModel");
const Option = require("./optionModel");

const productSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  productName: String,
  categoryName: {
    type: String,
  },
  productDetails: String,
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
