const mongoose = require("mongoose");
const Category = require("./categoryModel");

const productSchema = new mongoose.Schema(
  {
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
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product must belong to a category"],
    },
    productDetails: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "categoryName",
  });

  next();
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
