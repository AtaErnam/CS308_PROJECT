const mongoose = require("mongoose");

const refundSchema = mongoose.Schema(
  {
    orderItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
      required: true,
    },
    address: {
      type: String,
      required: true,
      default: "My home",
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Approved"],
      default: "Pending",
    },
    totalPrice: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Refund = mongoose.model("Refund", refundSchema);

module.exports = Refund;
