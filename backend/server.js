import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";
import wishlistRoutes from "./routes/wishlist.js";
import adminRoutes from "./routes/admin.js";
import addressRoutes from "./routes/address.js";
import paymentRoutes from "./routes/payment.js";
import orderRoutes from "./routes/order.js";

// Dotenv Config
import "dotenv/config";
import { stripeWebhook } from "./controllers/payment.js";

// APP
const app = express();

// Raw body parser only for Stripe Webhook
app.use(
  "/api/payment/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

// PORT
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Payment Routes
app.use("/api/payment", paymentRoutes);

// Auth Routes
app.use("/api/auth", authRoutes);

// Admin Routes
app.use("/api/admin", adminRoutes);

// Products Routes
app.use("/api/product", productRoutes);

// Categories Routes
app.use("/api/category", categoryRoutes);

// Cart Routes
app.use("/api/cart", cartRoutes);

//Order Routes
app.use("/api/order", orderRoutes);

// User Routes
app.use("/api/user", userRoutes);

// Wishlist Routes
app.use("/api/wishlist", wishlistRoutes);

// Address Routes
app.use("/api/address", addressRoutes);

app.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "Image file too large. Max size is 5MB.",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Something went wrong",
    error: err.message,
  });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`MongoDB connected\nApp running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
