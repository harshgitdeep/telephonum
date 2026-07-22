import express from "express";
import { authenticate } from "../../middleware/auth.middleware";
import { getMe } from "./auth.controller";
import {
  login,
  register,
} from "./auth.controller";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me", authenticate, getMe);

export default router;