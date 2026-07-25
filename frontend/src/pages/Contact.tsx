import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, PhoneCall, MapPin, Send } from "lucide-react";
import { toast } from "react-toastify";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Contact = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await api.post("/contact", {
        name,
        email,
        subject,
        message,
      });

      if (response.data.success) {
        toast.success("Thank you! Your message has been sent successfully.");
        setSubject("");
        setMessage("");
        if (!user) {
          setName("");
          setEmail("");
        }
      }
    } catch (error: any) {
      console.error("Failed to send contact message:", error);
      toast.error(error.response?.data?.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#030014] text-slate-800 dark:text-gray-100 flex flex-col justify-between overflow-x-hidden transition-colors duration-300">
      <Navbar />

      <div className="flex-grow max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Background glow effects & grid */}
        <div className="bg-grid-pattern opacity-10 dark:opacity-40 pointer-events-none absolute inset-0" />
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/[0.04] dark:bg-indigo-600/10 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/[0.04] dark:bg-purple-600/10 blur-[130px] pointer-events-none" />

        {/* Contact Info Panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col gap-8 text-left z-10 lg:sticky lg:top-24"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed">
              Have questions about Telephonum AI conversation intelligence? Want to see a custom enterprise demo? Send us a message and our team will get back to you shortly.
            </p>
          </div>

          <div className="flex flex-col gap-6 mt-4">
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-white/2 border border-slate-200/80 dark:border-white/5 shadow-sm dark:shadow-none">
              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base">Support & Inquiries</h4>
                <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">harshzone3@gmail.com</p>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Contact Form Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 z-10 w-full"
        >
          <div className="glass-effect p-8 sm:p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] bg-white/70 dark:bg-[#09081e]/30 border border-slate-200 dark:border-white/10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
              Send a Message
            </h2>
            <p className="text-slate-500 dark:text-gray-400 text-sm mb-8">
              Fill out the details below and we will contact you.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
              {/* Name field */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="name-input" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                    Full Name
                  </label>
                  {user && (
                    <span className="text-[10px] text-indigo-650 dark:text-indigo-400 font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-100/50 dark:border-indigo-500/20">
                      Account Verified
                    </span>
                  )}
                </div>
                <input
                  id="name-input"
                  type="text"
                  placeholder="Harshdeep Singh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!!user}
                  className={`block w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all duration-200 ${
                    user
                      ? "bg-slate-100/60 dark:bg-indigo-500/5 border border-indigo-200/40 dark:border-indigo-500/20 text-slate-500 dark:text-indigo-300/80 cursor-not-allowed select-none font-medium shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]"
                      : "bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:border-indigo-500 focus:bg-white dark:focus:bg-transparent focus:ring-2 focus:ring-indigo-500/20"
                  }`}
                  required
                />
              </div>

              {/* Email field */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="email-input" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                    Email Address
                  </label>
                  {user && (
                    <span className="text-[10px] text-indigo-650 dark:text-indigo-400 font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-100/50 dark:border-indigo-500/20">
                      Account Verified
                    </span>
                  )}
                </div>
                <input
                  id="email-input"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!!user}
                  className={`block w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all duration-200 ${
                    user
                      ? "bg-slate-100/60 dark:bg-indigo-500/5 border border-indigo-200/40 dark:border-indigo-500/20 text-slate-500 dark:text-indigo-300/80 cursor-not-allowed select-none font-medium shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]"
                      : "bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:border-indigo-500 focus:bg-white dark:focus:bg-transparent focus:ring-2 focus:ring-indigo-500/20"
                  }`}
                  required
                />
              </div>

              {/* Subject field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="subject-input" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                  Subject
                </label>
                <input
                  id="subject-input"
                  type="text"
                  placeholder="How can we help you?"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="block w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-transparent focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                  required
                />
              </div>

              {/* Message field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message-input" className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-400">
                  Message
                </label>
                <textarea
                  id="message-input"
                  rows={5}
                  placeholder="Tell us details about your project or general query..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="block w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-transparent focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 resize-none"
                  required
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-[0_0_15px_rgba(99,102,241,0.2)] dark:shadow-[0_0_15px_rgba(99,102,241,0.25)] hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] dark:hover:shadow-[0_0_20px_rgba(99,102,241,0.45)] flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
