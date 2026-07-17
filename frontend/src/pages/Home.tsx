import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="relative min-h-screen bg-[#030014] text-gray-100 overflow-hidden flex flex-col justify-between">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[140px] pointer-events-none" />

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#030014]/65 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 text-lg font-semibold tracking-tight hover:opacity-90 transition-opacity">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Telephonum</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link 
              to="/register" 
              className="relative group px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center">
        <section className="max-w-7xl mx-auto px-6 py-20 text-center flex flex-col items-center z-10">
          {/* Tag badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-semibold text-indigo-300 mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Introducing Telephonum AI 1.0</span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-4xl leading-[1.08] mb-6 text-white"
          >
            Analyze Conversations. <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Unlock Deep Intelligence.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg sm:text-xl max-w-2xl leading-relaxed mb-10"
          >
            Understand customer sentiment, agent response performance, and key topic clusters automatically using our production-ready AI conversation intelligence engine.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link 
              to="/register" 
              className="px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] flex items-center justify-center gap-2 group"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/login" 
              className="px-6 py-3.5 rounded-xl font-semibold text-gray-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 flex items-center justify-center"
            >
              Request Demo
            </Link>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 bg-[#030014]/80 backdrop-blur-md py-12 z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white text-sm">Telephonum AI</span>
          </div>
          <div className="text-xs text-gray-500">
            &copy; 2026 Telephonum. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;