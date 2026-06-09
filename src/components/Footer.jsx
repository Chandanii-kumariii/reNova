import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Mail, Sparkles, Layers } from "lucide-react";

function Footer() {
  const [hoveredQuickIndex, setHoveredQuickIndex] = useState(null);
  const [hoveredEcIndex, setHoveredEcIndex] = useState(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const quickLinks = [
    { label: "Discover", href: "#discover" },
    { label: "Deconstruct", href: "#deconstruct" },
    { label: "Blueprints", href: "#about" },
    { label: "Vault", href: "#vault" }
  ];

  const ecoResources = [
    { label: "Ecology Lab", href: "#ecology" },
    { label: "Open Blueprints", href: "#blueprints" },
    { label: "Material DB", href: "#db" },
    { label: "Impact Metrics", href: "#metrics" }
  ];

  // Generate random particles that float up and fade out in the background
  const spaceParticles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 5,
      size: 1.5 + Math.random() * 3,
      color: Math.random() > 0.5 ? "rgba(139, 92, 246, 0.35)" : "rgba(236, 72, 153, 0.25)" // Violet or Pink
    }));
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() })
      });
      if (response.ok) {
        setSubscribed(true);
        setTimeout(() => {
          setEmail("");
        }, 2000);
      }
    } catch (err) {
      console.error("Newsletter subscription failed:", err);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="relative mt-32 bg-[#0B0B0F] text-slate-400 font-sans border-t border-transparent z-10 pointer-events-auto overflow-hidden">
      {/* 20% Opacity Neon Border Gradient */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-neon-cyan via-purple-500 to-neon-green opacity-20" />

      {/* Floating Disintegrating Space Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {spaceParticles.map((p) => (
          <motion.span
            key={p.id}
            style={{
              position: "absolute",
              left: p.left,
              bottom: "-10px",
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: p.color,
              boxShadow: `0 0 10px ${p.color}`,
            }}
            animate={{
              y: [0, -320],
              opacity: [0, 0.75, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Grid Content */}
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-12 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 relative z-10">
        
        {/* Column 1: Brand / Logo */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 border border-white/10 overflow-hidden">
              <span className="text-neon-cyan font-display font-black text-xs">SR</span>
            </div>
            <h4 className="font-display font-bold text-sm tracking-wider uppercase text-slate-100 leading-none">
              Smart Reuse
            </h4>
          </div>
          <p className="text-xs text-slate-500 font-light leading-relaxed max-w-sm">
            Evolving physical scrap and feedstock into luxury design assets. Built on anti-gravitational spatial layouts and open blueprints.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="font-mono text-xs uppercase tracking-widest text-slate-300 font-semibold">
            Navigation
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs font-mono">
            {quickLinks.map((link, idx) => (
              <li key={idx} className="relative">
                <a
                  href={link.href}
                  onMouseEnter={() => setHoveredQuickIndex(idx)}
                  onMouseLeave={() => setHoveredQuickIndex(null)}
                  className="inline-block py-0.5 hover:text-slate-100 transition-colors"
                >
                  {link.label}
                  {hoveredQuickIndex === idx && (
                    <motion.span
                      layoutId="footer-quick-underline"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neon-cyan"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Sustainability Resources */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="font-mono text-xs uppercase tracking-widest text-slate-300 font-semibold">
            Ecology
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs font-mono">
            {ecoResources.map((link, idx) => (
              <li key={idx} className="relative">
                <a
                  href={link.href}
                  onMouseEnter={() => setHoveredEcIndex(idx)}
                  onMouseLeave={() => setHoveredEcIndex(null)}
                  className="inline-block py-0.5 hover:text-slate-100 transition-colors"
                >
                  {link.label}
                  {hoveredEcIndex === idx && (
                    <motion.span
                      layoutId="footer-eco-underline"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neon-green"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Newsletter Signup */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="font-mono text-xs uppercase tracking-widest text-slate-300 font-semibold">
            Telemetry Feed
          </h4>
          <p className="text-xs text-slate-500 font-light leading-relaxed">
            Receive monthly catalog releases, material scanning blueprints, and carbon offset reports.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
            <div className="relative flex items-center">
              <Mail className="absolute left-3 w-4 h-4 text-slate-600" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Submit communications portal..."
                disabled={subscribed}
                className="w-full pl-9 pr-24 py-2 bg-black/40 border border-white/5 hover:border-white/10 focus:border-neon-cyan/40 focus:outline-none focus:ring-1 focus:ring-neon-cyan/30 rounded-xl text-xs font-mono text-slate-300 placeholder-slate-600 transition-all"
                aria-label="Newsletter email address input"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={subscribed}
                className="absolute right-1 px-3 py-1 bg-white/5 border border-white/10 hover:bg-white/10 text-[10px] text-slate-300 font-mono rounded-lg transition-colors cursor-pointer"
              >
                {subscribed ? "Syncing..." : "Connect"}
              </motion.button>
            </div>
            
            <AnimatePresence>
              {subscribed && (
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] font-mono text-neon-green block"
                >
                  ✓ Feed synchronization complete.
                </motion.span>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>

      {/* Prominent Micro-Copy & Social Section */}
      <div className="max-w-6xl mx-auto px-6 py-12 border-t border-white/5 flex flex-col items-center justify-center text-center space-y-8 relative z-10">
        
        {/* Inspiring Slogan */}
        <div className="space-y-2">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black font-display tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-400 to-slate-600 uppercase"
          >
            Let's leave nothing behind.
          </motion.h3>
          <p className="text-[10px] font-mono tracking-widest text-neon-cyan uppercase">
            Closed-loop physical carbon capture blueprinting
          </p>
        </div>

        {/* Social Icons with Glassmorphic Lift & Neon Glow */}
        <div className="flex gap-4">
          {/* GitHub */}
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
            whileHover={{ 
              y: -5,
              borderColor: "rgba(139, 92, 246, 0.4)",
              boxShadow: "0 0 15px rgba(139, 92, 246, 0.4)"
            }}
            className="h-10 w-10 rounded-xl glassmorphism border border-white/10 flex items-center justify-center text-slate-400 hover:text-neon-cyan transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </motion.a>

          {/* Twitter / X */}
          <motion.a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter Feed"
            whileHover={{ 
              y: -5,
              borderColor: "rgba(139, 92, 246, 0.4)",
              boxShadow: "0 0 15px rgba(139, 92, 246, 0.4)"
            }}
            className="h-10 w-10 rounded-xl glassmorphism border border-white/10 flex items-center justify-center text-slate-400 hover:text-neon-cyan transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </motion.a>

          {/* Instagram */}
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Profile"
            whileHover={{ 
              y: -5,
              borderColor: "rgba(139, 92, 246, 0.4)",
              boxShadow: "0 0 15px rgba(139, 92, 246, 0.4)"
            }}
            className="h-10 w-10 rounded-xl glassmorphism border border-white/10 flex items-center justify-center text-slate-400 hover:text-neon-cyan transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </motion.a>
        </div>
      </div>

      {/* Sub-Footer Copyright & Info */}
      <div className="max-w-6xl mx-auto px-6 py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono tracking-wider text-slate-600 uppercase relative z-10">
        <span>© 2026 Smart Reuse Labs. All blueprints open-source.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-400 transition-colors">Protocol Specs</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Safety Logs</a>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        animate={{
          y: [0, -6, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut"
        }}
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 20px rgba(139, 92, 246, 0.35)",
          borderColor: "rgba(139, 92, 246, 0.5)"
        }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-50 h-10 w-10 flex items-center justify-center rounded-full glassmorphism border border-white/10 text-slate-300 hover:text-neon-cyan shadow-xl cursor-pointer"
        aria-label="Back to Top"
      >
        <ArrowUp className="w-4 h-4" />
      </motion.button>
    </footer>
  );
}

export default Footer;
