import express from "express";
import {
  createStripeCheckoutSession,
  stripeWebhook,
} from "../controllers/payment.js";
import { verifyAccessToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/stripe/checkout", verifyAccessToken, createStripeCheckoutSession);

router.post("/webhook", stripeWebhook);

export default router;
