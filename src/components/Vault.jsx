import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Bookmark, Trash2, ShieldAlert } from "lucide-react";
import IdeaCard from "./IdeaCard";

function Vault({ token }) {
  const [savedIdeas, setSavedIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSaved();
  }, []);

  const fetchSaved = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/generator/saved", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to load saved vault blueprints.");
      }
      setSavedIdeas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/generator/save/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete blueprint.");
      }
      setSavedIdeas(prev => prev.filter(idea => idea.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-6xl mx-auto px-4 py-8 md:py-16 z-10 relative pointer-events-auto space-y-10"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] font-mono tracking-widest text-slate-400 uppercase">
          <Bookmark className="w-3.5 h-3.5 text-neon-cyan animate-pulse" />
          Secure Decrypted Storage
        </div>
        <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white uppercase mt-3">
          Your Blueprint Vault
        </h2>
        <p className="text-xs md:text-sm text-slate-500 font-light max-w-md mx-auto">
          Access your personalized archive of upcycled designs and mechanical logs.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="w-8 h-8 rounded-full border border-slate-700 border-t-neon-cyan animate-spin" />
          <span className="text-slate-500 font-mono text-xs uppercase tracking-widest">Accessing Secure Vault...</span>
        </div>
      ) : error ? (
        <div className="max-w-md mx-auto p-4 bg-red-500/10 border border-red-500/15 rounded-xl text-red-450 text-xs font-mono tracking-wide text-center flex items-center justify-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      ) : savedIdeas.length === 0 ? (
        <div className="glassmorphism p-12 rounded-3xl border border-white/10 text-center max-w-xl mx-auto space-y-4">
          <Bookmark className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold font-display text-slate-350 uppercase">Vault Unoccupied</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            You haven't generated or saved any luxury reuse concepts yet. Go back to the Generator and elevate some waste!
          </p>
        </div>
      ) : (
        /* Grid of Saved Ideas */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <AnimatePresence mode="popLayout">
            {savedIdeas.map((idea, index) => (
              <div key={idea.id} className="relative group flex flex-col">
                <IdeaCard
                  item={idea.item}
                  product={idea.product}
                  category={idea.category}
                  difficulty={idea.difficulty}
                  match={idea.match}
                  description={idea.description}
                  materials={idea.materials}
                  steps={idea.steps}
                  accentColor={idea.accent_color}
                  floatSpeed={6 + (index % 3) * 0.5}
                />
                
                {/* Delete button positioned absolute overlay on hover */}
                <button
                  onClick={() => handleDelete(idea.id)}
                  className="absolute top-4 right-4 p-2 bg-black/75 hover:bg-red-550 border border-white/10 hover:border-red-500 text-slate-400 hover:text-white rounded-full transition-all opacity-0 group-hover:opacity-100 z-20 cursor-pointer pointer-events-auto shadow-md"
                  title="Remove from vault"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

export default Vault;
