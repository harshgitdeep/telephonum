import express from "express";
import { authenticate } from "../../middleware/auth.middleware";
import {
  login,
  register,
  getMe,
  forgotPasswordController,
  resetPasswordController,
  verifyOTPController,
} from "./auth.controller";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, getMe);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);
router.post("/verify-otp", verifyOTPController);

export default router;