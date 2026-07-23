import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, KeyRound, Lock, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { forgotPassword, verifyOtp, resetPassword } from "../../services/auth.services";
import { toast } from "react-toastify";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Request OTP, 2: Verify OTP, 3: Reset Password, 4: Success
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await forgotPassword({ email });
      if (response.data.success) {
        toast.success(response.data.message || "OTP sent successfully to your email!");
        setStep(2);
      } else {
        toast.error(response.data.message || "Something went wrong.");
      }
    } catch (error: any) {
      console.error("Request OTP Failed", error);
      const errorMessage =
        error.response?.data?.message || "Failed to request reset code";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (otp.trim().length !== 6) {
      toast.error("Verification code must be exactly 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const response = await verifyOtp({
        email,
        otp: otp.trim().toUpperCase(),
      });

      if (response.data.success) {
        toast.success(response.data.message || "OTP verified successfully!");
        setStep(3);
      } else {
        toast.error(response.data.message || "Invalid OTP.");
      }
    } catch (error: any) {
      console.error("Verify OTP Failed", error);
      const errorMessage =
        error.response?.data?.message || "Invalid or expired verification code";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await resetPassword({
        email,
        otp: otp.trim().toUpperCase(),
        newPassword,
      });

      if (response.data.success) {
        toast.success(response.data.message || "Password reset successfully!");
        setStep(4);
      } else {
        toast.error(response.data.message || "Reset failed.");
      }
    } catch (error: any) {
      console.error("Reset Password Failed", error);
      const errorMessage =
        error.response?.data?.message || "Failed to reset password. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#030014] text-slate-800 dark:text-gray-100 flex flex-col justify-between overflow-x-hidden transition-colors duration-300">
      <Navbar />

      <div className="flex-grow flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
        {/* Background glow effects & grid */}
        <div className="bg-grid-pattern" />
        <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] rounded-full bg-indigo-600/[0.04] dark:bg-indigo-600/10 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[500px] h-[500px] rounded-full bg-purple-600/[0.04] dark:bg-purple-600/10 blur-[130px] pointer-events-none" />

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-[420px] z-10"
        >
          <div className="glass-effect p-8 sm:p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] min-h-[380px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center tracking-tight mb-1">
                    Forgot Password
                  </h2>
                  <p className="text-slate-500 dark:text-gray-400 text-sm text-center mb-8">
                    Enter your email to receive a secure 6-character reset code
                  </p>

                  <form onSubmit={handleRequestOtp} className="flex flex-col gap-5">
                    {/* Email Field */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email-input" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-gray-500">
                          <Mail className="h-4.5 w-4.5" />
                        </div>
                        <input
                          id="email-input"
                          type="email"
                          placeholder="name@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-transparent focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                          required
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="mt-2 w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-[0_0_15px_rgba(99,102,241,0.2)] dark:shadow-[0_0_15px_rgba(99,102,241,0.25)] hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] dark:hover:shadow-[0_0_20px_rgba(99,102,241,0.45)] flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Sending..." : "Send Verification Code"}
                      {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    </button>
                  </form>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center tracking-tight mb-1">
                    Verify Reset Code
                  </h2>
                  <p className="text-slate-500 dark:text-gray-400 text-sm text-center mb-8">
                    We've sent a 6-character code to <strong className="text-slate-800 dark:text-slate-200">{email}</strong>
                  </p>

                  <form onSubmit={handleVerifyOtp} className="flex flex-col gap-5">
                    {/* OTP Code Field */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="otp-input" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                        Verification Code
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-gray-500">
                          <KeyRound className="h-4.5 w-4.5" />
                        </div>
                        <input
                          id="otp-input"
                          type="text"
                          maxLength={6}
                          placeholder="ABC123"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.toUpperCase())}
                          className="block w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 text-sm tracking-widest font-mono focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-transparent focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                          required
                        />
                      </div>
                    </div>

                    {/* Verify Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="mt-2 w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-[0_0_15px_rgba(99,102,241,0.2)] dark:shadow-[0_0_15px_rgba(99,102,241,0.25)] hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] dark:hover:shadow-[0_0_20px_rgba(99,102,241,0.45)] flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Verifying..." : "Verify Code"}
                      {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    </button>
                  </form>

                  <div className="text-center mt-4">
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs text-slate-500 dark:text-gray-400 hover:text-indigo-500 transition-colors inline-flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3 h-3" /> Change email or request new code
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center tracking-tight mb-1">
                    New Password
                  </h2>
                  <p className="text-slate-500 dark:text-gray-400 text-sm text-center mb-8">
                    Choose a strong new password for your account
                  </p>

                  <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
                    {/* New Password Field */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="new-password-input" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                        New Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-gray-500">
                          <Lock className="h-4.5 w-4.5" />
                        </div>
                        <input
                          id="new-password-input"
                          type="password"
                          placeholder="••••••••"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="block w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-transparent focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                          required
                        />
                      </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="confirm-password-input" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-gray-500">
                          <Lock className="h-4.5 w-4.5" />
                        </div>
                        <input
                          id="confirm-password-input"
                          type="password"
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="block w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-transparent focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                          required
                        />
                      </div>
                    </div>

                    {/* Reset Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="mt-4 w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-[0_0_15px_rgba(99,102,241,0.2)] dark:shadow-[0_0_15px_rgba(99,102,241,0.25)] hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] dark:hover:shadow-[0_0_20px_rgba(99,102,241,0.45)] flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Resetting..." : "Reset Password"}
                      {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    </button>
                  </form>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-4"
                >
                  <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-6">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                    Password Reset!
                  </h2>
                  <p className="text-slate-500 dark:text-gray-400 text-sm mb-8 leading-relaxed">
                    Your password has been successfully updated. You can now sign in using your new credentials.
                  </p>
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 shadow-[0_4px_12px_rgba(79,70,229,0.2)]"
                  >
                    Go to Login
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {step !== 4 && (
              <>
                <div className="relative flex py-4 items-center">
                  <div className="flex-grow border-t border-slate-200 dark:border-white/5"></div>
                  <span className="flex-shrink mx-4 text-slate-400 dark:text-gray-500 text-xs font-semibold uppercase tracking-wider">or</span>
                  <div className="flex-grow border-t border-slate-200 dark:border-white/5"></div>
                </div>

                <p className="text-center text-sm text-slate-500 dark:text-gray-400">
                  <Link to="/login" className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Login
                  </Link>
                </p>
              </>
            )}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default ForgotPassword;
