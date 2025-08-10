import express from "express";
import { verifyAccessToken } from "../middlewares/auth.js";
import { getOrderById, getOrders } from "../controllers/order.js";

const router = express.Router();

router.get("/orders", verifyAccessToken, getOrders);

router.get("/:id", verifyAccessToken, getOrderById);

export default router;
