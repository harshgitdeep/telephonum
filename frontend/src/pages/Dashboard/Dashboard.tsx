import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Upload, Trash2, FileAudio, Calendar, HardDrive, RefreshCw } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { uploadCall, getCalls, deleteCall, type CallData } from "../../services/call.services";
import { toast } from "react-toastify";

export default function Dashboard() {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [calls, setCalls] = useState<CallData[]>([]);
  const [isLoadingCalls, setIsLoadingCalls] = useState(false);

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = async (file: File) => {
    // Validate file type
    const allowedExtensions = [".mp3", ".wav", ".m4a", ".webm", ".ogg"];
    const isAudio = file.type.startsWith("audio/") || allowedExtensions.some(ext => file.name.endsWith(ext));

    if (!isAudio) {
      toast.error("Invalid file format. Please upload an audio file (MP3, WAV, M4A, WEBM, OGG).");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast.error("File size exceeds 50MB limit.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const response = await uploadCall(file, (progress) => {
        setUploadProgress(progress);
      });

      if (response.data.success) {
        toast.success("Audio uploaded successfully!");
        fetchCalls();
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.response?.data?.message || "Failed to upload audio recording.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030014] text-slate-800 dark:text-gray-100 flex flex-col justify-between transition-colors duration-300">
      <Navbar />

      <main className="flex-grow flex flex-col items-center max-w-4xl w-full mx-auto px-6 py-12">
        <div className="w-full text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            Hello, {user?.name?.split(" ")[0] || "there"} 👋
          </h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
            Upload conversation audio files to save them to your account.
          </p>
        </div>

        {/* Drag and Drop Upload Card */}
        <div className="w-full p-6 md:p-8 rounded-3xl bg-white dark:bg-[#09081e]/60 border border-slate-200 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.02)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col gap-6 transition-all duration-300 mb-8">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept="audio/*"
          />

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className={`border border-dashed rounded-2xl flex flex-col items-center justify-center p-12 cursor-pointer transition-all ${
              isDragging
                ? "border-indigo-500 bg-indigo-500/10 scale-98"
                : isUploading
                ? "border-slate-200 dark:border-white/5 bg-slate-50/55 dark:bg-white/2 cursor-default"
                : "border-slate-250 dark:border-white/10 hover:border-indigo-500/50 hover:bg-slate-50 dark:hover:bg-white/2"
            }`}
          >
            {isUploading ? (
              <div className="w-full max-w-xs flex flex-col gap-3 text-center">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-indigo-650 dark:text-indigo-400">
                    Uploading audio...
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">{uploadProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 text-indigo-500 dark:text-indigo-400 mb-4 animate-pulse" />
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Drag and drop audio files here
                </span>
                <span className="text-xs text-slate-450 dark:text-slate-500">
                  Supported formats: MP3, WAV, M4A, WEBM, OGG (Max 50MB)
                </span>
              </>
            )}
          </div>

          {!isUploading && (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-[0_0_15px_rgba(99,102,241,0.15)] dark:shadow-[0_0_15px_rgba(99,102,241,0.3)] cursor-pointer text-center font-semibold"
              >
                Upload Audio File
              </button>
            </div>
          )}
        </div>

        {/* Calls History List */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileAudio className="w-5 h-5 text-indigo-500" />
              Call History
            </h2>
            <button
              onClick={fetchCalls}
              disabled={isLoadingCalls}
              className="p-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors text-slate-500 dark:text-gray-300 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingCalls ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {isLoadingCalls && calls.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-[#09081e]/60 rounded-3xl border border-slate-200 dark:border-white/10 text-slate-500">
              Loading calls...
            </div>
          ) : calls.length === 0 ? (
            <div className="text-center py-12 px-6 bg-white dark:bg-[#09081e]/60 rounded-3xl border border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400">
              <FileAudio className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
              <p className="font-semibold text-sm">No audio recordings found</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Upload your first audio file above to get started.</p>
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
                    {calls.map((call) => (
                      <tr key={call._id} className="hover:bg-slate-50/50 dark:hover:bg-white/2 transition-colors">
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
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-2xs font-semibold ${
                            call.status === "COMPLETED"
                              ? "bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-400"
                              : call.status === "PROCESSING"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400"
                              : call.status === "FAILED"
                              ? "bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-400"
                              : "bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-gray-400"
                          }`}>
                            {call.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleDelete(call._id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                            title="Delete record"
                          >
                            <Trash2 className="w-4 h-4" />
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
