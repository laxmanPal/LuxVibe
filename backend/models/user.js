import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    avatar: {
      url: { type: String, default: "" },
      public_id: { type: String, default: "" },
    },
    phone: {
      type: Number,
      default: null,
    },
    verify_email: {
      type: Boolean,
      default: false,
    },
    last_login: {
      type: Date,
      default: null,
    },
    access_token: {
      type: String,
      default: "",
    },
    refresh_token: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Active", "Blocked"],
      default: "Active",
    },
    addresses: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Address",
      },
    ],
    cart:{
        type: mongoose.Schema.ObjectId,
        ref: "Cart",
      },
    orders: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Order",
      },
    ],
    otp: {
      type: String,
      default: null,
    },
    otp_expiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
