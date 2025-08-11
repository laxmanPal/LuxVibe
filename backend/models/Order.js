import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    size: String, // optional, if your products support sizes
    color: String, // optional
    price: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
    },

    shippingAddress: {
      fullName: { type: String, required: true },
      streetAddress: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, required: true },
    },

    paymentMethod: {
      type: String,
      required: true,
      enum: ["COD", "Stripe", "PayPal", "Razorpay"],
    },

    paymentStatus: {
      isPaid: { type: Boolean, default: false },
      paidAt: Date,
      paymentId: String, // e.g. Stripe ID, Razorpay ID, etc.
      method: String, // Store the confirmed payment method (optional redundancy)
    },

    orderStatus: {
      type: String,
      enum: [
        "Pending", // Just placed, waiting for confirmation/payment
        "Confirmed", // Payment confirmed or COD accepted
        "Processing", // Being packed
        "Shipped", // Shipped out
        "Delivered", // Customer received
        "Cancelled", // Cancelled manually or failed
        "Returned", // Optional
      ],
      default: "Pending",
    },

    deliveryStatus: {
      isDelivered: { type: Boolean, default: false },
      deliveredAt: Date,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    shippingFee: {
      type: Number,
      default: 0,
    },

    taxAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
