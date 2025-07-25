import express from "express";
import { verifyAccessToken } from "../middlewares/auth.js";
import { updateUserDetails, uploadAvatar } from "../controllers/user.js";
import getUploadMiddleware from "../middlewares/upload.js";

const router = express.Router();

router.post(
  "/upload-avatar",
  verifyAccessToken,
  getUploadMiddleware().single("avatar"),
  uploadAvatar
);

router.put("/update-user-detail", verifyAccessToken, updateUserDetails);

export default router;
