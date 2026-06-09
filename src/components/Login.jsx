import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Shield, ArrowRight, Sparkles } from "lucide-react";

function Login({ setView, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      let data = {};
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new Error(data.error || `Server responded with status ${response.status}. Please make sure the backend is running.`);
      }

      onLogin(data.user, data.token);
    } catch (err) {
      if (err.name === "SyntaxError") {
        setError("Invalid response payload from server registry.");
      } else if (err.message.includes("Failed to fetch")) {
        setError("Unable to connect to registry server. Please verify backend is running on port 5000.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md mx-auto px-4 py-12 md:py-20 z-10 relative pointer-events-auto"
    >
      <div className="glassmorphism glassmorphism-glow-cyan p-8 rounded-3xl border border-white/10 relative overflow-hidden backdrop-blur-xl space-y-6">
        
        {/* Glow Effects */}
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-neon-cyan/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-neon-green/5 blur-3xl pointer-events-none" />
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] font-mono tracking-widest text-slate-400 uppercase">
            <Shield className="w-3.5 h-3.5 text-neon-cyan" />
            Security Gateway
          </div>
          <h2 className="text-3xl font-bold font-display tracking-tight text-white uppercase mt-3">
            Enter the Void
          </h2>
          <p className="text-xs text-slate-500 font-light">
            Authenticate to sync physical feedstock blueprints.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3.5 bg-red-500/10 border border-red-500/15 rounded-xl text-red-400 text-xs font-mono tracking-wide text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">
              Identity Email
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 w-4 h-4 text-slate-600" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="identity@smartreuse.org"
                required
                className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/5 hover:border-white/10 focus:border-neon-cyan/40 focus:outline-none focus:ring-1 focus:ring-neon-cyan/30 rounded-xl text-xs font-mono text-slate-300 placeholder-slate-600 transition-all"
                aria-label="Email address input"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">
                Access Code
              </label>
              <a href="#" className="text-[9px] font-mono uppercase tracking-widest text-neon-cyan hover:text-violet-400 transition-colors">
                Recover Code?
              </a>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-4 h-4 text-slate-600" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/5 hover:border-white/10 focus:border-neon-cyan/40 focus:outline-none focus:ring-1 focus:ring-neon-cyan/30 rounded-xl text-xs font-mono text-slate-300 placeholder-slate-600 transition-all"
                aria-label="Password input"
              />
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-light pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input 
                type="checkbox" 
                className="accent-neon-cyan bg-black/40 border border-white/10 rounded cursor-pointer"
              />
              Persist Session
            </label>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-neon-cyan to-neon-cyan/80 hover:from-neon-cyan hover:to-violet-400 text-black font-semibold rounded-xl text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.2)] cursor-pointer flex items-center justify-center gap-1.5"
          >
            {loading ? (
              <span>Decrypting Portal...</span>
            ) : (
              <>
                Synchronize Session
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </motion.button>
        </form>

        {/* Footer Link */}
        <div className="pt-4 border-t border-white/5 text-center text-xs text-slate-500 font-light">
          <span>New node in the cluster? </span>
          <button 
            onClick={() => setView("signup")}
            className="text-neon-cyan hover:text-violet-400 hover:underline font-mono uppercase tracking-wide cursor-pointer transition-colors"
          >
            Initialize Access
          </button>
        </div>

      </div>
    </motion.div>
  );
}

export default Login;
