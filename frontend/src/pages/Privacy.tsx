import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const Privacy = () => {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#030014] text-slate-800 dark:text-gray-100 flex flex-col justify-between overflow-x-hidden transition-colors duration-300">
      <Navbar />

      <div className="flex-grow max-w-4xl mx-auto px-6 md:px-12 lg:px-16 py-20 relative z-10 w-full text-left">
        {/* Background glow effects & grid */}
        <div className="bg-grid-pattern opacity-10 dark:opacity-40 pointer-events-none absolute inset-0" />
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/[0.04] dark:bg-indigo-600/10 blur-[130px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
            Privacy Policy
          </h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mb-12">
            Last Updated: July 21, 2026
          </p>

          <div className="prose prose-slate dark:prose-invert max-w-none flex flex-col gap-8 text-slate-650 dark:text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Introduction</h2>
              <p>
                Welcome to Telephonum ("we", "our", or "us"). We are committed to protecting your personal data and respect your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, utilize our conversation intelligence dashboard, or connect CRM and VoIP communications integrations to our processing engine.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. Information We Collect</h2>
              <p className="mb-3">
                To provide conversation analysis, speaker-separated transcripts, compliance evaluations, and dashboard metrics, we collect several categories of information:
              </p>
              <ul className="list-disc pl-6 flex flex-col gap-2">
                <li><strong>Account Data:</strong> Contact information, company details, full name, email, credentials, and billing preferences.</li>
                <li><strong>Audio & Media Files:</strong> Raw audio recordings uploaded directly or imported through API sync protocols for processing.</li>
                <li><strong>Metadata:</strong> Conversation timestamps, speaker IDs, sentiment trends, duration, and connection logging properties.</li>
                <li><strong>Technical Usage:</strong> IP address, device specs, browser versions, cookie states, and telemetry data.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. How We Process & Use Audio Data</h2>
              <p className="mb-3">
                Any customer conversations or audio files uploaded to Telephonum are processed strictly to perform machine learning speech-to-text operations and compile analysis dashboards. We implement the following standards:
              </p>
              <ul className="list-disc pl-6 flex flex-col gap-2">
                <li>We do not use customer call records or proprietary voice data to train public models.</li>
                <li>Data processing is executed via isolated, containerized pipelines.</li>
                <li>Transcripts and coaching reports are encrypted at rest (using AES-256) and in transit (using TLS 1.3).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Information Sharing & Sub-Processors</h2>
              <p>
                We do not sell, rent, or trade your conversational data to third parties. We only share information with validated third-party infrastructure sub-processors (such as cloud hosting and isolated AI transcription engines) under strict compliance agreements matching these privacy commitments.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">5. Data Retention & Erasure</h2>
              <p>
                We store your customer metrics and conversation reports for as long as your workspace account remains active. You can initiate a deletion request at any time through the dashboard settings, which will execute a complete purge of transcripts, metadata, and audio blocks from our production servers within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">6. Security Measures</h2>
              <p>
                Telephonum implements state-of-the-art administrative, technical, and physical security configurations. These include Multi-Factor Authentication (MFA), role-based workspace permissions, vulnerability scanning, and isolated data tenancy structures to safeguard your sensitive business assets.
              </p>
            </section>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
