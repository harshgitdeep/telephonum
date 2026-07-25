import { ArrowLeft, BarChart3, TrendingUp, Users, Clock, Smile, ShieldCheck, Sparkles, MessageSquare } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { useNavigate } from "react-router-dom";

export default function AnalyticsPage() {
  const navigate = useNavigate();

  // Dummy analytics metrics
  const totalCallsAnalyzed = 1482;
  const avgQAScore = 91.8;
  const avgDuration = "4m 12s";
  const agentCompliance = 98.4;

  const sentimentData = {
    positive: 68,
    neutral: 24,
    negative: 8
  };

  const topTopics = [
    { name: "Subscription Upgrades", count: 324, sentiment: "Positive" },
    { name: "Billing & Pricing Queries", count: 215, sentiment: "Neutral" },
    { name: "API Integration Issues", count: 180, sentiment: "Negative" },
    { name: "Feature Requests", count: 142, sentiment: "Positive" },
    { name: "Account Cancellations", count: 88, sentiment: "Negative" }
  ];

  const agentScores = [
    { name: "Amit Sharma", score: 94.2, calls: 145 },
    { name: "Priya Patel", score: 92.8, calls: 132 },
    { name: "Rohan Das", score: 89.5, calls: 120 },
    { name: "Neha Sen", score: 88.0, calls: 110 }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030014] text-slate-800 dark:text-gray-100 flex flex-col justify-between transition-colors duration-300">
      <Navbar />

      <main className="flex-grow max-w-5xl w-full mx-auto px-6 py-12 flex flex-col gap-8">
        {/* Navigation Breadcrumb */}
        <div className="w-full text-left">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-650 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>

        <div className="w-full text-left">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2 flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-indigo-500" />
            Conversation Intelligence Analytics
          </h1>
          <p className="text-slate-550 dark:text-gray-400 text-sm max-w-xl">
            Aggregate intelligence metrics gathered across 100% of customer interactions. Monitor agent performance, topic distributions, and sentiment trends.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-[#09081e]/60 border border-slate-200 dark:border-white/10 p-5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.01)] flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 dark:text-gray-500 uppercase font-bold tracking-wider block mb-0.5">Calls Audited</span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">{totalCallsAnalyzed}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#09081e]/60 border border-slate-200 dark:border-white/10 p-5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.01)] flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-450">
              <Smile className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 dark:text-gray-500 uppercase font-bold tracking-wider block mb-0.5">Avg QA Score</span>
              <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-450">{avgQAScore}%</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#09081e]/60 border border-slate-200 dark:border-white/10 p-5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.01)] flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-450">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 dark:text-gray-500 uppercase font-bold tracking-wider block mb-0.5">Avg Duration</span>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">{avgDuration}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#09081e]/60 border border-slate-200 dark:border-white/10 p-5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.01)] flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 dark:text-gray-500 uppercase font-bold tracking-wider block mb-0.5">Compliance Rate</span>
              <span className="text-xl font-extrabold text-purple-600 dark:text-purple-400">{agentCompliance}%</span>
            </div>
          </div>
        </div>

        {/* Lower section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sentiment card */}
          <div className="lg:col-span-5 bg-white dark:bg-[#09081e]/60 border border-slate-200 dark:border-white/10 p-6 md:p-8 rounded-3xl flex flex-col gap-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-3">
              <Smile className="w-4.5 h-4.5 text-indigo-500" />
              Customer Sentiment
            </h3>

            <div className="flex flex-col gap-4">
              {/* Progress bar stack */}
              <div className="w-full bg-slate-100 dark:bg-white/5 h-4 rounded-full overflow-hidden flex">
                <div className="bg-emerald-500 h-full" style={{ width: `${sentimentData.positive}%` }} title={`Positive: ${sentimentData.positive}%`} />
                <div className="bg-amber-500 h-full" style={{ width: `${sentimentData.neutral}%` }} title={`Neutral: ${sentimentData.neutral}%`} />
                <div className="bg-rose-500 h-full" style={{ width: `${sentimentData.negative}%` }} title={`Negative: ${sentimentData.negative}%`} />
              </div>

              {/* Legends */}
              <div className="flex flex-col gap-2.5 mt-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-slate-650 dark:text-gray-400">Positive Interactions</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">{sentimentData.positive}%</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="text-slate-650 dark:text-gray-400">Neutral / Informational</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">{sentimentData.neutral}%</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="text-slate-650 dark:text-gray-400">Escalations / Negatives</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">{sentimentData.negative}%</span>
                </div>
              </div>
            </div>

            {/* AI Call Summary Recommendation Card */}
            <div className="bg-indigo-50/50 dark:bg-indigo-500/10 border border-indigo-150/40 dark:border-indigo-500/20 p-4 rounded-2xl flex gap-3 text-left">
              <Sparkles className="w-5 h-5 text-indigo-500 dark:text-indigo-400 flex-shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-indigo-950 dark:text-white mb-0.5">Sentiment Analytics Insight</h4>
                <p className="text-2xs text-slate-600 dark:text-gray-300 leading-relaxed font-medium">
                  Conversations regarding upgrades display 89% positive sentiment. Pricing queries show high neutrality; recommend pricing transparency training.
                </p>
              </div>
            </div>
          </div>

          {/* Topics and Keywords card */}
          <div className="lg:col-span-7 bg-white dark:bg-[#09081e]/60 border border-slate-200 dark:border-white/10 p-6 md:p-8 rounded-3xl flex flex-col gap-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-3">
              <MessageSquare className="w-4.5 h-4.5 text-indigo-500" />
              Key Conversation Topics
            </h3>

            <div className="flex flex-col gap-3">
              {topTopics.map((topic, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-white/2 border border-slate-100 dark:border-white/5">
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-800 dark:text-gray-200">{topic.name}</span>
                    <span className="text-[10px] text-slate-400 dark:text-gray-500">{topic.count} conversations matched</span>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-4xs font-bold uppercase tracking-wider ${
                    topic.sentiment === "Positive"
                      ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                      : topic.sentiment === "Neutral"
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                      : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                  }`}>
                    {topic.sentiment}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Agent leaderboard */}
        <div className="bg-white dark:bg-[#09081e]/60 border border-slate-200 dark:border-white/10 p-6 md:p-8 rounded-3xl">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-3 mb-6">
            <Users className="w-4.5 h-4.5 text-indigo-500" />
            Agent QA Performance Leaderboard
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-150 dark:border-white/5 pb-2 text-slate-450 dark:text-gray-500 uppercase font-bold tracking-wider">
                  <th className="py-2.5">Agent Name</th>
                  <th className="py-2.5">Calls Evaluated</th>
                  <th className="py-2.5 text-right">Average Performance Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-semibold text-slate-700 dark:text-gray-300">
                {agentScores.map((agent, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-white/2">
                    <td className="py-3 font-bold text-slate-900 dark:text-white">{agent.name}</td>
                    <td className="py-3 text-slate-500 dark:text-slate-400">{agent.calls} calls</td>
                    <td className="py-3 text-right">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full ${
                        agent.score >= 90
                          ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                          : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                      }`}>
                        {agent.score}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
