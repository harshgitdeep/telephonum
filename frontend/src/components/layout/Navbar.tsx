import { Link, useNavigate, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.svg";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId: string) => {
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-white/5 bg-slate-50/75 dark:bg-[#030014]/65 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight hover:opacity-90 transition-opacity">
          <div className="w-10 h-10 flex items-center justify-center dark:bg-white dark:rounded-lg transition-all duration-200">
            <img src={logo} alt="Telephonum Logo" className="w-8 h-8 object-contain" />
          </div>
          <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            Telephonum
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => handleNavClick("features")} 
            className="text-sm text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer"
          >
            Features
          </button>
          <button 
            onClick={() => handleNavClick("how-it-works")} 
            className="text-sm text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer"
          >
            How It Works
          </button>
          <button 
            onClick={() => handleNavClick("benefits")} 
            className="text-sm text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer"
          >
            About
          </button>
          <span className="text-sm text-slate-500 dark:text-gray-400 flex items-center gap-1.5">
            <span className="line-through text-slate-350 dark:text-gray-600">Pricing</span>
            <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-450 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-500/20 shadow-sm">
              Free
            </span>
          </span>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white bg-slate-100 hover:bg-slate-200/80 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 transition-all duration-200 cursor-pointer flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>
          {user ? (
            <>
              <span className="text-sm font-medium text-slate-700 dark:text-gray-300">
                Hi, {user.name || user.email}
              </span>
              <button 
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="text-sm font-semibold text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                Login
              </Link>
              <Link 
                to="/register" 
                className="relative group px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-[0_0_15px_rgba(99,102,241,0.15)] dark:shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_20px_rgba(99,102,241,0.35)] dark:hover:shadow-[0_0_20px_rgba(99,102,241,0.55)]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
