import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const handleNavClick = (sectionId: string) => {
    const isShowingDashboard = location.pathname === "/" && user && !location.search.includes("landing") && !location.state?.scrollTo;
    
    if (location.pathname === "/" && !isShowingDashboard) {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/?landing=true", { state: { scrollTo: sectionId } });
    }
  };

  return (
    <footer className="border-t border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-[#030014]/90 py-16 relative transition-colors w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
        {/* Logo & Pitch */}
        <div className="lg:col-span-5 flex flex-col items-start gap-4">
          <Link to="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight">
            <span className="text-slate-900 dark:text-white">Telephonum</span>
          </Link>
          <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm text-left">
            The premier AI conversation intelligence engine that audits 100% of customer interactions for performance, compliance, and actionable sales suggestions.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#github" className="text-slate-400 hover:text-slate-900 dark:text-gray-500 dark:hover:text-white transition-colors" aria-label="GitHub">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
            <a href="#linkedin" className="text-slate-400 hover:text-slate-900 dark:text-gray-500 dark:hover:text-white transition-colors" aria-label="LinkedIn">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Links columns */}
        <div className="lg:col-span-7 grid grid-cols-3 gap-6">
          <div className="text-left flex flex-col gap-4">
            <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Product</h5>
            <div className="flex flex-col gap-2.5 text-sm text-slate-500 dark:text-gray-400">
              <button onClick={() => handleNavClick("features")} className="hover:text-slate-900 dark:hover:text-white transition-colors text-left cursor-pointer">Features</button>
              <button onClick={() => handleNavClick("how-it-works")} className="hover:text-slate-900 dark:hover:text-white transition-colors text-left cursor-pointer">Documentation</button>
              <span className="text-sm text-slate-500 dark:text-gray-400 flex items-center gap-1.5 justify-start">
                <span className="line-through text-slate-350 dark:text-gray-655">Pricing</span>
                <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-450 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-500/20 shadow-sm">
                  Free
                </span>
              </span>
            </div>
          </div>

          <div className="text-left flex flex-col gap-4">
            <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Company</h5>
            <div className="flex flex-col gap-2.5 text-sm text-slate-500 dark:text-gray-400">
              <button onClick={() => handleNavClick("benefits")} className="hover:text-slate-900 dark:hover:text-white transition-colors text-left cursor-pointer">About</button>
              <Link to="/contact" className="hover:text-slate-955 dark:hover:text-white transition-colors">Contact</Link>
            </div>
          </div>

          <div className="text-left flex flex-col gap-4">
            <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Legal</h5>
            <div className="flex flex-col gap-2.5 text-sm text-slate-500 dark:text-gray-400">
              <Link to="/privacy" className="hover:text-slate-955 dark:hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-slate-955 dark:hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 border-t border-slate-200 dark:border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 dark:text-gray-500">
        <div>
          &copy; 2026 Telephonum AI. All rights reserved.
        </div>
        <div className="flex gap-6">
          <Link to="/terms" className="hover:text-slate-955 dark:hover:text-white transition-colors">Terms & Service</Link>
          <Link to="/privacy" className="hover:text-slate-955 dark:hover:text-white transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
