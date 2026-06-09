import { motion } from "framer-motion";
import { Sparkles, Bookmark, Compass, HelpCircle, Zap } from "lucide-react";

function Navbar({ setView, currentView, user, onLogout }) {
  const handleLogoClick = () => {
    setView("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleHomeAnchor = (e, anchorId) => {
    e.preventDefault();
    setView("home");
    setTimeout(() => {
      const element = document.getElementById(anchorId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <motion.nav 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 left-0 right-0 z-50 max-w-6xl mx-auto px-4 pointer-events-none"
    >
      <div className="glassmorphism glassmorphism-glow-cyan py-4 px-6 md:px-8 rounded-full flex items-center justify-between pointer-events-auto">
        {/* Logo */}
        <div onClick={handleLogoClick} className="flex items-center gap-2.5 cursor-pointer group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/10 overflow-hidden group-hover:border-neon-cyan/45 transition-colors duration-300">
            <span className="text-neon-cyan font-display font-black text-sm">SR</span>
            <div className="absolute inset-0 bg-gradient-to-tr from-neon-cyan/20 to-transparent animate-pulse" />
          </div>
          <div>
            <h1 className="text-sm font-bold font-display tracking-widest text-slate-100 uppercase m-0 leading-none group-hover:text-white transition-colors duration-300">
              Smart Reuse
            </h1>
            <span className="text-[9px] font-mono tracking-widest text-neon-cyan/85 uppercase block mt-0.5">
              Idea Generator
            </span>
          </div>
        </div>

        {/* Menu (Hidden on Mobile) */}
        <ul className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-slate-400">
          <li>
            <button 
              onClick={() => setView("discover")} 
              className={`hover:text-neon-cyan transition-colors flex items-center gap-1.5 cursor-pointer bg-transparent border-none focus:outline-none ${
                currentView === "discover" ? "text-neon-cyan font-semibold" : ""
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Discover
            </button>
          </li>
          <li>
            <button 
              onClick={() => setView("upgrade")} 
              className={`hover:text-neon-cyan transition-colors flex items-center gap-1.5 cursor-pointer bg-transparent border-none focus:outline-none ${
                currentView === "upgrade" ? "text-neon-cyan font-semibold" : ""
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Upgrade
            </button>
          </li>
          <li>
            <button 
              onClick={(e) => handleHomeAnchor(e, "generator")} 
              className="hover:text-neon-cyan transition-colors flex items-center gap-1.5 cursor-pointer bg-transparent border-none focus:outline-none"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Blueprints
            </button>
          </li>
        </ul>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-white/5 rounded-full border border-white/5 text-xs font-mono text-slate-350">
                <span className="h-2 w-2 rounded-full bg-neon-green animate-pulse" />
                <span className="max-w-[100px] truncate">{user.name}</span>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogout}
                className="px-4 py-1.5 bg-white/5 hover:bg-white/10 hover:border-red-500/30 rounded-full text-slate-400 hover:text-red-400 text-xs font-mono border border-white/5 transition-all cursor-pointer focus:outline-none"
              >
                Exit
              </motion.button>
            </>
          ) : (
            <>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView("login")}
                className={`flex items-center gap-1.5 px-4 py-1.5 bg-white/5 hover:bg-white/10 rounded-full text-slate-300 hover:text-white text-xs font-mono border border-white/5 transition-all cursor-pointer focus:outline-none ${
                  currentView === "login" ? "border-neon-cyan/40 text-neon-cyan bg-neon-cyan/5" : ""
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Vault</span>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView("signup")}
                className={`flex items-center gap-1.5 px-4.5 py-1.5 bg-gradient-to-r from-neon-cyan/20 to-neon-green/20 hover:from-neon-cyan/30 hover:to-neon-green/30 border border-neon-cyan/30 rounded-full text-slate-200 hover:text-white text-xs font-mono transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.1)] focus:outline-none ${
                  currentView === "signup" ? "border-neon-green/45 text-neon-green" : ""
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-neon-cyan" />
                Integrate
              </motion.button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
