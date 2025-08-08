import express from "express";
import { verifyAccessToken, verifyAdmin } from "../middlewares/auth.js";
import {
  getAllOrders,
  getOrderById,
  getOrders,
  updateOrderStatus,
} from "../controllers/order.js";

const router = express.Router();

router.get("/orders", verifyAccessToken, getOrders);

router.get("/orders/all-orders", verifyAccessToken, verifyAdmin, getAllOrders);
router.get("/orders/:id", verifyAccessToken, getOrderById);

router.put("/orders/:id", verifyAccessToken, verifyAdmin, updateOrderStatus);

export default router;
