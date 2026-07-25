import { Request, Response, NextFunction } from "express";
import callService from "./call.service";
import { getCallSchema, deleteCallSchema } from "./call.validation";

// Call controller handling routing logic
class CallController {
  /**
   * Create a new call
   * POST /api/v1/calls
   */
  async createCall(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const file = req.file;

      if (!file) {
        res.status(400).json({
          success: false,
          message: "Audio file is required.",
        });
        return;
      }

      const call = await callService.createCall({
        userId: req.user!.userId,
        originalFileName: file.originalname,
        storedFileName: file.filename,
        mimeType: file.mimetype,
        size: file.size,
      });

      res.status(201).json({
        success: true,
        message: "Audio uploaded successfully.",
        data: call,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all calls of logged-in user
   * GET /api/v1/calls
   */
  async getCalls(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const calls = await callService.getCallsByUser(
        req.user!.userId
      );

      res.status(200).json({
        success: true,
        data: calls,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get a single call
   * GET /api/v1/calls/:id
   */
  async getCall(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const parsedParams = getCallSchema.safeParse(req.params);
      if (!parsedParams.success) {
        res.status(400).json({
          success: false,
          message: parsedParams.error.issues[0].message,
        });
        return;
      }

      const call = await callService.getCallById(parsedParams.data.id);

      if (!call) {
        res.status(404).json({
          success: false,
          message: "Call not found.",
        });
        return;
      }

      // Optional security check
      if (call.userId.toString() !== req.user!.userId) {
        res.status(403).json({
          success: false,
          message: "Access denied.",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: call,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete a call
   * DELETE /api/v1/calls/:id
   */
  async deleteCall(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const parsedParams = deleteCallSchema.safeParse(req.params);
      if (!parsedParams.success) {
        res.status(400).json({
          success: false,
          message: parsedParams.error.issues[0].message,
        });
        return;
      }

      const call = await callService.getCallById(parsedParams.data.id);

      if (!call) {
        res.status(404).json({
          success: false,
          message: "Call not found.",
        });
        return;
      }

      // Optional security check
      if (call.userId.toString() !== req.user!.userId) {
        res.status(403).json({
          success: false,
          message: "Access denied.",
        });
        return;
      }

      await callService.deleteCall(parsedParams.data.id);

      res.status(200).json({
        success: true,
        message: "Call deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CallController();