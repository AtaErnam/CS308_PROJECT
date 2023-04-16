const mongoose = require("mongoose");
const Product = require("./productModel");

const categorySchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    categoryName: String,
    products: [
      {
        type: mongoose.Schema.ObjectId,
        ref: Product,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual Populate
categorySchema.virtual('products', {
  ref: 'Product',
  foreignField: 'category',
  localField: '_id',
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
categorySchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});


const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
