import express from "express";
import { verifyAccessToken, verifyAdmin } from "../middlewares/auth.js";
import {
  addToWishlist,
  clearWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlist.js";

const router = express.Router();

router.post("/add", verifyAccessToken, addToWishlist);
router.get("/wishlist", verifyAccessToken, getWishlist);
router.delete("/remove", verifyAccessToken, removeFromWishlist);
router.delete("/clear", verifyAccessToken, clearWishlist);

export default router;
