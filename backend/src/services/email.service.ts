import "dotenv/config";
import nodemailer from "nodemailer";

// Create reusable transporter object using SMTP transport (configured for Gmail by default)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transport verification failed:", error.message);
  } else {
    console.log("✅ Email transport is ready to send messages");
  }
});

interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export const sendEmail = async (options: SendEmailOptions): Promise<void> => {
  const mailOptions = {
    from: `"${process.env.SMTP_FROM_NAME || 'Telephonum'}" <${process.env.SMTP_FROM_EMAIL || 'noreply@telephonum.com'}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};

export const sendPasswordResetOTPEmail = async (
  email: string,
  otp: string,
  name: string
): Promise<void> => {
  const subject = "Password Reset OTP - Telephonum";
  const text = `Hi ${name},\n\nYou requested a password reset. Your 6-character verification code is: ${otp}\n\nThis code will expire in 10 minutes. If you did not request this, please ignore this email.`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #4f46e5; margin-bottom: 20px;">Telephonum Password Reset</h2>
      <p>Hi <strong>${name}</strong>,</p>
      <p>We received a request to reset your password. Use the following 6-character verification code to complete the reset process:</p>
      <div style="margin: 30px 0; text-align: center;">
        <span style="background-color: #f1f5f9; color: #4f46e5; padding: 12px 24px; font-size: 24px; font-family: monospace; font-weight: bold; border-radius: 6px; letter-spacing: 4px; display: inline-block;">${otp}</span>
      </div>
      <p style="color: #64748b; font-size: 14px;">This code will expire in 10 minutes. If you did not request this, please ignore this email or contact support if you have concerns.</p>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="color: #94a3b8; font-size: 12px; text-align: center;">© ${new Date().getFullYear()} Telephonum. All rights reserved.</p>
    </div>
  `;

  await sendEmail({
    to: email,
    subject,
    text,
    html,
  });
};