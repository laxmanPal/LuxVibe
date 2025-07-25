import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"
import categoryRoutes from "./routes/category.js"
import productRoutes from "./routes/product.js"
import cartRoutes  from "./routes/cart.js"
import wishlistRoutes  from "./routes/wishlist.js"


// Dotenv Config
import 'dotenv/config'

// APP
const app = express();

// PORT
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Auth Routes
app.use("/api/auth", authRoutes );

// User Routes
app.use("/api/user", userRoutes );

// Cart Routes
app.use("/api/cart", cartRoutes );

// Wishlist Routes
app.use("/api/wishlist", wishlistRoutes );

// Admin Routes
      // Categories
      app.use("/api/admin/category", categoryRoutes );
      // Products
      app.use("/api/admin/product", productRoutes );


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
