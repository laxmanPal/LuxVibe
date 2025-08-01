import express from "express";
import { verifyAccessToken } from "../middlewares/auth.js";
import {
  addAddress,
  deleteAddress,
  getAddress,
  setActiveAddress,
} from "../controllers/address.js";

const router = express.Router();

router.post("/add-address", verifyAccessToken, addAddress);

router.get("/addresses", verifyAccessToken, getAddress);

router.patch("/set-active/:id", verifyAccessToken, setActiveAddress);

router.delete("/delete/:id", verifyAccessToken, deleteAddress);

export default router;
