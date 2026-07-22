import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Volume2, 
  Cpu, 
  ShieldCheck, 
  Brain, 
  BarChart3, 
  ListTodo, 
  TrendingUp, 
  Clock, 
  Zap, 
  AlertTriangle, 
  ChevronRight, 
  Check, 
  Smile, 
  Shield
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";

// Mock data for interactive Dashboard Showcase
const MOCK_CALLS = [
  {
    id: "call-1",
    agentName: "Amit Sharma",
    customerName: "Priya Patel",
    duration: "4m 32s",
    qaScore: 94,
    sentiment: "Positive",
    date: "Today, 2:14 PM",
    complianceScore: "100%",
    summary: "Customer called to upgrade their subscription from Pro to Enterprise. The agent greeted the customer politely, verified account details, explained pricing options clearly, and successfully initiated the upgrade. The customer was highly satisfied with the prompt service.",
    coachingTips: [
      "Excellent warm greeting and tone consistency.",
      "Clear explanation of the contract details and SLA benefits.",
      "Consider asking if there are other team members who need onboarding support."
    ],
    complianceChecks: [
      { name: "Standard greeting used", status: true },
      { name: "Verbal consent obtained", status: true },
      { name: "Pricing terms disclosed", status: true },
      { name: "Resolution confirmed", status: true }
    ],
    transcript: [
      { speaker: "Agent", text: "Thank you for calling Telephonum support. My name is Amit, how can I help you today?" },
      { speaker: "Customer", text: "Hi Amit! I'm calling from Acme Corp. We've been using the Pro plan, but we've run out of credits and need to upgrade to the Enterprise plan." },
      { speaker: "Agent", text: "I can absolutely help you with that, Priya. Let me pull up your account. Could you please confirm your registered email address?" },
      { speaker: "Customer", text: "Sure, it is priya.patel@acmecorp.com." },
      { speaker: "Agent", text: "Got it, thank you. I see your Acme Corp workspace has 25 active seats. The Enterprise upgrade will add unlimited credits and advanced custom dashboard metrics. The rate will be $49 per user monthly. Does that sound good to go ahead?" },
      { speaker: "Customer", text: "Yes, that's exactly what we need. Please go ahead and process it." },
      { speaker: "Agent", text: "Perfect. I've initiated the upgrade. You should see the new features and unlimited credits in your dashboard right now. I've also sent the invoice copy to your email." },
      { speaker: "Customer", text: "Wow, that was incredibly fast. Thank you so much, Amit!" },
      { speaker: "Agent", text: "You're very welcome, Priya! Is there anything else I can assist you with today?" },
      { speaker: "Customer", text: "No, that's all. Have a great day!" }
    ],
    metrics: { tone: 9.8, clarity: 9.4, compliance: 10 }
  }
];

