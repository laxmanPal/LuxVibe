import mongoose from "mongoose";

const addressSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    streetAddress: {
      type: String,
      required: [true, "Please provide street address"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    pincode: {
      type: String,
      required: [true, "Pincode is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    status: {
      type: Boolean,
      default: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["Home", "Work", "Other"],
      default: "Home",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Address", addressSchema);
