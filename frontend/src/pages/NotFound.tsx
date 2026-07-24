import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#030014] text-slate-800 dark:text-gray-100 flex flex-col justify-between overflow-x-hidden transition-colors duration-300">
      <Navbar />

      <div className="flex-grow flex items-center justify-center py-20 relative z-10 px-6">
        {/* Background glow effects & grid */}
        <div className="bg-grid-pattern opacity-10 dark:opacity-40 pointer-events-none absolute inset-0" />
        <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] rounded-full bg-indigo-600/[0.04] dark:bg-indigo-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] rounded-full bg-purple-600/[0.04] dark:bg-purple-600/10 blur-[120px] pointer-events-none" />

        <div className="max-w-md w-full text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {/* Animated Warning Icon with Glow */}
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl animate-pulse" />
              <div className="relative p-5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg text-indigo-600 dark:text-indigo-400">
                <AlertTriangle size={48} className="animate-bounce" />
              </div>
            </div>

            {/* 404 Heading */}
            <h1 className="text-8xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-450 dark:to-purple-400 mb-4 select-none">
              404
            </h1>

            {/* Error Message */}
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Page Not Found
            </h2>
            <p className="text-slate-650 dark:text-gray-400 mb-8 max-w-sm">
              The conversation you are looking for has been disconnected or the URL path does not exist.
            </p>

            {/* Buttons / CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-250 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-gray-250 font-medium transition-all duration-200 shadow-sm cursor-pointer"
              >
                <ArrowLeft size={18} />
                Go Back
              </button>
              <Link
                to="/"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium transition-all duration-200 shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 cursor-pointer"
              >
                <Home size={18} />
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