const Home = () => {
  const { user, loading } = useAuth();

  const [selectedCallIndex, setSelectedCallIndex] = useState(0);
  const activeCall = MOCK_CALLS[selectedCallIndex];
  const location = useLocation();

  const transcriptRef = useRef<HTMLDivElement>(null);
  const [isScrollingPaused, setIsScrollingPaused] = useState(false);
  const scrollPosRef = useRef(0);

  useEffect(() => {
    const container = transcriptRef.current;
    if (!container) return;

    let frameId: number;
    let lastTime = performance.now();

    const scroll = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isScrollingPaused) {
        // Slow scroll speed: 10 pixels per second
        scrollPosRef.current += (10 * delta) / 1000;

        // Loop: if scrolled past scrollHeight minus clientHeight, go back to top
        if (scrollPosRef.current + container.clientHeight >= container.scrollHeight - 2) {
          scrollPosRef.current = 0;
        }

        container.scrollTop = scrollPosRef.current;
      }

      frameId = requestAnimationFrame(scroll);
    };

    frameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isScrollingPaused]);

  // Scroll to section when navigated from another page
  useEffect(() => {
    if (location.state && (location.state as any).scrollTo) {
      const sectionId = (location.state as any).scrollTo;
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
      // Clear location state to prevent scrolling again on reload
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 dark:bg-[#030014] transition-colors duration-300">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-indigo-200 dark:border-indigo-500/10 border-t-indigo-600 dark:border-t-indigo-500 animate-spin"></div>
          <div className="absolute w-20 h-20 rounded-full border border-indigo-500/20 dark:border-indigo-500/30 animate-ping opacity-40"></div>
        </div>
        <p className="mt-6 text-sm font-semibold tracking-wide text-slate-500 dark:text-indigo-200/60 animate-pulse">
          Loading Telephonum...
        </p>
      </div>
    );
  }

  const handleTranscriptScroll = () => {
    if (transcriptRef.current && isScrollingPaused) {
      scrollPosRef.current = transcriptRef.current.scrollTop;
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#030014] text-slate-800 dark:text-gray-100 overflow-x-hidden transition-colors duration-300">
      {/* Background patterns */}
      <div className="bg-grid-pattern" />
      <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] rounded-full bg-indigo-500/[0.04] dark:bg-indigo-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] rounded-full bg-purple-500/[0.04] dark:bg-purple-600/10 blur-[150px] pointer-events-none" />

      {/* Navbar Component */}
      <Navbar />

      {/* Hero Section Component */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-16 pb-20 md:pt-24 md:pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10 text-xs font-semibold text-indigo-600 dark:text-indigo-300 mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(99,102,241,0.05)] dark:shadow-[0_0_15px_rgba(99,102,241,0.1)]"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>AI-Powered Conversation Intelligence Platform</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-xl leading-[1.08] mb-6 text-slate-900 dark:text-white"
          >
            Transform Every Customer Conversation Into <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Actionable Intelligence</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-600 dark:text-gray-400 text-base sm:text-lg max-w-lg leading-relaxed mb-10"
          >
            Telephonum automatically records, transcribes, analyzes, and evaluates customer conversations using AI to help businesses improve customer experience, agent performance, compliance, and decision-making.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            {!user && (
              <Link 
                to="/register" 
                className="px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] flex items-center justify-center gap-2 group text-center"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
            <button 
              onClick={() => scrollToSection("dashboard-showcase")}
              className="px-6 py-3.5 rounded-xl font-bold text-slate-700 dark:text-gray-300 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200/80 dark:hover:bg-white/10 hover:border-slate-300/80 dark:hover:border-white/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 text-purple-400 fill-purple-400/20" />
              Watch Demo
            </button>
          </motion.div>
        </div>        {/* Mini Dashboard Preview in Hero */}
        <div className="lg:col-span-6 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass-effect p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#09081e]/60"
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Live Intel Stream</span>
              </div>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-mono bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">Active Session</span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-slate-50/80 dark:bg-white/2 border border-slate-100 dark:border-white/5 p-3.5 rounded-2xl">
                <span className="text-[10px] text-slate-500 dark:text-gray-400 uppercase tracking-wider block mb-1">Calls Today</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white">1,284</span>
              </div>
              <div className="bg-slate-50/80 dark:bg-white/2 border border-slate-100 dark:border-white/5 p-3.5 rounded-2xl">
                <span className="text-[10px] text-slate-500 dark:text-gray-400 uppercase tracking-wider block mb-1">QA Score</span>
                <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">92.4%</span>
              </div>
              <div className="bg-slate-50/80 dark:bg-white/2 border border-slate-100 dark:border-white/5 p-3.5 rounded-2xl">
                <span className="text-[10px] text-slate-500 dark:text-gray-400 uppercase tracking-wider block mb-1">Compliance</span>
                <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">99.2%</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Sentiment Card */}
              <div className="bg-slate-50/80 dark:bg-white/2 border border-slate-100 dark:border-white/5 p-4 rounded-2xl flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 dark:text-gray-400 font-medium">Customer Sentiment</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Positive (84%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-white/5 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full" style={{ width: "84%" }} />
                  <div className="bg-amber-500 h-full" style={{ width: "12%" }} />
                  <div className="bg-rose-500 h-full" style={{ width: "4%" }} />
                </div>
              </div>

              {/* AI Recommendation Card */}
              <div className="bg-gradient-to-r from-indigo-50/[0.4] to-purple-50/[0.4] dark:from-indigo-500/10 dark:to-purple-500/10 border border-indigo-100/80 dark:border-indigo-500/20 p-4 rounded-2xl flex gap-3">
                <Brain className="w-5 h-5 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
                <div className="flex flex-col gap-1 text-left">
                  <span className="text-xs font-bold text-indigo-950 dark:text-white">AI Conversation Recommendation</span>
                  <span className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">
                    Customer was highly satisfied with the subscription upgrade offer. Prompt discount terms and greeting verified.
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section Component */}
      <section className="border-t border-b border-slate-200 dark:border-white/5 bg-slate-100/50 dark:bg-[#07051a]/30 py-8 relative transition-colors">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-slate-400 dark:text-gray-500">
            Designed for
          </span>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {["Sales Teams", "Customer Support", "Contact Centers", "Customer Success", "Operations Teams"].map((team, idx) => (
              <span 
                key={idx} 
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-600 dark:text-gray-300 bg-slate-200/40 dark:bg-white/3 border border-slate-200/50 dark:border-white/5 shadow-sm dark:shadow-inner transition-colors"
              >
                {team}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section Component */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-6 text-left flex flex-col items-start z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
            Every Conversation Contains Valuable Business Insights.
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-6">
            Most businesses manually review only a small percentage of customer conversations, causing valuable insights, coaching opportunities, customer pain points, and compliance risks to go unnoticed.
          </p>
          <p className="text-slate-600 dark:text-gray-400 text-base md:text-lg leading-relaxed">
            Telephonum automatically analyzes every interaction using AI so your team can focus on taking action instead of reviewing recordings manually.
          </p>
        </div>

        <div className="lg:col-span-6 z-10 w-full">
          <div className="glass-effect p-6 rounded-3xl bg-white/80 dark:bg-[#09081e]/60 border border-slate-200 dark:border-white/10 flex flex-col gap-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-left">Manual Review vs. Telephonum AI</h4>
            <div className="flex flex-col gap-4">
              <div className="bg-slate-50/80 dark:bg-white/2 border border-slate-100 dark:border-white/5 p-4 rounded-2xl flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 dark:text-gray-400">Manual QA Review Rate</span>
                  <span className="text-rose-600 dark:text-rose-400 font-bold">Only 2% of calls</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-white/5 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: "2%" }} />
                </div>
              </div>

              <div className="bg-indigo-50/40 dark:bg-indigo-500/5 border border-indigo-100/80 dark:border-indigo-500/25 p-4 rounded-2xl flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-indigo-900 dark:text-indigo-300">Telephonum AI Review Rate</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">100% of calls analyzed</span>
                </div>
                <div className="w-full bg-indigo-100/50 dark:bg-indigo-500/10 h-2.5 rounded-full overflow-hidden shadow-[0_0_10px_rgba(99,102,241,0.1)] dark:shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full" style={{ width: "100%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section Component */}
      <section id="features" className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 border-t border-slate-200 dark:border-white/5 relative transition-colors">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Advanced Conversation Intelligence Features
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-lg">
            Deploy cutting-edge artificial intelligence to extract data, evaluate compliance, and train agents instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "AI Call Transcription",
              desc: "Automatically convert customer conversations into accurate searchable transcripts.",
              icon: Volume2,
              color: "text-indigo-600 dark:text-indigo-400"
            },
            {
              title: "AI Conversation Analysis",
              desc: "Understand customer intent, sentiment, objections, and important discussion points.",
              icon: Cpu,
              color: "text-purple-600 dark:text-purple-400"
            },
            {
              title: "Automated Quality Assurance",
              desc: "Score every conversation using customizable QA scorecards.",
              icon: BarChart3,
              color: "text-pink-600 dark:text-pink-400"
            },
            {
              title: "Compliance Monitoring",
              desc: "Detect compliance violations automatically and reduce organizational risk.",
              icon: ShieldCheck,
              color: "text-teal-600 dark:text-teal-400"
            },
            {
              title: "Conversation Analytics",
              desc: "Track KPIs, customer satisfaction trends, agent performance, and call metrics.",
              icon: TrendingUp,
              color: "text-amber-600 dark:text-amber-400"
            },
            {
              title: "AI Coaching",
              desc: "Generate personalized coaching suggestions to improve every future customer interaction.",
              icon: Brain,
              color: "text-sky-600 dark:text-sky-400"
            }
          ].map((feat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              className="glass-effect p-8 rounded-3xl bg-white dark:bg-[#09081e]/40 border border-slate-200/80 dark:border-white/8 transition-all hover:border-indigo-200 dark:hover:border-white/20 hover:shadow-md dark:hover:shadow-none text-left flex flex-col items-start group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 dark:bg-white/2 rounded-full translate-x-8 -translate-y-8 group-hover:scale-125 transition-transform duration-300" />
              <div className={`p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 mb-6 ${feat.color}`}>
                <feat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">{feat.title}</h3>
              <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Component */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 border-t border-slate-200 dark:border-white/5 relative transition-colors">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            How Telephonum Works
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-lg">
            A seamless processing pipeline that takes raw audio and delivers deep intelligence.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6 relative">
          {[
            { step: "01", name: "Upload or Record Calls", desc: "Sync calls from CRM, VoIP, or upload audio files directly." },
            { step: "02", name: "Speech-to-Text AI", desc: "Transcribe audio instantly into speaker-separated transcripts." },
            { step: "03", name: "AI Conversation Analysis", desc: "Parse themes, detect sentiment, and catalog keywords." },
            { step: "04", name: "Quality & Compliance Evaluation", desc: "Instantly score calls and detect compliance issues." },
            { step: "05", name: "Dashboard & Actionable Insights", desc: "Review dashboard cards, summaries, and agent coaching." }
          ].map((item, idx) => (
            <div key={idx} className="flex-1 glass-effect p-6 rounded-2xl bg-white dark:bg-[#08071c]/50 border border-slate-200/80 dark:border-white/8 text-left flex flex-col justify-between relative group hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-colors">
              <div>
                <span className="text-3xl font-extrabold text-indigo-600/30 group-hover:text-indigo-600/50 dark:text-indigo-500/20 dark:group-hover:text-indigo-400/40 transition-colors font-mono block mb-4">{item.step}</span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">{item.name}</h4>
                <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
              {idx < 4 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                  <ChevronRight className="w-5 h-5 text-slate-300 dark:text-gray-600" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard Showcase (Large Interactive Section) */}
      <section id="dashboard-showcase" className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 border-t border-slate-200 dark:border-white/5 relative transition-colors">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Interactive Analytics Dashboard Preview
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-lg">
            Interact with our live preview widget below. Inspect the sample call details dynamically.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Recent Conversations List (Left Side) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white text-left uppercase tracking-wider mb-2">Sample Calls</h3>
            {MOCK_CALLS.map((call, idx) => (
              <button
                key={call.id}
                onClick={() => setSelectedCallIndex(idx)}
                className={`p-4 rounded-2xl border text-left flex flex-col gap-2.5 transition-all cursor-pointer ${
                  selectedCallIndex === idx
                    ? "bg-indigo-50/80 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30 shadow-[0_4px_20px_rgba(99,102,241,0.06)] dark:shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                    : "bg-white dark:bg-[#09081e]/40 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 hover:bg-slate-50 dark:hover:bg-[#09081e]/60"
                }`}
              >
                <div className="flex justify-between items-start w-full">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{call.customerName}</h4>
                    <span className="text-[10px] text-slate-500 dark:text-gray-400">Agent: {call.agentName}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-gray-500 font-mono">{call.date}</span>
                </div>
                <div className="flex justify-between items-center w-full mt-1.5">
                  <div className="flex gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${
                      call.sentiment === "Positive"
                        ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/25"
                        : call.sentiment === "Negative"
                        ? "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-500/25"
                        : "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-500/25"
                    }`}>
                      {call.sentiment}
                    </span>
                    <span className="text-[10px] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400 px-2 py-0.5 rounded-full">
                      QA: {call.qaScore}%
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-gray-400 font-medium">{call.duration}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Interactive Showcase Panel (Right Side) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCall.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="glass-effect p-6 rounded-3xl bg-white/80 dark:bg-[#09081e]/60 border border-slate-200 dark:border-white/10 flex flex-col gap-6 text-left"
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-slate-100 dark:border-white/5">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>Call Review:</span>
                      <span className="text-indigo-650 dark:text-indigo-400">{activeCall.customerName}</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-gray-400">Reviewed by Telephonum AI on {activeCall.date} • Duration: {activeCall.duration}</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 px-3 py-1.5 rounded-xl text-center">
                      <span className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-gray-400 block">QA Score</span>
                      <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">{activeCall.qaScore}%</span>
                    </div>
                    <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 px-3 py-1.5 rounded-xl text-center">
                      <span className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-gray-400 block">Compliance</span>
                      <span className="text-sm font-extrabold text-indigo-650 dark:text-indigo-400">{activeCall.complianceScore}</span>
                    </div>
                  </div>
                </div>

                {/* Main sections layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column: AI Summary & Coaching */}
                  <div className="flex flex-col gap-5">
                    {/* Summary */}
                    <div className="flex flex-col gap-2">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                        <span>AI Call Summary</span>
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-gray-300 bg-slate-50/50 dark:bg-white/2 border border-slate-100 dark:border-white/5 p-3.5 rounded-xl leading-relaxed">
                        {activeCall.summary}
                      </p>
                    </div>

                    {/* Coaching */}
                    <div className="flex flex-col gap-2">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                        <Brain className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
                        <span>AI Coaching & Tips</span>
                      </h4>
                      <div className="flex flex-col gap-2">
                        {activeCall.coachingTips.map((tip, idx) => (
                          <div key={idx} className="flex gap-2 text-xs text-slate-650 dark:text-gray-300">
                            <span className="text-indigo-500 dark:text-indigo-400">•</span>
                            <span>{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Compliance list */}
                    <div className="flex flex-col gap-2">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-teal-655 dark:text-teal-400" />
                        <span>Compliance Checklist</span>
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {activeCall.complianceChecks.map((chk, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs bg-slate-50/50 dark:bg-white/2 border border-slate-100 dark:border-white/5 px-2.5 py-1.5 rounded-lg">
                            {chk.status ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                            ) : (
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400" />
                            )}
                            <span className="text-slate-600 dark:text-gray-300 truncate">{chk.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Audio Transcript */}
                  <div className="flex flex-col gap-2">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <ListTodo className="w-3.5 h-3.5 text-pink-500 dark:text-pink-400" />
                      <span>Interactive Transcript</span>
                    </h4>
                    <div 
                      ref={transcriptRef}
                      onMouseEnter={() => setIsScrollingPaused(true)}
                      onMouseLeave={() => {
                        if (transcriptRef.current) {
                          scrollPosRef.current = transcriptRef.current.scrollTop;
                        }
                        setIsScrollingPaused(false);
                      }}
                      onTouchStart={() => setIsScrollingPaused(true)}
                      onTouchEnd={() => {
                        if (transcriptRef.current) {
                          scrollPosRef.current = transcriptRef.current.scrollTop;
                        }
                        setTimeout(() => {
                          setIsScrollingPaused(false);
                        }, 1500);
                      }}
                      onScroll={handleTranscriptScroll}
                      className="bg-slate-50/80 dark:bg-[#040310] border border-slate-150 dark:border-white/5 p-4 rounded-2xl h-[280px] overflow-y-auto flex flex-col gap-3 custom-scrollbar"
                    >
                      {activeCall.transcript.map((line, idx) => (
                        <div key={idx} className={`flex flex-col ${line.speaker === "Agent" ? "items-start" : "items-end"}`}>
                          <span className={`text-[9px] font-semibold mb-0.5 uppercase tracking-widest ${
                            line.speaker === "Agent" ? "text-indigo-600 dark:text-indigo-400" : "text-purple-600 dark:text-purple-400"
                          }`}>
                            {line.speaker}
                          </span>
                          <span className={`text-xs px-3 py-2 rounded-xl max-w-[85%] leading-relaxed ${
                            line.speaker === "Agent"
                              ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-955 dark:text-indigo-100 rounded-tl-none border border-indigo-100 dark:border-indigo-500/15"
                              : "bg-purple-50 dark:bg-purple-500/10 text-purple-955 dark:text-purple-100 rounded-tr-none border border-purple-100 dark:border-purple-500/15"
                          }`}>
                            {line.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Benefits Section Component */}
      <section id="benefits" className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 border-t border-slate-200 dark:border-white/5 relative transition-colors">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Key Business Outcomes
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-lg">
            Unlock major efficiency upgrades and growth metrics with automated conversation analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Reduce Manual Call Reviews",
              desc: "Automate QA evaluations and eliminate hours of manual audio listening.",
              icon: Clock,
              color: "bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-650 dark:text-indigo-300"
            },
            {
              title: "Improve Customer Satisfaction",
              desc: "Identify customer friction points immediately and fix them to boost retention.",
              icon: Smile,
              color: "bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20 text-purple-650 dark:text-purple-300"
            },
            {
              title: "Increase Agent Productivity",
              desc: "Provide instant dashboard insights and reduce onboarding and training ramp time.",
              icon: Zap,
              color: "bg-pink-50 dark:bg-pink-500/10 border border-pink-100 dark:border-pink-500/20 text-pink-650 dark:text-pink-300"
            },
            {
              title: "Identify Compliance Risks",
              desc: "Flag missing consent protocols and prevent costly regulatory violations.",
              icon: AlertTriangle,
              color: "bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-650 dark:text-rose-300"
            },
            {
              title: "Scale Quality Assurance",
              desc: "Audit 100% of customer calls with objective, standard criteria.",
              icon: ListTodo,
              color: "bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 text-teal-650 dark:text-teal-300"
            },
            {
              title: "Make Data-Driven Decisions",
              desc: "Discover real trending customer requests and market opportunities.",
              icon: TrendingUp,
              color: "bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 text-amber-650 dark:text-amber-300"
            }
          ].map((benefit, idx) => (
            <div key={idx} className="glass-effect p-8 rounded-3xl bg-white dark:bg-[#09081e]/30 border border-slate-200/80 dark:border-white/5 text-left hover:border-indigo-200 dark:hover:border-white/12 hover:shadow-md dark:hover:shadow-none transition-colors">
              <div className={`p-3 rounded-xl border w-fit mb-6 ${benefit.color}`}>
                <benefit.icon className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{benefit.title}</h4>
              <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Component */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-20 relative">
        <div className="relative glass-effect p-10 md:p-16 rounded-3xl bg-gradient-to-r from-indigo-50/50 via-purple-50/50 to-indigo-50/50 dark:from-indigo-500/10 dark:via-purple-500/10 dark:to-indigo-500/10 border border-slate-200 dark:border-white/10 text-center overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10 dark:opacity-40 pointer-events-none" />
          <div className="absolute top-[-50%] left-[-20%] w-[400px] h-[400px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-50%] right-[-20%] w-[400px] h-[400px] rounded-full bg-purple-500/10 dark:bg-purple-500/20 blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Ready to transform every conversation into actionable insights?
            </h2>
            <p className="text-slate-600 dark:text-gray-305 text-base md:text-lg leading-relaxed max-w-2xl">
              Start using Telephonum to analyze conversations, improve customer experience, and empower your teams with AI.
            </p>
            {!user && (
              <Link 
                to="/register" 
                className="mt-4 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] flex items-center justify-center gap-2 group"
              >
                Create Free Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Home;