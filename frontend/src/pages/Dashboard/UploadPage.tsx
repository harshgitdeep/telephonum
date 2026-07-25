import { useState, useRef } from "react";
import { Upload, ArrowLeft, RefreshCw, CheckCircle } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { uploadCall } from "../../services/call.services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function UploadPage() {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    setIsSuccess(false);

    try {
      const response = await uploadCall(file, (progress) => {
        setUploadProgress(progress);
      });

      if (response.data.success) {
        toast.success("Audio uploaded successfully!");
        setIsSuccess(true);
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030014] text-slate-800 dark:text-gray-100 flex flex-col justify-between transition-colors duration-300">
      <Navbar />

      <main className="flex-grow flex flex-col items-center max-w-3xl w-full mx-auto px-6 py-12">
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

        <div className="w-full text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            Upload Call Recording
          </h1>
          <p className="text-slate-550 dark:text-gray-400 text-sm max-w-md mx-auto">
            Drag and drop your conversational audio files here to initiate automatic AssemblyAI speech-to-text processing.
          </p>
        </div>

        {/* Drag and Drop Upload Card */}
        <div className="w-full p-6 md:p-8 rounded-3xl bg-white dark:bg-[#09081e]/60 border border-slate-200 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.02)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col gap-6 transition-all duration-300">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept="audio/*"
          />

          {isSuccess ? (
            <div className="flex flex-col items-center justify-center p-12 text-center gap-4">
              <CheckCircle className="w-16 h-16 text-emerald-500 animate-bounce" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Processing Initiated!</h3>
              <p className="text-xs text-slate-500 dark:text-gray-400 max-w-sm">
                Your file has been uploaded successfully. The background workers are currently running transcription.
              </p>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-indigo-650 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 transition-all cursor-pointer"
                >
                  Upload Another File
                </button>
                <button
                  onClick={() => navigate("/calls")}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-650 hover:bg-indigo-700 transition-all cursor-pointer"
                >
                  Go to Calls Dashboard
                </button>
              </div>
            </div>
          ) : (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => !isUploading && fileInputRef.current?.click()}
              className={`border border-dashed rounded-2xl flex flex-col items-center justify-center p-16 cursor-pointer transition-all ${
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
                    <span className="text-indigo-650 dark:text-indigo-400 flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
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
                  <Upload className="w-10 h-10 text-indigo-500 dark:text-indigo-400 mb-4 animate-pulse" />
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Drag and drop audio files here
                  </span>
                  <span className="text-xs text-slate-450 dark:text-slate-500 mb-1">
                    or click to browse local files
                  </span>
                  <span className="text-4xs text-slate-400 dark:text-slate-600 mt-2 font-mono">
                    Supported formats: MP3, WAV, M4A, WEBM, OGG (Max 50MB)
                  </span>
                </>
              )}
            </div>
          )}

          {!isUploading && !isSuccess && (
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
      </main>

      <Footer />
    </div>
  );
}
