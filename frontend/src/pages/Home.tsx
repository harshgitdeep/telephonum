import { useState } from "react";
import { Link } from "react-router-dom";
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
  Phone, 
  Shield 
} from "lucide-react";

// Mock data for interactive Dashboard Showcase
const MOCK_CALLS = [
  {
    id: "call-1",
    agentName: "Alex Mercer",
    customerName: "Sarah Jenkins",
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
      { speaker: "Agent", text: "Thank you for calling Telephonum support. My name is Alex, how can I help you today?" },
      { speaker: "Customer", text: "Hi Alex! I'm calling from Acme Corp. We've been using the Pro plan, but we've run out of credits and need to upgrade to the Enterprise plan." },
      { speaker: "Agent", text: "I can absolutely help you with that, Sarah. Let me pull up your account. Could you please confirm your registered email address?" },
      { speaker: "Customer", text: "Sure, it is sarah.jenkins@acmecorp.com." },
      { speaker: "Agent", text: "Got it, thank you. I see your Acme Corp workspace has 25 active seats. The Enterprise upgrade will add unlimited credits and advanced custom dashboard metrics. The rate will be $49 per user monthly. Does that sound good to go ahead?" },
      { speaker: "Customer", text: "Yes, that's exactly what we need. Please go ahead and process it." },
      { speaker: "Agent", text: "Perfect. I've initiated the upgrade. You should see the new features and unlimited credits in your dashboard right now. I've also sent the invoice copy to your email." },
      { speaker: "Customer", text: "Wow, that was incredibly fast. Thank you so much, Alex!" },
      { speaker: "Agent", text: "You're very welcome, Sarah! Is there anything else I can assist you with today?" },
      { speaker: "Customer", text: "No, that's all. Have a great day!" }
    ],
    metrics: { tone: 9.8, clarity: 9.4, compliance: 10 }
  },
  {
    id: "call-2",
    agentName: "Emily Davis",
    customerName: "Mark Reynolds",
    duration: "6m 15s",
    qaScore: 78,
    sentiment: "Negative",
    date: "Today, 1:45 PM",
    complianceScore: "75%",
    summary: "Customer was frustrated about a billing discrepancy. The bill showed a charge of $150 instead of the promised promo rate of $99. The agent struggled initially to locate the promo code, leading to long pauses. The dispute was resolved, but the customer experience was impacted.",
    coachingTips: [
      "Reduce silence/hold times by explaining what you are searching for.",
      "Acknowledge the customer's frustration earlier to build empathy.",
      "Follow up with email confirmation of the credit adjustment."
    ],
    complianceChecks: [
      { name: "Standard greeting used", status: true },
      { name: "Verbal consent obtained", status: true },
      { name: "Pricing terms disclosed", status: false },
      { name: "Resolution confirmed", status: true }
    ],
    transcript: [
      { speaker: "Agent", text: "Telephonum Customer Support, this is Emily. How may I assist you?" },
      { speaker: "Customer", text: "Hi, I have a major issue. My invoice this month is $150, but I was promised a promo rate of $99 for the first six months. This is very frustrating." },
      { speaker: "Agent", text: "Oh, I'm sorry to hear that. Let me look into this. Can I have your account ID?" },
      { speaker: "Customer", text: "It's TP-90284. It should be under Mark Reynolds." },
      { speaker: "Agent", text: "One moment... (long silence) ... I'm searching for the promo code. It's taking a bit of time." },
      { speaker: "Customer", text: "Are you still there? This is taking too long." },
      { speaker: "Agent", text: "Yes, sorry, the system is slow. Ah, I see. The promo code 'TEL99' was not applied to the renewal invoice. I will apply a credit of $51 to your account now." },
      { speaker: "Customer", text: "Okay, will that credit reflect on my card or just the account?" },
      { speaker: "Agent", text: "It will be applied as credit for your next month's invoice." },
      { speaker: "Customer", text: "Fine. Just make sure it doesn't happen again." },
      { speaker: "Agent", text: "I will make sure. Thank you." }
    ],
    metrics: { tone: 7.2, clarity: 8.0, compliance: 7.5 }
  },
  {
    id: "call-3",
    agentName: "Robert Chen",
    customerName: "Julia K.",
    duration: "3m 50s",
    qaScore: 88,
    sentiment: "Neutral",
    date: "Today, 11:30 AM",
    complianceScore: "100%",
    summary: "Customer inquired about integrating Telephonum with their HubSpot CRM. The agent provided clear documentation links and walked the customer through the HubSpot integrations panel in settings. The setup was completed successfully during the call.",
    coachingTips: [
      "Good step-by-step guidance on CRM setup.",
      "Try to mention that Salesforce integrations are also available.",
      "Overall solid call, friendly and helpful tone."
    ],
    complianceChecks: [
      { name: "Standard greeting used", status: true },
      { name: "Verbal consent obtained", status: true },
      { name: "Pricing terms disclosed", status: true },
      { name: "Resolution confirmed", status: true }
    ],
    transcript: [
      { speaker: "Agent", text: "Hello, thank you for calling Telephonum. This is Robert. How can I help you today?" },
      { speaker: "Customer", text: "Hi Robert. I am setting up our account and I need to know how to connect it with HubSpot. Is that supported?" },
      { speaker: "Agent", text: "Yes, it is! We have a native HubSpot integration. If you are logged in, go to Settings, then click on the Integrations tab." },
      { speaker: "Customer", text: "Okay, I see the Integrations tab... and I see the HubSpot logo." },
      { speaker: "Agent", text: "Perfect. Just click 'Connect', and it will prompt you to authenticate your HubSpot account. That will sync all your recorded calls automatically." },
      { speaker: "Customer", text: "Got it, I clicked Connect and logged in. Yes! It says Connected now. That was super easy." },
      { speaker: "Agent", text: "Excellent! You are all set. Is there anything else I can help you with?" },
      { speaker: "Customer", text: "No, that was it. Thanks for the quick support, Robert!" },
      { speaker: "Agent", text: "My pleasure, Julia. Have a great day!" }
    ],
    metrics: { tone: 9.0, clarity: 9.2, compliance: 10 }
  }
];

