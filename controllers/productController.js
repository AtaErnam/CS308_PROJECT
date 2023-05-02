/* eslint-disable prettier/prettier */
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
const Product = require("./../models/productModel");
const APIFeatures = require("./../utils/apiFeatures");


exports.getAllProduct = factory.getAll(Product);

/* exports.getAllProduct = catchAsync(async (req, res) => {
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const product = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: product.length,
    data: {
      product,
    },
  });
}); */

exports.getProduct = factory.getOne(Product, { path: "reviews" });

/* exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  // product.findOne({_id: req.params.id})
  console.log(product);

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
}); */

exports.createProduct = factory.createOne(Product)

/* catchAsync(async (req, res,next) => {
  const product = await Product.create(req.body);

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(201).json({
    status: "success",
    data: {
      product: product,
    },
  });
}); */

exports.updateProduct = catchAsync(async (req, res,next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      product: product,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
