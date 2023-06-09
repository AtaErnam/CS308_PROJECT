const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
const Product = require("./../models/productModel");
const APIFeatures = require("./../utils/apiFeatures");
const User = require("../models/userModel");
const OrderItem = require("../models/orderItemModel");
const Order = require("../models/orderModel");



exports.getAllOrders = catchAsync(async (req, res) => {
  const orderList = await Order.find()
    .populate("user", "name")
    .sort({ dateOrdered: -1 });

  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});

exports.getOrder = catchAsync(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: {
        path: "product",
        populate: "category",
      },
    });

  if (!order) {
    res.status(500).json({ success: false });
  }
  res.send(order);
});

exports.createOrder = catchAsync(async (req, res, next) => {
  let stock_error = false;

  const orderItemsIds = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });

      newOrderItem = await newOrderItem.save();
      return newOrderItem._id;
    })
  );

  console.log(typeof orderItemsIds);

  const orderItemsIdsResolved = await orderItemsIds;

  const totalPrices = await Promise.all(
    orderItemsIdsResolved.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById({ _id: orderItemId }).populate(
        "product",
        "price"
      );
      console.log(orderItem.product);
      const totalPrice = orderItem.product.price * orderItem.quantity;
      return totalPrice;
    })
  );

  const totalQuantities = await Promise.all(
    orderItemsIdsResolved.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        "product",
        "quantity"
      );

      console.log(orderItem.product.id);
      const currOrderProd = await Product.findById(orderItem.product.id);
      console.log(currOrderProd.quantity_in_stocks);
      if (currOrderProd.quantity_in_stocks < orderItem.quantity) {
        stock_error = true;
      }

      const totalQuantity = orderItem.quantity;
      return totalQuantity;
    })
  );

  const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
  const totalQuantity = totalQuantities.reduce((a, b) => a + b, 0);

  if (stock_error) {
    return next(new AppError("No enough stock", 403));
  }

  let order = new Order({
    orderItems: orderItemsIdsResolved,
    address: req.body.address,
    status: req.body.status,
    totalPrice: totalPrice,
    totalQuantity: totalQuantity,
    user: req.body.user,
  });
  order = await order.save();

  if (!order) return res.status(400).send("the order cannot be created!");

  res.status(200).json({
    status: "success",
    data: {
      product: order,
    },
  });
});

exports.purchaseOrder = catchAsync(async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: "Purchased",
      dateOrdered: Date.now(),
    },
    { new: true }
  );

  if (!order) {
    return next(new AppError("No order found with that ID", 404));
  }
  console.log(order.orderItems);

  const orderItemsIds = Promise.all(
    order.orderItems.map(async (orderItem) => {
      console.log("----");
      console.log(req.user.id);
      console.log("----");
      let newOrderItem = await OrderItem.findByIdAndUpdate(orderItem, {
        user: req.user.id,
        dateOrdered: Date.now(),
      });

      console.log(newOrderItem);
      return newOrderItem._id;
    })
  );

  const orderItemsIdsResolved = await orderItemsIds;

  await Promise.all(
    orderItemsIdsResolved.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        "product",
        "quantity"
      );

      console.log(orderItem.product.id);
      const currOrderProd = await Product.findById(orderItem.product.id);
      console.log(typeof currOrderProd.quantity_in_stocks);
      console.log(typeof orderItem.quantity);

      let updatedQuantity =
        currOrderProd.quantity_in_stocks - orderItem.quantity;
      console.log(updatedQuantity);
      await Product.findByIdAndUpdate(orderItem.product.id, {
        quantity_in_stocks: updatedQuantity,
      });

      const totalQuantity = orderItem.quantity;
      return totalQuantity;
    })
  );

  res.status(200).json({
    status: "success",
    data: {
      product: order,
    },
  });
});

exports.deleteOrder = (req, res) => {
  Order.findByIdAndRemove(req.params.id)
    .then(async (order) => {
      if (order) {
        await order.orderItems.map(async (orderItem) => {
          await OrderItem.findByIdAndRemove(orderItem);
        });
        return res
          .status(200)
          .json({ success: true, message: "the order is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "order not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
};
