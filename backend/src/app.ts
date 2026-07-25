import express from "express";
import authRoutes from "./modules/auth/auth.routes";
import callRoutes from "./modules/calls/call.routes";
import cors from "cors";
import path from "path";
import { sendEmail } from "./services/email.service";
import User from "./modules/auth/auth.model";
import Call from "./modules/calls/call.model";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Serve uploaded audio files statically
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Telephonum API is running 🚀",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/calls", callRoutes);

// Contact endpoint
app.post("/api/v1/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      res.status(400).json({ success: false, message: "All fields are required." });
      return;
    }

    await sendEmail({
      to: "harshzone3@gmail.com",
      subject: `New Contact Form Submission: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #4f46e5; margin-bottom: 20px;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background-color: #f8fafc; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0; color: #334155;">${message}</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="color: #94a3b8; font-size: 12px; text-align: center;">© ${new Date().getFullYear()} Telephonum. All rights reserved.</p>
        </div>
      `,
    });

    res.status(200).json({ success: true, message: "Message sent successfully." });
  } catch (error: any) {
    console.error("Failed to send contact email:", error);
    res.status(500).json({ success: false, message: "Failed to send email. Please try again later." });
  }
});

// Public Stats endpoint
app.get("/api/v1/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCalls = await Call.countDocuments();
    const completedCalls = await Call.countDocuments({ status: "COMPLETED" });

    // Compute average confidence
    const completedWithConfidence = await Call.find({ status: "COMPLETED", "transcription.confidence": { $exists: true } });
    let avgConfidence = 92.4;
    if (completedWithConfidence.length > 0) {
      const sum = completedWithConfidence.reduce((acc, c) => acc + (c.transcription?.confidence || 0), 0);
      avgConfidence = Math.round((sum / completedWithConfidence.length) * 1000) / 10;
      if (avgConfidence > 100) avgConfidence = Math.round(avgConfidence / 10);
    }

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalCalls,
        completedCalls,
        avgConfidence,
      }
    });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    res.status(500).json({ success: false, message: "Failed to fetch stats." });
  }
});

export default app;