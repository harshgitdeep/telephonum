import api from "./api";

export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return api.post("/auth/register", data);
};

export const loginUser = (data: {
  email: string;
  password: string;
}) => {
  return api.post("/auth/login", data);
};

export const forgotPassword = (data: {
  email: string;
}) => {
  return api.post("/auth/forgot-password", data);
};

export const resetPassword = (data: {
  email: string;
  otp: string;
  newPassword: string;
}) => {
  return api.post("/auth/reset-password", data);
};

export const verifyOtp = (data: {
  email: string;
  otp: string;
}) => {
  return api.post("/auth/verify-otp", data);
};

export const getCurrentUser = async () => {
    return api.get("/auth/me", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};