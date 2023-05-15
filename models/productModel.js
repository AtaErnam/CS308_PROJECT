const mongoose = require("mongoose");
const Category = require("./categoryModel");

const productSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    productName: { type: String, default: "" },
    model: { type: String, default: "" },
    description: { type: String, default: "" },
    quantity_in_stocks: { type: Number, default: 10 },
    price: { type: Number, default: 1000 },
    warranty_status: { type: String, default: "good" },
    distributor_info: { type: String, default: "abc co." },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product must belong to a category"],
    },
    productDetails: { type: String, default: "" },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    discountRate: {
      type: Number,
      default: 0,
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//tourSchema.index({ price: 1 });
productSchema.index({ price: 1, ratingsAverage: -1 });
productSchema.index({ slug: 1 });

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "categoryName",
  });

  next();
});

// Virtual Populate
productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});

productSchema.statics.calcDiscount = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: "$product",
        discount: { $avg: "$discountRate" },
      },
    },
  ]);

  console.log("-------------");
  console.log(stats);
  console.log("---------");

  const DiscountedPrice = this.price - stats[0] * this.price;

  if (stats.length > 0) {
    if (stats === null) {
      await Product.findByIdAndUpdate(productId, {
        discountPrice: DiscountedPrice,
      });
    }
  } else {
    await Product.findByIdAndUpdate(productId, {
      discountPrice: this.price,
    });
  }
};

productSchema.post("save", function () {
  // this points to current product
  this.constructor.calcDiscount(this.product);
});

// findByIdAndUpdate
// findByIdAndDelete
productSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  console.log(this.r);
  next();
});

productSchema.post(/^findOneAnd/, async function () {
  // await this.findOne(); does NOT work here, query has already executed
  await this.r.constructor.calcDiscount(this.r.product);
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
