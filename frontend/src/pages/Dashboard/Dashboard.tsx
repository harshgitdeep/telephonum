import { useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { Upload, PhoneCall } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function Dashboard() {
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStep, setUploadStep] = useState<"idle" | "uploading" | "transcribing" | "completed">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

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
      simulateUpload();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    if (isUploading) return;
    setIsUploading(true);
    setUploadStep("uploading");
    setUploadProgress(25);

    setTimeout(() => {
      setUploadStep("transcribing");
      setUploadProgress(65);
    }, 1200);

    setTimeout(() => {
      setUploadStep("completed");
      setUploadProgress(100);
    }, 2400);

    setTimeout(() => {
      setIsUploading(false);
      setUploadStep("idle");
      setUploadProgress(0);
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030014] text-slate-800 dark:text-gray-100 flex flex-col justify-between transition-colors duration-300">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center max-w-xl w-full mx-auto px-6 py-12">
        <div className="w-full text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            Hello, {user?.name?.split(" ")[0] || "there"} 👋
          </h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
            Upload a conversation to generate AI transcripts, summaries, QA scores, and insights.
          </p>
        </div>

        {/* Drag and Drop Upload Card */}
        <div className="w-full p-6 md:p-8 rounded-3xl bg-white dark:bg-[#09081e]/60 border border-slate-200 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.02)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col gap-6 transition-all duration-300">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept="audio/*,video/*"
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
                  <span className="text-indigo-650 dark:text-indigo-400 capitalize">
                    {uploadStep === "completed" ? "Analysis Complete!" : `${uploadStep}...`}
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
                  Supported formats: MP3, WAV, M4A, MP4
                </span>
              </>
            )}
          </div>

          {!isUploading && (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-[0_0_15px_rgba(99,102,241,0.15)] dark:shadow-[0_0_15px_rgba(99,102,241,0.3)] cursor-pointer text-center"
              >
                Upload Audio
              </button>
              <button
                onClick={simulateUpload}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-slate-650 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200/80 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 transition-all duration-200 cursor-pointer text-center flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Record Live
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