const Home = () => {
  const [selectedCallIndex, setSelectedCallIndex] = useState(0);
  const activeCall = MOCK_CALLS[selectedCallIndex];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#030014] text-gray-100 overflow-x-hidden">
      {/* Background patterns */}
      <div className="bg-grid-pattern" />
      <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none" />

      {/* Navbar Component */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#030014]/65 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
              <Phone className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Telephonum
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("features")} className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
              Features
            </button>
            <button onClick={() => scrollToSection("how-it-works")} className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
              How It Works
            </button>
            <button onClick={() => scrollToSection("benefits")} className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
              About
            </button>
            <span className="text-sm text-gray-500 cursor-not-allowed flex items-center gap-1.5">
              Pricing <span className="text-[10px] bg-white/5 text-indigo-300 px-1.5 py-0.5 rounded-full border border-white/10">Soon</span>
            </span>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">
              Login
            </Link>
            <Link 
              to="/register" 
              className="relative group px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_20px_rgba(99,102,241,0.55)]"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section Component */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-semibold text-indigo-300 mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(99,102,241,0.1)]"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>AI-Powered Conversation Intelligence Platform</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-xl leading-[1.08] mb-6 text-white"
          >
            Transform Every Customer Conversation Into <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Actionable Intelligence</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-base sm:text-lg max-w-lg leading-relaxed mb-10"
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
            <Link 
              to="/register" 
              className="px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] flex items-center justify-center gap-2 group text-center"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button 
              onClick={() => scrollToSection("dashboard-showcase")}
              className="px-6 py-3.5 rounded-xl font-bold text-gray-300 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 text-purple-400 fill-purple-400/20" />
              Watch Demo
            </button>
          </motion.div>
        </div>

        {/* Mini Dashboard Preview in Hero */}
        <div className="lg:col-span-6 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="glass-effect p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 bg-[#09081e]/60"
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Live Intel Stream</span>
              </div>
              <span className="text-xs text-indigo-400 font-mono bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">Active Session</span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white/2 border border-white/5 p-3.5 rounded-2xl">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Calls Today</span>
                <span className="text-xl font-bold text-white">1,284</span>
              </div>
              <div className="bg-white/2 border border-white/5 p-3.5 rounded-2xl">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">QA Score</span>
                <span className="text-xl font-bold text-emerald-400">92.4%</span>
              </div>
              <div className="bg-white/2 border border-white/5 p-3.5 rounded-2xl">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Compliance</span>
                <span className="text-xl font-bold text-indigo-400">99.2%</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Sentiment Card */}
              <div className="bg-white/2 border border-white/5 p-4 rounded-2xl flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 font-medium">Customer Sentiment</span>
                  <span className="text-emerald-400 font-semibold">Positive (84%)</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full" style={{ width: "84%" }} />
                  <div className="bg-amber-500 h-full" style={{ width: "12%" }} />
                  <div className="bg-rose-500 h-full" style={{ width: "4%" }} />
                </div>
              </div>

              {/* AI Recommendation Card */}
              <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 p-4 rounded-2xl flex gap-3">
                <Brain className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <div className="flex flex-col gap-1 text-left">
                  <span className="text-xs font-bold text-white">AI Conversation Recommendation</span>
                  <span className="text-xs text-gray-300 leading-relaxed">
                    Customer was highly satisfied with the subscription upgrade offer. Prompt discount terms and greeting verified.
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section Component */}
      <section className="border-t border-b border-white/5 bg-[#07051a]/30 py-8 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            Designed for
          </span>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {["Sales Teams", "Customer Support", "Contact Centers", "Customer Success", "Operations Teams"].map((team, idx) => (
              <span 
                key={idx} 
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-gray-300 bg-white/3 border border-white/5 shadow-inner"
              >
                {team}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section Component */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-6 text-left flex flex-col items-start z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Every Conversation Contains Valuable Business Insights.
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6">
            Most businesses manually review only a small percentage of customer conversations, causing valuable insights, coaching opportunities, customer pain points, and compliance risks to go unnoticed.
          </p>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Telephonum automatically analyzes every interaction using AI so your team can focus on taking action instead of reviewing recordings manually.
          </p>
        </div>

        <div className="lg:col-span-6 z-10 w-full">
          <div className="glass-effect p-6 rounded-3xl bg-[#09081e]/60 border border-white/10 flex flex-col gap-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-left">Manual Review vs. Telephonum AI</h4>
            <div className="flex flex-col gap-4">
              <div className="bg-white/2 border border-white/5 p-4 rounded-2xl flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Manual QA Review Rate</span>
                  <span className="text-rose-400 font-bold">Only 2% of calls</span>
                </div>
                <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: "2%" }} />
                </div>
              </div>

              <div className="bg-indigo-500/5 border border-indigo-500/25 p-4 rounded-2xl flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-indigo-300">Telephonum AI Review Rate</span>
                  <span className="text-indigo-400 font-bold">100% of calls analyzed</span>
                </div>
                <div className="w-full bg-indigo-500/10 h-2.5 rounded-full overflow-hidden shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full" style={{ width: "100%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section Component */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            Advanced Conversation Intelligence Features
          </h2>
          <p className="text-gray-400 text-lg">
            Deploy cutting-edge artificial intelligence to extract data, evaluate compliance, and train agents instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "AI Call Transcription",
              desc: "Automatically convert customer conversations into accurate searchable transcripts.",
              icon: Volume2,
              color: "text-indigo-400"
            },
            {
              title: "AI Conversation Analysis",
              desc: "Understand customer intent, sentiment, objections, and important discussion points.",
              icon: Cpu,
              color: "text-purple-400"
            },
            {
              title: "Automated Quality Assurance",
              desc: "Score every conversation using customizable QA scorecards.",
              icon: BarChart3,
              color: "text-pink-400"
            },
            {
              title: "Compliance Monitoring",
              desc: "Detect compliance violations automatically and reduce organizational risk.",
              icon: ShieldCheck,
              color: "text-teal-400"
            },
            {
              title: "Conversation Analytics",
              desc: "Track KPIs, customer satisfaction trends, agent performance, and call metrics.",
              icon: TrendingUp,
              color: "text-amber-400"
            },
            {
              title: "AI Coaching",
              desc: "Generate personalized coaching suggestions to improve every future customer interaction.",
              icon: Brain,
              color: "text-sky-400"
            }
          ].map((feat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              className="glass-effect p-8 rounded-3xl bg-[#09081e]/40 border border-white/8 transition-all hover:border-white/20 text-left flex flex-col items-start group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/2 rounded-full translate-x-8 -translate-y-8 group-hover:scale-125 transition-transform duration-300" />
              <div className={`p-3 rounded-xl bg-white/5 border border-white/10 mb-6 ${feat.color}`}>
                <feat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{feat.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Component */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            How Telephonum Works
          </h2>
          <p className="text-gray-400 text-lg">
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
            <div key={idx} className="flex-1 glass-effect p-6 rounded-2xl bg-[#08071c]/50 border border-white/8 text-left flex flex-col justify-between relative group hover:border-indigo-500/30 transition-colors">
              <div>
                <span className="text-3xl font-extrabold text-indigo-500/20 group-hover:text-indigo-400/40 transition-colors font-mono block mb-4">{item.step}</span>
                <h4 className="text-base font-bold text-white mb-2">{item.name}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
              {idx < 4 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard Showcase (Large Interactive Section) */}
      <section id="dashboard-showcase" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5 relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            Interactive Analytics Dashboard Preview
          </h2>
          <p className="text-gray-400 text-lg">
            Interact with our live preview widget below. Click on different recent calls to inspect details dynamically.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Recent Conversations List (Left Side) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h3 className="text-base font-bold text-white text-left uppercase tracking-wider mb-2">Recent Conversations</h3>
            {MOCK_CALLS.map((call, idx) => (
              <button
                key={call.id}
                onClick={() => setSelectedCallIndex(idx)}
                className={`p-4 rounded-2xl border text-left flex flex-col gap-2.5 transition-all cursor-pointer ${
                  selectedCallIndex === idx
                    ? "bg-indigo-500/10 border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
                    : "bg-[#09081e]/40 border-white/5 hover:border-white/10 hover:bg-[#09081e]/60"
                }`}
              >
                <div className="flex justify-between items-start w-full">
                  <div>
                    <h4 className="text-sm font-bold text-white">{call.customerName}</h4>
                    <span className="text-[10px] text-gray-400">Agent: {call.agentName}</span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">{call.date}</span>
                </div>
                <div className="flex justify-between items-center w-full mt-1.5">
                  <div className="flex gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${
                      call.sentiment === "Positive"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
                        : call.sentiment === "Negative"
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/25"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/25"
                    }`}>
                      {call.sentiment}
                    </span>
                    <span className="text-[10px] bg-white/5 border border-white/10 text-gray-400 px-2 py-0.5 rounded-full">
                      QA: {call.qaScore}%
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">{call.duration}</span>
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
                className="glass-effect p-6 rounded-3xl bg-[#09081e]/60 border border-white/10 flex flex-col gap-6 text-left"
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-white/5">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span>Call Review:</span>
                      <span className="text-indigo-400">{activeCall.customerName}</span>
                    </h3>
                    <p className="text-xs text-gray-400">Reviewed by Telephonum AI on {activeCall.date} • Duration: {activeCall.duration}</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl text-center">
                      <span className="text-[9px] uppercase tracking-wider text-gray-400 block">QA Score</span>
                      <span className="text-sm font-extrabold text-emerald-400">{activeCall.qaScore}%</span>
                    </div>
                    <div className="bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-xl text-center">
                      <span className="text-[9px] uppercase tracking-wider text-gray-400 block">Compliance</span>
                      <span className="text-sm font-extrabold text-indigo-400">{activeCall.complianceScore}</span>
                    </div>
                  </div>
                </div>

                {/* Main sections layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column: AI Summary & Coaching */}
                  <div className="flex flex-col gap-5">
                    {/* Summary */}
                    <div className="flex flex-col gap-2">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                        <span>AI Call Summary</span>
                      </h4>
                      <p className="text-xs text-gray-300 bg-white/2 border border-white/5 p-3.5 rounded-xl leading-relaxed">
                        {activeCall.summary}
                      </p>
                    </div>

                    {/* Coaching */}
                    <div className="flex flex-col gap-2">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <Brain className="w-3.5 h-3.5 text-purple-400" />
                        <span>AI Coaching & Tips</span>
                      </h4>
                      <div className="flex flex-col gap-2">
                        {activeCall.coachingTips.map((tip, idx) => (
                          <div key={idx} className="flex gap-2 text-xs text-gray-300">
                            <span className="text-indigo-400">•</span>
                            <span>{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Compliance list */}
                    <div className="flex flex-col gap-2">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-teal-400" />
                        <span>Compliance Checklist</span>
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {activeCall.complianceChecks.map((chk, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs bg-white/2 border border-white/5 px-2.5 py-1.5 rounded-lg">
                            {chk.status ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                            )}
                            <span className="text-gray-300 truncate">{chk.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Audio Transcript */}
                  <div className="flex flex-col gap-2">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <ListTodo className="w-3.5 h-3.5 text-pink-400" />
                      <span>Interactive Transcript</span>
                    </h4>
                    <div className="bg-[#040310] border border-white/5 p-4 rounded-2xl h-[280px] overflow-y-auto flex flex-col gap-3 custom-scrollbar">
                      {activeCall.transcript.map((line, idx) => (
                        <div key={idx} className={`flex flex-col ${line.speaker === "Agent" ? "items-start" : "items-end"}`}>
                          <span className={`text-[9px] font-semibold mb-0.5 uppercase tracking-widest ${
                            line.speaker === "Agent" ? "text-indigo-400" : "text-purple-400"
                          }`}>
                            {line.speaker}
                          </span>
                          <span className={`text-xs px-3 py-2 rounded-xl max-w-[85%] leading-relaxed ${
                            line.speaker === "Agent"
                              ? "bg-indigo-500/10 text-indigo-100 rounded-tl-none border border-indigo-500/15"
                              : "bg-purple-500/10 text-purple-100 rounded-tr-none border border-purple-500/15"
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
      <section id="benefits" className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            Key Business Outcomes
          </h2>
          <p className="text-gray-400 text-lg">
            Unlock major efficiency upgrades and growth metrics with automated conversation analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Reduce Manual Call Reviews",
              desc: "Automate QA evaluations and eliminate hours of manual audio listening.",
              icon: Clock,
              color: "bg-indigo-500/10 border-indigo-500/20 text-indigo-300"
            },
            {
              title: "Improve Customer Satisfaction",
              desc: "Identify customer friction points immediately and fix them to boost retention.",
              icon: Smile,
              color: "bg-purple-500/10 border-purple-500/20 text-purple-300"
            },
            {
              title: "Increase Agent Productivity",
              desc: "Provide instant dashboard insights and reduce onboarding and training ramp time.",
              icon: Zap,
              color: "bg-pink-500/10 border-pink-500/20 text-pink-300"
            },
            {
              title: "Identify Compliance Risks",
              desc: "Flag missing consent protocols and prevent costly regulatory violations.",
              icon: AlertTriangle,
              color: "bg-rose-500/10 border-rose-500/20 text-rose-300"
            },
            {
              title: "Scale Quality Assurance",
              desc: "Audit 100% of customer calls with objective, standard criteria.",
              icon: ListTodo,
              color: "bg-teal-500/10 border-teal-500/20 text-teal-300"
            },
            {
              title: "Make Data-Driven Decisions",
              desc: "Discover real trending customer requests and market opportunities.",
              icon: TrendingUp,
              color: "bg-amber-500/10 border-amber-500/20 text-amber-300"
            }
          ].map((benefit, idx) => (
            <div key={idx} className="glass-effect p-8 rounded-3xl bg-[#09081e]/30 border border-white/5 text-left hover:border-white/12 transition-colors">
              <div className={`p-3 rounded-xl border w-fit mb-6 ${benefit.color}`}>
                <benefit.icon className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{benefit.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Component */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative">
        <div className="relative glass-effect p-10 md:p-16 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 border border-white/10 text-center overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-40 pointer-events-none" />
          <div className="absolute top-[-50%] left-[-20%] w-[400px] h-[400px] rounded-full bg-indigo-500/20 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-50%] right-[-20%] w-[400px] h-[400px] rounded-full bg-purple-500/20 blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ready to transform every conversation into actionable insights?
            </h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl">
              Start using Telephonum to analyze conversations, improve customer experience, and empower your teams with AI.
            </p>
            <Link 
              to="/register" 
              className="mt-4 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] flex items-center justify-center gap-2 group"
            >
              Create Free Account
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Component */}
      <footer className="border-t border-white/5 bg-[#030014]/90 py-16 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          {/* Logo & Pitch */}
          <div className="lg:col-span-5 flex flex-col items-start gap-4">
            <Link to="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center">
                <Phone className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-white">Telephonum</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm text-left">
              The premier AI conversation intelligence engine that audits 100% of customer interactions for performance, compliance, and actionable sales suggestions.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#github" className="text-gray-500 hover:text-white transition-colors" aria-label="GitHub">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
              <a href="#linkedin" className="text-gray-500 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#twitter" className="text-gray-500 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-6">
            <div className="text-left flex flex-col gap-4">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">Product</h5>
              <div className="flex flex-col gap-2.5 text-sm text-gray-400">
                <button onClick={() => scrollToSection("features")} className="hover:text-white transition-colors text-left cursor-pointer">Features</button>
                <button onClick={() => scrollToSection("how-it-works")} className="hover:text-white transition-colors text-left cursor-pointer">Documentation</button>
                <span className="text-gray-500 cursor-not-allowed">Pricing</span>
              </div>
            </div>

            <div className="text-left flex flex-col gap-4">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">Company</h5>
              <div className="flex flex-col gap-2.5 text-sm text-gray-400">
                <button onClick={() => scrollToSection("benefits")} className="hover:text-white transition-colors text-left cursor-pointer">About</button>
                <a href="#blog" className="hover:text-white transition-colors">Blog</a>
                <a href="#careers" className="hover:text-white transition-colors">Careers</a>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              </div>
            </div>

            <div className="text-left flex flex-col gap-4">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">Legal</h5>
              <div className="flex flex-col gap-2.5 text-sm text-gray-400">
                <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            &copy; 2026 Telephonum AI. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#terms" className="hover:text-white transition-colors">Terms</a>
            <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="#cookies" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;