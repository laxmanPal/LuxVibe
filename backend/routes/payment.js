import express from "express";
import {
  createStripeCheckoutSession,
} from "../controllers/payment.js";
import { verifyAccessToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/stripe/checkout", verifyAccessToken, createStripeCheckoutSession);

export default router;
