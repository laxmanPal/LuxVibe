import express from "express";
import {
  addToCart,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../controllers/cart.js";
import { verifyAccessToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", verifyAccessToken, addToCart);
router.get("/cart", verifyAccessToken, getCart);
router.put("/update", verifyAccessToken, updateCartItem);
router.delete("/remove", verifyAccessToken, removeCartItem);
router.delete("/clear", verifyAccessToken, clearCart);

export default router;
