import express from "express";

import { verifyAccessToken, verifyAdmin } from "../middlewares/auth.js";
import {
  createProduct,
  deleteProduct,
  deleteProductImage,
  updateProduct,
} from "../controllers/product.js";
import getUploadMiddleware from "../middlewares/upload.js";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/category.js";
import { getAllCarts } from "../controllers/cart.js";
import { getAllOrders, updateOrderStatus } from "../controllers/order.js";
import { getAllUsers } from "../controllers/user.js";

const router = express.Router();

// Users
router.get("/users", verifyAccessToken, getAllUsers);

// Products
router.post(
  "/product/create-product",
  verifyAccessToken,
  verifyAdmin,
  getUploadMiddleware().array("images", 5),
  createProduct
);

router.put(
  "/product/:id",
  verifyAccessToken,
  verifyAdmin,
  getUploadMiddleware().array("images", 5),
  updateProduct
);

router.delete("/product/:id", verifyAccessToken, verifyAdmin, deleteProduct);

router.patch(
  "/product/:id/remove-image",
  verifyAccessToken,
  verifyAdmin,
  getUploadMiddleware().none(),
  deleteProductImage
);

// Categories
router.post(
  "/category/create-category",
  verifyAccessToken,
  verifyAdmin,
  getUploadMiddleware().array("images"),
  createCategory
);

router.put(
  "/category/:id",
  verifyAccessToken,
  verifyAdmin,
  getUploadMiddleware().single("images"),
  updateCategory
);
router.delete("/category/:id", verifyAccessToken, verifyAdmin, deleteCategory);

// Carts
router.get("/cart/all-carts", verifyAccessToken, verifyAdmin, getAllCarts);

// Orders
router.get("/orders/all-orders", verifyAccessToken, verifyAdmin, getAllOrders);

router.put("/orders/:id", verifyAccessToken, verifyAdmin, updateOrderStatus);

export default router;
