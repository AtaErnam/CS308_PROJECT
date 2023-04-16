const mongoose = require("mongoose");
const Category = require("./categoryModel");

const productSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  productName: String,
  model: String,
  description: String,
  quantity_in_stocks: String,
  warranty_status: String,
  distributor_info: String,
  categoryName: {
    type: String,
  },
  productDetails: String,
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
