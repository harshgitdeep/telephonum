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

export const getCurrentUser = async () => {
    return api.get("/auth/me", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};