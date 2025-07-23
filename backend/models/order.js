import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: "product",
      required: true,
    },
    paymentId: {
      type: String,
      default: "",
    },
    payment_status: {
      type: String,
      default: "",
    },
    delivery_address: {
      type: mongoose.Schema.ObjectId,
      ref: "address",
      required: true,
    },
    total_amount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
