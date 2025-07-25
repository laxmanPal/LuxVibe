import express from "express";
import {
  addToCart,
  clearCart,
  getAllCarts,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../controllers/cart.js";
import { verifyAccessToken, verifyAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", verifyAccessToken, addToCart);
router.get("/cart", verifyAccessToken, getCart);
router.put("/update", verifyAccessToken, updateCartItem);
router.delete("/remove", verifyAccessToken, removeCartItem);
router.delete("/clear", verifyAccessToken, clearCart);
router.get("/all-carts", verifyAccessToken, verifyAdmin, getAllCarts);
export default router;
