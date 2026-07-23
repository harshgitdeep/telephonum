import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "./auth.model";
import { generateToken } from "../../utils/jwt";
import { sendPasswordResetOTPEmail } from "../../services/email.service";

export const registerUser = async (userData: any) => {
  const { name, email, password } = userData;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return {
      success: false,
      message: "Email already registered",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    success: true,
    message: "User registered successfully",
    data: user,
  };
};

export const loginUser = async (userData: any) => {
  const { email, password } = userData;

  const user = await User.findOne({ email });

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    return {
      success: false,
      message: "Invalid password",
    };
  }

  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
    name: user.name,
  });

  return {
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

const generateAlphanumericOTP = (length: number = 6): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let otp = "";
  const randomBytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    otp += chars[randomBytes[i] % chars.length];
  }
  return otp;
};

const hashOTP = (otp: string): string => {
  return crypto.createHash("sha256").update(otp).digest("hex");
};

export const forgotPasswordService = async (userData: any) => {
  const { email } = userData;

  const user = await User.findOne({ email });

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  const otp = generateAlphanumericOTP(6);
  const hashedOTP = hashOTP(otp);

  user.resetOTP = hashedOTP;
  user.resetOTPExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry
  await user.save();

  try {
    await sendPasswordResetOTPEmail(user.email, otp, user.name);
  } catch (error: any) {
    console.error("Failed to send reset OTP email:", error);
    return {
      success: false,
      message: "Failed to send password reset email. Please try again later.",
    };
  }

  return {
    success: true,
    message: "Password reset OTP sent successfully!",
  };
};

export const resetPasswordService = async (resetData: any) => {
  const { email, otp, newPassword } = resetData;

  const user = await User.findOne({ email });
  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  if (!user.resetOTP || !user.resetOTPExpires) {
    return {
      success: false,
      message: "No password reset request found or OTP has already been verified",
    };
  }

  // Check if OTP is expired
  if (user.resetOTPExpires.getTime() < Date.now()) {
    return {
      success: false,
      message: "OTP has expired. Please request a new one.",
    };
  }

  // Verify the OTP
  const hashedInputOTP = hashOTP(otp.trim().toUpperCase());
  if (user.resetOTP !== hashedInputOTP) {
    return {
      success: false,
      message: "Invalid OTP. Please try again.",
    };
  }

  // Update password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.resetOTP = undefined;
  user.resetOTPExpires = undefined;
  await user.save();

  return {
    success: true,
    message: "Password has been reset successfully!",
  };
};

export const verifyOTPService = async (data: any) => {
  const { email, otp } = data;

  const user = await User.findOne({ email });
  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }

  if (!user.resetOTP || !user.resetOTPExpires) {
    return {
      success: false,
      message: "No active password reset request found",
    };
  }

  if (user.resetOTPExpires.getTime() < Date.now()) {
    return {
      success: false,
      message: "OTP has expired. Please request a new one.",
    };
  }

  const hashedInputOTP = hashOTP(otp.trim().toUpperCase());
  if (user.resetOTP !== hashedInputOTP) {
    return {
      success: false,
      message: "Invalid OTP. Please try again.",
    };
  }

  return {
    success: true,
    message: "OTP verified successfully!",
  };
};
