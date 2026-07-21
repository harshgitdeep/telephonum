import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const Terms = () => {
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
            Terms of Service
          </h1>
          <p className="text-slate-500 dark:text-gray-400 text-sm mb-12">
            Last Updated: July 21, 2026
          </p>

          <div className="prose prose-slate dark:prose-invert max-w-none flex flex-col gap-8 text-slate-650 dark:text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Agreement to Terms</h2>
              <p>
                By creating an account, connecting workspace communication integrations, or using any feature of Telephonum ("the Service"), you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. Description of Service</h2>
              <p>
                Telephonum provides AI-powered conversation intelligence tools, including automated audio recording analysis, speaker-separated transcription, coaching evaluations, compliance scoring, and aggregate metrics. We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time with or without notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. Account Integrity & Usage</h2>
              <p className="mb-3">
                To access the Service, you must provide valid registration details. You are responsible for safeguarding your credentials and for all activities that occur under your account. You agree not to:
              </p>
              <ul className="list-disc pl-6 flex flex-col gap-2">
                <li>Upload audio files for which you do not possess processing rights or explicit consent.</li>
                <li>Circumvent or compromise any security checks or rate limits on our platform.</li>
                <li>Decompile, reverse-engineer, or attempt to extract source code from our processing algorithms.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Recording Consent Responsibilities</h2>
              <p className="mb-3">
                Many jurisdictions enforce strict laws regarding the recording and monitoring of telephone calls and online meetings. You acknowledge and agree that:
              </p>
              <ul className="list-disc pl-6 flex flex-col gap-2">
                <li>You are solely responsible for complying with all applicable recording laws (such as GDPR consent requirements and US state-level wiretapping statutes).</li>
                <li>You will secure all necessary notifications and agreements from speakers prior to sync processing.</li>
                <li>Telephonum acts solely as a data processor and disclaims all liability related to unauthorized recordings.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">5. Intellectual Property</h2>
              <p>
                As between the parties, you retain all ownership rights to the raw conversational audio and transcribed text data synced to your account. Telephonum retains all rights, titles, and interests in the Service structure, custom scripts, visual assets, analytics formulas, machine learning models, and standard dashboard components.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">6. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Telephonum shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, voice data, or compliance penalties, resulting from your use of or inability to use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">7. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any legal action arising from these terms shall be resolved exclusively in the state or federal courts located in San Francisco, California.
              </p>
            </section>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
