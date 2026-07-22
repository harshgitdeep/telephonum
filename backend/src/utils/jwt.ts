import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  email: string;
  name: string;
}

export const generateToken = (payload: JwtPayload): string => {
return jwt.sign(payload, process.env.JWT_SECRET as string, {
  expiresIn: "1h",
});
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as JwtPayload;
};