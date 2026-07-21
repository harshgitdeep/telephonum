import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { loginUser } from "../../services/auth.services";
import { toast } from "react-toastify";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await loginUser({
        email,
        password,
      });

      console.log("Login Successful");
      toast.success("Login Successful!");
      navigate("/");
    } catch (error: any) {
      console.error("Login Failed", error);
      const errorMessage = error.response?.data?.message || "Login Failed";
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
          <div className="glass-effect p-8 sm:p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            {/* Logo */}
            <Link to="/" className="flex flex-col items-center gap-1.5 mb-8 group">
              <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent tracking-tight">
                Telephonum
              </span>
            </Link>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center tracking-tight mb-1">
              Welcome Back
            </h2>
            <p className="text-slate-500 dark:text-gray-400 text-sm text-center mb-8">
              Sign in to continue to your dashboard
            </p>

            <form onSubmit={handleLogin} className="flex flex-col gap-5">
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

              {/* Password Field */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password-input" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                    Password
                  </label>
                  <a href="#forgot" className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline transition-colors">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 dark:text-gray-500">
                    <Lock className="h-4.5 w-4.5" />
                  </div>
                  <input
                    id="password-input"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                {isLoading ? "Signing In..." : "Sign In"}
                {!isLoading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>

            <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-slate-200 dark:border-white/5"></div>
              <span className="flex-shrink mx-4 text-slate-400 dark:text-gray-500 text-xs font-semibold uppercase tracking-wider">or</span>
              <div className="flex-grow border-t border-slate-200 dark:border-white/5"></div>
            </div>

            <p className="text-center text-sm text-slate-500 dark:text-gray-400">
              Don't have an account?{" "}
              <Link to="/register" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors">
                Sign Up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;