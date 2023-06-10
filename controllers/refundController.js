/* eslint-disable prettier/prettier */
const Refund = require("../models/refundModel");
const Product = require("../models/productModel");
const factory = require("./handlerFactory");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const InvoiceGenerator = require("../utils/pdf");
const OrderItem = require("../models/orderItemModel");
const Invoice = require("../models/invoiceModel");

exports.refundOrderItem = catchAsync(async (req, res, next) => {
  let refundOrderItem = req.body.orderItem;
  refundOrderItem = await OrderItem.findById(refundOrderItem);
  console.log(refundOrderItem);
  const refundProduct = await Product.findById(refundOrderItem.product);
  console.log(refundProduct);

  const timePassed = refundOrderItem.dateOrdered;
  timePassed.setMonth(timePassed.getMonth() + 1);
  /* if (Date.now() > timePassed) {
    return next(
      new AppError("This product has expired its time for refund", 404)
    );
  } */

  let refund = new Refund({
    orderItem: refundOrderItem,
    address: req.body.address,
    status: "Pending",
    totalPrice: refundProduct.price,
    user: req.user,
  });
  refund = await refund.save();

  res.status(201).json({
    status: "success",
    data: {
      data: refund,
    },
  });
});

exports.getAllPendingRefunds = catchAsync(async (req, res, next) => {
  // To allow for nested GET reviews on Tour
  let filter = { isPending: { $ne: false } };
  if (req.params.refundId) {
    console.log("lol");
    filter = {
      query: { refund: req.params.refundId, isPending: { $ne: false } },
    };
  }

  const features = new APIFeatures(Refund.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  //const doc = await features.query.explain();
  const refund = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: refund.length,
    data: {
      data: refund,
    },
  });
});

exports.getAllRefunds = catchAsync(async (req, res, next) => {
  // To allow for nested GET reviews on Tour
  let filter = {};
  if (req.params.refundId) {
    filter = {
      refund: req.params.refundId,
    };
  }

  const features = new APIFeatures(Refund.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  //const doc = await features.query.explain();
  const refund = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: refund.length,
    data: {
      data: refund,
    },
  });
});

//factory.getAll(Review);

exports.setProductUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.product) req.body.product = req.params.productId;
  req.body.user = req.user.id;
  next();
};

exports.getRefund = catchAsync(async (req, res, next) => {
  let query = Refund.findById(req.params.id);

  const refund = await query;
  // Tour.findOne({ _id: req.params.id })
  console.log(refund);
  if (!refund) {
    return next(new AppError("This refund is not found", 404));
  } /* 
  if (!refund.isPending) {
    return next(new AppError("This refund is not approved yet", 404));
  } */

  res.status(200).json({
    status: "success",
    data: {
      data: refund,
    },
  });
});
//factory.getOne(Review);

//exports.createRefund = factory.createOne(Refund);

exports.updateRefund = factory.updateOne(Refund);

exports.deleteRefund = factory.deleteOne(Refund);

exports.approveRefund = catchAsync(async (req, res, next) => {
  const refund = await Refund.findById(req.params.id);

  if (!refund) {
    return next(new AppError("No document found with that ID", 404));
  }

  const refundedOrderItem = await OrderItem.findById(refund.orderItem);
  console.log(refundedOrderItem);
  const refundedProduct = await Product.findById(refundedOrderItem.product);

  refundedProduct.quantity_in_stocks = refundedProduct.quantity_in_stocks + 1;
  refundedProduct.save();
  refund.status = "Approved";
  refund.save();

  let invoice = new Invoice({
    orderItems: refundedOrderItem,
    address: refund.address,
    status: "Refunded",
    totalPrice: refundedProduct.price,
    user: req.user,
    invoiceType: "RefundApproval",
  });

  console.log("------------------------STUFF ABOUT INVOICE");
  console.log(invoice);
  console.log("------------------------STUFF ABOUT INVOICE");

  const genPDF = new InvoiceGenerator(invoice);
  genPDF.generate();

  res.status(200).json({
    status: "success",
    data: {
      data: refund,
    },
  });
});
