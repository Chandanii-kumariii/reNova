import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

function Hero() {
  return (
    <section className="relative pt-36 pb-12 flex flex-col items-center justify-center text-center overflow-hidden z-10 pointer-events-none">
      {/* Background glow mesh for the Hero */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-neon-cyan/5 via-transparent to-neon-green/3 pointer-events-none blur-3xl -z-10" />

      {/* Tag indicator */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full text-xs font-mono tracking-widest text-slate-400 uppercase mb-6"
      >
        <Sparkles className="w-3.5 h-3.5 text-neon-cyan animate-pulse" />
        Zero-Gravity Design Lab
      </motion.div>

      {/* Main Bold Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="text-5xl md:text-8xl font-black font-display tracking-tight text-white mb-6 uppercase"
      >
        Waste, <span className="bg-gradient-to-r from-neon-cyan via-white to-neon-green bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(139,92,246,0.15)]">Elevated.</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-2xl text-slate-400 text-base md:text-lg font-light leading-relaxed px-4 mb-8"
      >
        We deconstruct everyday trash—discarded glassware, forgotten skateboards, raw metals—and re-architect them into high-end, zero-gravity design concepts. Utility, redefined.
      </motion.p>

      {/* Micro-cta scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0], y: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="flex flex-col items-center gap-1.5 cursor-pointer text-[10px] font-mono tracking-widest uppercase text-slate-500 hover:text-neon-cyan transition-colors pointer-events-auto"
        onClick={() => document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span>Initialize Generator</span>
        <ArrowDown className="w-3 h-3 text-neon-cyan" />
      </motion.div>
    </section>
  );
}

export default Hero;