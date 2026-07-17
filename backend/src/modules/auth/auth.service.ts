import User from "./auth.model";

export const registerUser = async (userData: any) => {
  const { name, email, password } = userData;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return {
      success: false,
      message: "Email already registered",
    };
  }

  const user = await User.create({
    name,
    email,
    password,
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

  if (user.password !== password) {
    return {
      success: false,
      message: "Invalid password",
    };
  }

  return {
    success: true,
    message: "Login successful",
    data: user,
  };
};