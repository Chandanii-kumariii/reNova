import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Sparkles, ArrowUpRight, ShieldAlert, Cpu } from "lucide-react";

function IdeaCard({ 
  item = "Wine Bottles", 
  product = "Ethereal Luminary", 
  category = "Luxury Lighting", 
  difficulty = "Intermediate", 
  match = "98%", 
  description = "A floating solar-powered chandelier crafted from dark green glass and brushed brass accents.", 
  materials = ["Green bottles", "Brass rings", "LED filament", "Solar cell"],
  steps = [],
  accentColor = "cyan",
  delay = 0,
  floatSpeed = 6
}) {
  const cardRef = useRef(null);
  const [hoverBg, setHoverBg] = useState({ x: 0, y: 0, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Motion values for the mouse position (relative to card center)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse coordinate offset to rotation degrees (tilt effect)
  // Maximum tilt is 12 degrees. We divide by card dimensions to keep it responsive.
  const rotateX = useTransform(y, [-150, 150], [12, -12]);
  const rotateY = useTransform(x, [-150, 150], [-12, 12]);

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Mouse coords relative to card center
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;

    // Set the motion values
    x.set(mouseX);
    y.set(mouseY);

    // Spotlight absolute position on the card
    const spotX = event.clientX - rect.left;
    const spotY = event.clientY - rect.top;
    setHoverBg({ x: spotX, y: spotY, opacity: 1 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    setHoverBg(prev => ({ ...prev, opacity: 0 }));
  };

  // Accent-specific classes
  const isCyan = accentColor === "cyan";
  const glowClass = isCyan ? "glassmorphism-glow-cyan" : "glassmorphism-glow-green";
  const accentText = isCyan ? "text-neon-cyan" : "text-neon-green";
  const accentBg = isCyan ? "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20" : "bg-neon-green/10 text-neon-green border-neon-green/20";
  const accentBorderHover = isCyan ? "hover:border-neon-cyan/30" : "hover:border-neon-green/30";
  const spotlightColor = isCyan ? "rgba(139, 92, 246, 0.12)" : "rgba(236, 72, 153, 0.12)";

  return (
    /* Outer Reveal Wrapper */
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: delay, ease: [0.16, 1, 0.3, 1] }}
      className="perspective-[1000px] w-full pointer-events-auto"
    >
      {/* Ambient Float Wrapper */}
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: floatSpeed,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="w-full h-full"
      >
        {/* Interactive 3D Tilt Wrapper */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            transformStyle: "preserve-3d",
          }}
          transition={isHovered ? { type: "spring", stiffness: 300, damping: 25 } : { type: "spring", stiffness: 100, damping: 20 }}
          className={`glassmorphism ${glowClass} ${accentBorderHover} relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300 w-full h-full flex flex-col justify-between group`}
        >
          {/* Cursor Spotlight Layer */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(280px circle at ${hoverBg.x}px ${hoverBg.y}px, ${spotlightColor}, transparent 80%)`,
              opacity: hoverBg.opacity,
            }}
          />

          {/* Holographic Border Flare */}
          <div 
            className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out`}
          />

          <div style={{ transform: "translateZ(30px)" }} className="space-y-4">
            {/* Header tags */}
            <div className="flex justify-between items-center text-xs tracking-wider uppercase">
              <span className="text-slate-400 font-medium">Source: {item}</span>
              <span className={`px-2 py-0.5 rounded-full border text-[10px] ${accentBg}`}>
                {match} Match
              </span>
            </div>

            {/* Title & Category */}
            <div>
              <div className="text-slate-500 text-xs font-mono mb-1 flex items-center gap-1.5 uppercase tracking-widest">
                <Cpu className="w-3.5 h-3.5" />
                {category}
              </div>
              <h3 className="text-2xl font-bold font-display text-slate-100 tracking-tight group-hover:text-white transition-colors duration-300 flex items-start justify-between gap-2">
                {product}
                <ArrowUpRight className="w-5 h-5 opacity-30 group-hover:opacity-100 group-hover:text-neon-cyan transition-all duration-300 shrink-0 mt-1" />
              </h3>
            </div>

            {/* Description */}
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              {description}
            </p>

            {/* Divider */}
            <div className="h-[1px] bg-white/5 w-full" />
            
            {/* Materials List */}
            <div>
              <span className="text-slate-500 text-[10px] uppercase tracking-wider block mb-2 font-semibold">Required Elements</span>
              <div className="flex flex-wrap gap-1.5">
                {materials.map((mat, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs bg-white/5 border border-white/5 px-2.5 py-1 rounded-md text-slate-300 font-mono tracking-tight"
                  >
                    {mat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer of the card */}
          <div 
            style={{ transform: "translateZ(15px)" }}
            className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-500"
          >
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${isCyan ? 'bg-neon-cyan' : 'bg-neon-green'} animate-pulse`}></span>
              Difficulty: <strong className="text-slate-300 font-medium">{difficulty}</strong>
            </span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className={`text-[10px] font-mono tracking-widest uppercase ${accentText} hover:brightness-125 transition-all font-bold cursor-pointer hover:underline`}
            >
              Reveal Guide
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Blueprint Step-by-Step Guide Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", duration: 0.5 }}
              className={`glassmorphism ${glowClass} max-w-lg w-full rounded-3xl p-6 md:p-8 space-y-6 relative border border-white/10 overflow-hidden text-left`}
            >
              {/* Glow Effects inside Modal */}
              <div className={`absolute -top-24 -left-24 w-48 h-48 rounded-full ${isCyan ? "bg-neon-cyan/10" : "bg-neon-green/10"} blur-3xl pointer-events-none`} />
              <div className={`absolute -bottom-24 -right-24 w-48 h-48 rounded-full ${isCyan ? "bg-neon-cyan/5" : "bg-neon-green/5"} blur-3xl pointer-events-none`} />

              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 bg-white/5 border border-white/5 hover:border-white/15 text-slate-400 hover:text-white rounded-full transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>

              {/* Header */}
              <div className="space-y-1">
                <span className={`text-[10px] font-mono tracking-widest uppercase ${accentText}`}>
                  {category} Blueprint
                </span>
                <h3 className="text-2xl md:text-3xl font-black font-display text-white tracking-tight leading-tight uppercase">
                  {product}
                </h3>
                <p className="text-xs text-slate-500 font-light font-mono uppercase tracking-wider">
                  Source: {item} &bull; Match: {match} &bull; {difficulty}
                </p>
              </div>

              {/* Description */}
              <p className="text-slate-350 text-xs leading-relaxed font-light bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                {description}
              </p>

              {/* Materials */}
              <div className="space-y-2">
                <span className="text-slate-500 text-[10px] font-mono uppercase tracking-widest block font-bold">Required Elements</span>
                <div className="flex flex-wrap gap-1.5">
                  {materials.map((mat, idx) => (
                    <span 
                      key={idx} 
                      className="text-[11px] bg-white/5 border border-white/5 px-2.5 py-1 rounded-md text-slate-300 font-mono tracking-tight"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                <span className="text-slate-500 text-[10px] font-mono uppercase tracking-widest block font-bold">Step-by-Step Upcycling Guide</span>
                <div className="space-y-3 max-h-52 overflow-y-auto pr-1 no-scrollbar">
                  {steps && steps.length > 0 ? (
                    steps.map((step, idx) => (
                      <div key={idx} className="flex gap-3 items-start">
                        <div className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[10px] font-mono font-bold ${accentBg} border`}>
                          {idx + 1}
                        </div>
                        <p className="text-slate-300 text-xs leading-relaxed pt-0.5">
                          {step}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-slate-500 font-mono italic">No instruction steps found in registry records.</div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-2 border-t border-white/5 text-center">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className={`px-5 py-3 bg-gradient-to-r ${isCyan ? 'from-neon-cyan to-neon-cyan/80' : 'from-neon-green to-neon-green/80'} text-black font-semibold rounded-xl text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer w-full`}
                >
                  Close Blueprint Terminal
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default IdeaCard;
