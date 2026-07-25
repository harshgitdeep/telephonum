import express from "express";
import authRoutes from "./modules/auth/auth.routes";
import callRoutes from "./modules/calls/call.routes";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Telephonum API is running 🚀",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/calls", callRoutes);

export default app;