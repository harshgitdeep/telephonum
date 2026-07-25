import { Router } from "express";

// Import callController
import callController from "./call.controller";
import { authenticate } from "../../middleware/auth.middleware";
import upload from "../../middleware/upload.middleware";

const router = Router();

/**
 * Create a new call
 * POST /api/v1/calls
 */
router.post(
  "/",
  authenticate,
  upload.single("audio"),
  callController.createCall
);

/**
 * Get all calls of the logged-in user
 * GET /api/v1/calls
 */
router.get(
  "/",
  authenticate,
  callController.getCalls
);

/**
 * Get a single call
 * GET /api/v1/calls/:id
 */
router.get(
  "/:id",
  authenticate,
  callController.getCall
);

/**
 * Delete a call
 * DELETE /api/v1/calls/:id
 */
router.delete(
  "/:id",
  authenticate,
  callController.deleteCall
);

export default router;