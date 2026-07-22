import { Request, Response, NextFunction } from "express";
import User from "../modules/auth/auth.model";
import { verifyToken } from "../utils/jwt";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Read Authorization header
    const authHeader = req.headers.authorization;

    // 2. Check if header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    // 3. Extract token
    const token = authHeader.split(" ")[1];

    // 4. Verify token
    const decoded = verifyToken(token);

    // 5. Find user
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // 6. Attach user to request
    req.user = {
    userId: user._id.toString(),
    email: user.email,
    name: user.name,
};

    // 7. Continue
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};