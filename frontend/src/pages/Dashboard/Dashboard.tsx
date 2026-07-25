import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Upload, FileAudio, Calendar, HardDrive, RefreshCw, Eye, BarChart3, ArrowRight, ShieldCheck } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { getCalls, type CallData } from "../../services/call.services";
import api from "../../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recentCalls, setRecentCalls] = useState<CallData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCalls: 0,
    completedCalls: 0,
    avgConfidence: 92.4,
  });

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch calls for recent list
      const callsResponse = await getCalls();
      if (callsResponse.data.success) {
        // Sort by date and take the first 3
        const sorted = callsResponse.data.data.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setRecentCalls(sorted.slice(0, 2));
      }

      // 2. Fetch stats
      const statsResponse = await api.get("/stats");
      if (statsResponse.data.success) {
        setStats(statsResponse.data.data);
      }
    } catch (error: any) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "QUEUED":
        return {
          label: "Queued",
          colorClass: "bg-yellow-50 text-yellow-750 dark:bg-yellow-500/10 dark:text-yellow-400 border border-yellow-200/30",
          dot: "🟡",
        };
      case "TRANSCRIBING":
        return {
          label: "Transcribing",
          colorClass: "bg-blue-50 text-blue-750 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200/30",
          dot: "🔵",
        };
      case "ANALYZING":
        return {
          label: "Analyzing",
          colorClass: "bg-purple-50 text-purple-750 dark:bg-purple-500/10 dark:text-purple-400 border border-purple-200/30",
          dot: "🟣",
        };
      case "COMPLETED":
        return {
          label: "Completed",
          colorClass: "bg-green-50 text-green-750 dark:bg-green-500/10 dark:text-green-400 border border-green-200/30",
          dot: "🟢",
        };
      case "FAILED":
      default:
        return {
          label: "Failed",
          colorClass: "bg-red-50 text-red-750 dark:bg-red-500/10 dark:text-red-400 border border-red-200/30",
          dot: "🔴",
        };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030014] text-slate-800 dark:text-gray-100 flex flex-col justify-between transition-colors duration-300">
      <Navbar />

      <main className="flex-grow max-w-5xl w-full mx-auto px-6 py-12 flex flex-col gap-8">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 w-full">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Welcome back, {user?.name?.split(" ")[0] || "User"} 👋
            </h1>
            <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">
              Here is your conversational intelligence overview.
            </p>
          </div>
          <button
            onClick={fetchDashboardData}
            disabled={isLoading}
            className="self-start p-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors text-slate-500 dark:text-gray-300 disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-[#09081e]/60 border border-slate-200 dark:border-white/10 p-5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.01)] flex items-center gap-4">
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-650 dark:text-indigo-400">
              <FileAudio className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 dark:text-gray-500 uppercase font-bold tracking-wider block">Total Calls</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white">{stats.totalCalls}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#09081e]/60 border border-slate-200 dark:border-white/10 p-5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.01)] flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-450">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 dark:text-gray-500 uppercase font-bold tracking-wider block">QA Avg Score</span>
              <span className="text-lg font-bold text-emerald-600 dark:text-emerald-450">{stats.avgConfidence}%</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#09081e]/60 border border-slate-200 dark:border-white/10 p-5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.01)] flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-650 dark:text-purple-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 dark:text-gray-500 uppercase font-bold tracking-wider block">Completed</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white">{stats.completedCalls}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#09081e]/60 border border-slate-200 dark:border-white/10 p-5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.01)] flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-450">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 dark:text-gray-500 uppercase font-bold tracking-wider block">Active Queue</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                {Math.max(0, stats.totalCalls - stats.completedCalls)}
              </span>
            </div>
          </div>
        </div>

        {/* Shortcuts / Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/upload"
            className="group p-6 rounded-3xl bg-gradient-to-r from-indigo-500/5 to-purple-600/5 dark:from-indigo-500/10 dark:to-purple-600/10 border border-slate-200 dark:border-white/10 hover:border-indigo-500/30 transition-all duration-300 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-indigo-500 text-white shadow-md">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Upload New Call</h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">Process new customer conversations.</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1.5 transition-transform" />
          </Link>

          <Link
            to="/analytics"
            className="group p-6 rounded-3xl bg-gradient-to-r from-purple-500/5 to-pink-600/5 dark:from-purple-500/10 dark:to-pink-600/10 border border-slate-200 dark:border-white/10 hover:border-purple-500/30 transition-all duration-300 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-purple-500 text-white shadow-md">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Analytics Panel</h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">Inspect sentiment & QA distributions.</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* Recent Activity Table */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileAudio className="w-5 h-5 text-indigo-500" />
              Recent Conversations
            </h2>
            <Link
              to="/calls"
              className="text-xs font-semibold text-indigo-650 hover:text-indigo-850 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors flex items-center gap-1"
            >
              View All Logs
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {isLoading && recentCalls.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-[#09081e]/60 rounded-3xl border border-slate-200 dark:border-white/10 text-slate-500">
              Loading recent activity...
            </div>
          ) : recentCalls.length === 0 ? (
            <div className="text-center py-12 px-6 bg-white dark:bg-[#09081e]/60 rounded-3xl border border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400">
              <FileAudio className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
              <p className="font-semibold text-sm">No conversations found</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Upload a recording to populate this dashboard list.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden bg-white dark:bg-[#09081e]/60 rounded-3xl border border-slate-200 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-xs font-bold uppercase text-slate-500 dark:text-gray-400">
                      <th className="py-4 px-6">File Name</th>
                      <th className="py-4 px-6">Size</th>
                      <th className="py-4 px-6">Uploaded At</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-white/10 text-sm text-slate-700 dark:text-gray-300">
                    {recentCalls.map((call) => (
                      <tr
                        key={call._id}
                        onClick={() => navigate(`/calls/${call._id}`)}
                        className="transition-colors hover:bg-indigo-50/30 dark:hover:bg-indigo-500/5 cursor-pointer"
                      >
                        <td className="py-4 px-6 font-medium text-slate-900 dark:text-white truncate max-w-[200px]">
                          {call.originalFileName}
                        </td>
                        <td className="py-4 px-6 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                          <span className="flex items-center gap-1">
                            <HardDrive className="w-3.5 h-3.5" />
                            {formatSize(call.size)}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(call.createdAt)}
                          </span>
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-2xs font-semibold ${getStatusConfig(call.status).colorClass}`}>
                            {["QUEUED", "TRANSCRIBING", "ANALYZING"].includes(call.status) && (
                              <span className="w-1.5 h-1.5 border border-current border-t-transparent rounded-full animate-spin"></span>
                            )}
                            <span>{getStatusConfig(call.status).dot} {getStatusConfig(call.status).label}</span>
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/calls/${call._id}`);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
                            title="View details"
                          >
                            <Eye className="w-4.5 h-4.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
