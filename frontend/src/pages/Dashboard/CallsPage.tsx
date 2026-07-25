import { useState, useEffect } from "react";
import { Trash2, FileAudio, Calendar, HardDrive, RefreshCw, Eye, ArrowLeft, Search } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { getCalls, deleteCall, type CallData } from "../../services/call.services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CallsPage() {
  const navigate = useNavigate();
  const [calls, setCalls] = useState<CallData[]>([]);
  const [isLoadingCalls, setIsLoadingCalls] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCalls = async () => {
    setIsLoadingCalls(true);
    try {
      const response = await getCalls();
      if (response.data.success) {
        setCalls(response.data.data);
      }
    } catch (error: any) {
      console.error("Failed to load calls:", error);
      toast.error(error.response?.data?.message || "Failed to load calls history.");
    } finally {
      setIsLoadingCalls(false);
    }
  };

  useEffect(() => {
    fetchCalls();
  }, []);

  useEffect(() => {
    const hasActiveProcessing = calls.some((c) => ["QUEUED", "TRANSCRIBING", "ANALYZING"].includes(c.status));
    if (!hasActiveProcessing) return;

    const interval = setInterval(() => {
      const fetchCallsSilent = async () => {
        try {
          const response = await getCalls();
          if (response.data.success) {
            setCalls(response.data.data);
          }
        } catch (error) {
          console.error("Failed to silently refresh calls:", error);
        }
      };
      fetchCallsSilent();
    }, 3000);

    return () => clearInterval(interval);
  }, [calls]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this recording? This will permanently delete the file from the server.")) {
      return;
    }

    try {
      const response = await deleteCall(id);
      if (response.data.success) {
        toast.success("Call deleted successfully.");
        setCalls((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message || "Failed to delete call recording.");
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "QUEUED":
        return {
          label: "Waiting to Process",
          colorClass: "bg-yellow-55 text-yellow-750 dark:bg-yellow-500/10 dark:text-yellow-400 border border-yellow-200/50 dark:border-yellow-500/20",
          dot: "🟡",
        };
      case "TRANSCRIBING":
        return {
          label: "Transcribing Audio...",
          colorClass: "bg-blue-55 text-blue-750 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200/50 dark:border-blue-500/20",
          dot: "🔵",
        };
      case "ANALYZING":
        return {
          label: "Generating AI Insights...",
          colorClass: "bg-purple-55 text-purple-750 dark:bg-purple-500/10 dark:text-purple-400 border border-purple-200/50 dark:border-purple-500/20",
          dot: "🟣",
        };
      case "COMPLETED":
        return {
          label: "Completed",
          colorClass: "bg-green-55 text-green-750 dark:bg-green-500/10 dark:text-green-400 border border-green-200/50 dark:border-green-500/20",
          dot: "🟢",
        };
      case "FAILED":
      default:
        return {
          label: "Processing Failed",
          colorClass: "bg-red-55 text-red-750 dark:bg-red-500/10 dark:text-red-400 border border-red-200/50 dark:border-red-500/20",
          dot: "🔴",
        };
    }
  };

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

  const filteredCalls = calls.filter((c) =>
    c.originalFileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030014] text-slate-800 dark:text-gray-100 flex flex-col justify-between transition-colors duration-300">
      <Navbar />

      <main className="flex-grow max-w-5xl w-full mx-auto px-6 py-12">
        {/* Navigation Breadcrumb */}
        <div className="w-full text-left mb-6">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-650 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>

        {/* Calls List */}
        <div className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <FileAudio className="w-6 h-6 text-indigo-500" />
              Conversations History
            </h2>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-grow sm:flex-grow-0">
                <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search file name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-60 pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#09081e]/60 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <button
                onClick={fetchCalls}
                disabled={isLoadingCalls}
                className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors text-slate-500 dark:text-gray-300 disabled:opacity-50 flex-shrink-0 cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${isLoadingCalls ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {isLoadingCalls && calls.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-[#09081e]/60 rounded-3xl border border-slate-200 dark:border-white/10 text-slate-500 font-semibold text-sm">
              Loading recordings...
            </div>
          ) : filteredCalls.length === 0 ? (
            <div className="text-center py-16 px-6 bg-white dark:bg-[#09081e]/60 rounded-3xl border border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400">
              <FileAudio className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
              <p className="font-semibold text-sm">No recordings found</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                {searchQuery ? "Try a different search query." : "Upload an audio file to get started."}
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
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-white/10 text-sm text-slate-700 dark:text-gray-300">
                    {filteredCalls.map((call) => (
                      <tr
                        key={call._id}
                        onClick={() => navigate(`/calls/${call._id}`)}
                        className="transition-colors hover:bg-indigo-50/30 dark:hover:bg-indigo-500/5 cursor-pointer"
                      >
                        <td className="py-4 px-6 font-medium text-slate-900 dark:text-white truncate max-w-[220px]">
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
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/calls/${call._id}`);
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors"
                              title="View details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(call._id);
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                              title="Delete record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
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
