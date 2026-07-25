import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Calendar, HardDrive, Clock, FileText, Copy, Check, Search, Download, Shield } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { getCall, type CallData } from "../../services/call.services";
import { toast } from "react-toastify";

export default function CallDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [call, setCall] = useState<CallData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCallDetails = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const response = await getCall(id);
      if (response.data.success) {
        setCall(response.data.data);
      } else {
        toast.error("Failed to load call details.");
        navigate("/");
      }
    } catch (error: any) {
      console.error("Failed to load call details:", error);
      toast.error(error.response?.data?.message || "Failed to load call details.");
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCallDetails();
  }, [id]);

  const handleCopy = () => {
    if (!call?.transcription?.text) return;
    navigator.clipboard.writeText(call.transcription.text);
    setCopied(true);
    toast.success("Transcription copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
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
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (secondsOrMs?: number) => {
    if (!secondsOrMs) return "00:00";
    let totalSeconds = secondsOrMs;
    if (secondsOrMs > 36000) {
      totalSeconds = Math.round(secondsOrMs / 1000);
    }
    const mins = Math.floor(totalSeconds / 60);
    const secs = Math.round(totalSeconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getSpeakerLabel = (speakerVal: string, utterances: any[]) => {
    if (!utterances) return speakerVal;
    const uniqueSpeakers = Array.from(new Set(utterances.map((u) => u.speaker)));
    if (speakerVal === uniqueSpeakers[0]) {
      return "Agent";
    } else if (speakerVal === uniqueSpeakers[1]) {
      return "Customer";
    }
    return `Speaker ${speakerVal}`;
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={index} className="bg-yellow-500/30 text-yellow-250 px-0.5 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#030014] text-slate-800 dark:text-gray-100 flex flex-col justify-between transition-colors duration-300">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-slate-500 dark:text-gray-400 font-medium">Retrieving call information...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!call) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#030014] text-slate-800 dark:text-gray-100 flex flex-col justify-between transition-colors duration-300">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <Shield className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h2 className="text-xl font-bold mb-2">Recording Not Found</h2>
            <p className="text-slate-550 dark:text-gray-400 text-sm mb-6">
              The recording you are looking for does not exist or you do not have permission to view it.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-650 hover:bg-indigo-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const audioUrl = `http://localhost:5001/uploads/audio/${call.storedFileName}`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030014] text-slate-800 dark:text-gray-100 flex flex-col justify-between transition-colors duration-300">
      <Navbar />

      <main className="flex-grow max-w-5xl w-full mx-auto px-6 py-10 flex flex-col gap-6">
        {/* Navigation Breadcrumb */}
        <div>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>

        {/* Hero Card */}
        <div className="w-full p-6 md:p-8 rounded-3xl bg-white dark:bg-[#09081e]/60 border border-slate-200 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.02)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col gap-6 transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="text-2xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400">
                  Audio Record
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-2xs font-semibold ${
                  call.status === "COMPLETED"
                    ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                    : call.status === "TRANSCRIBING" || call.status === "PROCESSING"
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400"
                    : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                }`}>
                  {call.status}
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {call.originalFileName}
              </h1>
            </div>
            {call.status === "COMPLETED" && (
              <a
                href={audioUrl}
                download={call.originalFileName}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-gray-200 transition-colors border border-slate-200 dark:border-white/10 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download Audio
              </a>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-450">
                <Clock className="w-4 h-4 text-indigo-500" />
              </div>
              <div>
                <p className="text-3xs text-slate-450 dark:text-slate-500 font-medium uppercase tracking-wider">Duration</p>
                <p className="text-xs font-bold text-slate-800 dark:text-gray-200">
                  {formatDuration(call.transcription?.duration)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-450">
                <HardDrive className="w-4 h-4 text-indigo-500" />
              </div>
              <div>
                <p className="text-3xs text-slate-450 dark:text-slate-500 font-medium uppercase tracking-wider">File Size</p>
                <p className="text-xs font-bold text-slate-800 dark:text-gray-200">{formatSize(call.size)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 col-span-2 md:col-span-2">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-450">
                <Calendar className="w-4 h-4 text-indigo-500" />
              </div>
              <div>
                <p className="text-3xs text-slate-450 dark:text-slate-500 font-medium uppercase tracking-wider">Uploaded On</p>
                <p className="text-xs font-bold text-slate-800 dark:text-gray-200">{formatDate(call.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Audio Player */}
          <div className="w-full bg-slate-50 dark:bg-[#030014]/50 border border-slate-100 dark:border-white/5 rounded-2xl p-4 flex flex-col gap-2">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Audio Player</p>
            <audio controls src={audioUrl} className="w-full h-10 mt-1 focus:outline-none" />
          </div>
        </div>

        {/* Transcription Section */}
        <div className="w-full p-6 md:p-8 rounded-3xl bg-white dark:bg-[#09081e]/60 border border-slate-200 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.02)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/5 pb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-500" />
              Transcription
            </h2>
            
            {call.status === "COMPLETED" && call.transcription?.text && (
              <div className="flex items-center gap-3">
                <div className="relative flex-grow sm:flex-grow-0">
                  <Search className="w-4 h-4 text-slate-450 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search words..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-48 pl-9 pr-4 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#030014]/50 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-650 hover:bg-indigo-700 text-white transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            )}
          </div>

          <div className="flex-grow">
            {call.status === "COMPLETED" ? (
              call.transcription?.utterances && call.transcription.utterances.length > 0 ? (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#030014]/50 border border-slate-100 dark:border-white/5 min-h-[200px] max-h-[500px] overflow-y-auto flex flex-col gap-5 select-text">
                  {call.transcription.utterances.map((u, i) => {
                    const label = getSpeakerLabel(u.speaker, call.transcription!.utterances!);
                    const isAgent = label === "Agent";
                    return (
                      <div key={i} className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold ${isAgent ? "text-indigo-600 dark:text-indigo-400" : "text-amber-600 dark:text-amber-500"}`}>
                            {label}
                          </span>
                          <span className="text-3xs text-slate-450 dark:text-slate-500 font-semibold font-mono">
                            ({formatTime(u.start)})
                          </span>
                        </div>
                        <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed font-normal select-text">
                          {highlightText(u.text, searchQuery)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : call.transcription?.text ? (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#030014]/50 border border-slate-100 dark:border-white/5 min-h-[200px] max-h-[400px] overflow-y-auto leading-relaxed text-sm text-slate-700 dark:text-gray-300 font-normal whitespace-pre-wrap select-text">
                  {highlightText(call.transcription.text, searchQuery)}
                </div>
              ) : (
                <div className="text-center py-10 text-slate-550 dark:text-slate-400">
                  No transcription text found.
                </div>
              )
            ) : call.status === "TRANSCRIBING" || call.status === "PROCESSING" ? (
              <div className="text-center py-14 flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">Transcription In Progress</h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 max-w-xs leading-relaxed">
                  AssemblyAI is currently processing your recording. This page will update automatically once completed.
                </p>
              </div>
            ) : (
              <div className="text-center py-10 text-red-500 dark:text-red-400">
                Transcription processing failed. Check the recording details.
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
