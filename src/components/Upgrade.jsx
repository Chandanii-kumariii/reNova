import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check, Cpu, Zap, Shield, RotateCw } from "lucide-react";

function Upgrade({ setView }) {
  const [loading, setLoading] = useState(false);
  const [syncStep, setSyncStep] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState("");

  const plans = [
    {
      name: "Starter Node",
      price: "$0",
      period: "forever",
      desc: "Basic material scanning and blueprint viewing credentials.",
      features: [
        "3 Feedstock scans per day",
        "Standard-def blueprint files",
        "Community gallery access",
        "Basic material matching engine"
      ],
      buttonText: "Active Protocol",
      action: null,
      accent: "slate",
      glow: "border-white/5"
    },
    {
      name: "Pro Operator",
      price: "$29",
      period: "monthly",
      desc: "Unlock infinite scans, private vaults, and high-res print outputs.",
      features: [
        "Infinite material deconstructions",
        "High-fidelity CAD / STL file downloads",
        "Private blueprint vault mapping",
        "24/7 Priority design priority queue",
        "Custom design catalog submission"
      ],
      buttonText: "Elevate Node",
      action: "Pro",
      accent: "cyan",
      glow: "glassmorphism-glow-cyan border-neon-cyan/20",
      popular: true
    },
    {
      name: "Enterprise Cluster",
      price: "$99",
      period: "monthly",
      desc: "Direct local manufacturing integrations and team node tokens.",
      features: [
        "Everything in Pro Operator tier",
        "Direct local 3D print/CNC API integrations",
        "Custom material molecular simulations",
        "10 Team operator seats",
        "Dedicated support nodes"
      ],
      buttonText: "Instantiate Cluster",
      action: "Enterprise",
      accent: "green",
      glow: "glassmorphism-glow-green border-neon-green/20"
    }
  ];

  const handleUpgrade = (planName) => {
    setSelectedPlan(planName);
    setLoading(true);
    setSyncStep(1);

    const steps = [
      { text: "Contacting billing ledger...", time: 700 },
      { text: "Confirming gas limit and credits...", time: 1400 },
      { text: "Synchronizing node capabilities...", time: 2100 },
      { text: "Node authorization complete!", time: 2800 }
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setSyncStep(idx + 1);
      }, step.time);
    });

    setTimeout(() => {
      setLoading(false);
      setSyncStep(0);
      setView("home");
    }, 3200);
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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] font-mono tracking-widest text-slate-400 uppercase">
          <Zap className="w-3.5 h-3.5 text-neon-cyan animate-pulse" />
          Capability Upgrades
        </div>
        <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white uppercase mt-2">
          Elevate Your Node
        </h2>
        <p className="text-xs md:text-sm text-slate-500 font-light max-w-md mx-auto">
          Upgrade your authorization parameters to unlock advanced molecular calculation, infinite scans, and direct CNC/3D print integrations.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
        {plans.map((plan, idx) => {
          const isCyan = plan.accent === "cyan";
          const isGreen = plan.accent === "green";
          const accentText = isCyan ? "text-neon-cyan" : isGreen ? "text-neon-green" : "text-slate-400";
          const buttonBg = isCyan 
            ? "bg-gradient-to-r from-neon-cyan to-neon-cyan/80 hover:from-neon-cyan hover:to-violet-400 text-black shadow-[0_0_15px_rgba(139,92,246,0.2)]" 
            : isGreen 
            ? "bg-gradient-to-r from-neon-green to-neon-green/80 hover:from-neon-green hover:to-pink-400 text-black shadow-[0_0_15px_rgba(236,72,153,0.2)]" 
            : "bg-white/5 border border-white/5 text-slate-400 cursor-not-allowed";

          return (
            <div 
              key={idx} 
              className={`glassmorphism ${plan.glow} p-8 rounded-3xl border relative overflow-hidden flex flex-col justify-between h-full group transition-all duration-300 ${
                plan.popular ? "md:-translate-y-4" : ""
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-neon-cyan/10 border border-neon-cyan/20 text-[9px] font-mono tracking-widest text-neon-cyan uppercase font-bold">
                  <Sparkles className="w-3 h-3" />
                  Optimal Node
                </div>
              )}

              {/* Top half */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold font-display text-slate-200 uppercase tracking-wide group-hover:text-white transition-colors duration-300">
                    {plan.name}
                  </h3>
                  <p className="text-slate-500 text-xs mt-2 font-light min-h-[32px]">
                    {plan.desc}
                  </p>
                </div>

                {/* Price block */}
                <div className="flex items-baseline gap-1.5 border-y border-white/5 py-4">
                  <span className="text-4xl md:text-5xl font-black font-display text-white tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-slate-500 text-xs font-mono lowercase">
                    / {plan.period}
                  </span>
                </div>

                {/* Feature List */}
                <ul className="space-y-3.5 text-xs text-slate-400 font-light">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${accentText}`} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Upgrade Button */}
              <div className="pt-8 mt-auto">
                <motion.button
                  whileHover={plan.action ? { scale: 1.02 } : {}}
                  whileTap={plan.action ? { scale: 0.98 } : {}}
                  disabled={!plan.action}
                  onClick={() => plan.action && handleUpgrade(plan.name)}
                  className={`w-full py-3 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${buttonBg} ${
                    plan.action ? "cursor-pointer" : "cursor-not-allowed"
                  }`}
                >
                  {plan.buttonText}
                </motion.button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Checkout Simulator Modal */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 pointer-events-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="glassmorphism glassmorphism-glow-cyan p-8 md:p-10 rounded-3xl border border-white/10 max-w-sm w-full text-center space-y-6"
            >
              {/* Spinning Loader */}
              <div className="relative mx-auto w-16 h-16">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="w-full h-full rounded-full border-2 border-transparent border-t-neon-cyan border-b-neon-green/40 p-1"
                >
                  <div className="w-full h-full rounded-full border border-dashed border-white/10" />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <RotateCw className="w-5 h-5 text-neon-cyan animate-spin duration-[3000ms]" />
                </div>
              </div>

              {/* Progress text */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-neon-cyan block">
                  Telemetric billing Sync
                </span>
                <h4 className="text-slate-250 font-bold font-display uppercase tracking-wide">
                  Elevating to {selectedPlan}
                </h4>
                
                <div className="h-6 overflow-hidden relative">
                  <AnimatePresence mode="popLayout">
                    <motion.p
                      key={syncStep}
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -15, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-slate-400 font-light text-xs tracking-wide"
                    >
                      {syncStep === 1 && "Connecting cryptogateway node..."}
                      {syncStep === 2 && "Confirming ledger credentials..."}
                      {syncStep === 3 && "Allocating gas limits and keys..."}
                      {syncStep === 4 && "Node authorization verified!"}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Progress bar loader */}
                <div className="w-36 h-1 bg-white/5 rounded-full overflow-hidden mx-auto mt-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.2, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-neon-cyan to-neon-green"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Upgrade;
