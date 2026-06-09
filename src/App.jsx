import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import GeneratorCore from "./components/GeneratorCore";
import IdeaCard from "./components/IdeaCard";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Upgrade from "./components/Upgrade";
import Discover from "./components/Discover";
import Vault from "./components/Vault";
import { Sparkles, Layers } from "lucide-react";

const DEFAULT_IDEAS = [
  {
    item: "Wine Bottles",
    product: "Solar Luminary Chandelier",
    category: "Luxury Lighting",
    difficulty: "Intermediate",
    match: "98%",
    description: "A weightless suspended chandelier utilizing emerald glass bottles, brass frames, and solar filament LEDs.",
    materials: ["Green Bottles", "Brass Rings", "Solar Filament", "Tension Wires"],
    steps: [
      "Collect 6 empty emerald green glass bottles and wash off all labels.",
      "Construct a circular brass framework ring to space out the bottles.",
      "Mount solar LED light caps inside each bottle opening.",
      "Suspend the framework with tension wire hanging mounts.",
      "Position in a sunny location to charge and test illumination."
    ],
    accentColor: "cyan",
    floatSpeed: 6
  },
  {
    item: "Old Skateboard",
    product: "Stave & Maple Lounge Chair",
    category: "Luxury Furniture",
    difficulty: "Advanced",
    match: "97%",
    description: "A cantilevered chair using stained canadian maple deck veneers layered with black powder-coated steel tubes.",
    materials: ["Decks", "Steel Tubing", "Hex Bolts", "Polyurethane Coating"],
    steps: [
      "Acquire 4 worn maple skateboard decks and strip off any remaining griptape.",
      "Construct a structural chassis out of black powder-coated steel tubes.",
      "Cut and contour the maple decks to form matching seat and backrest staves.",
      "Drill mounting points and bolt the wood staves onto the steel tubing.",
      "Apply two coats of clear polyurethane protective wood finish."
    ],
    accentColor: "green",
    floatSpeed: 5
  },
  {
    item: "Copper Pipes",
    product: "Linear Induction Light",
    category: "Luxury Lighting",
    difficulty: "Intermediate",
    match: "99%",
    description: "A minimalist ceiling-hung tube light using polished copper piping with embedded cold-cathode LED bars.",
    materials: ["Copper Pipes", "LED Bars", "Tension Cables", "Polishing Cream"],
    steps: [
      "Cut a 4-foot section of 1-inch industrial copper pipe.",
      "Polish the outer pipe surface with copper polish to a mirror-like shine.",
      "Embed a high-output cold-cathode LED bar inside the copper tube channel.",
      "Route micro-wiring out through the suspension tension wire cables.",
      "Hang from ceiling mounts and connect to low voltage drivers."
    ],
    accentColor: "cyan",
    floatSpeed: 7
  }
];

function App() {
  const [view, setView] = useState("home"); // "home" | "login" | "signup" | "earnings"
  const [ideas, setIdeas] = useState(DEFAULT_IDEAS);
  const [scannedItem, setScannedItem] = useState("Selected Materials");
  const [generationKey, setGenerationKey] = useState(0); // Used to trigger card re-mount animations
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      // Auto-validate session status
      fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          if (!res.ok) throw new Error("Expired or invalid session token.");
          return res.json();
        })
        .then(data => {
          setUser(data.user);
        })
        .catch(err => {
          console.warn("Auto-login failed:", err.message);
          handleLogout();
        });
    }
  }, [token]);

  const handleLogin = (userData, userToken) => {
    localStorage.setItem("token", userToken);
    setToken(userToken);
    setUser(userData);
    setView("home");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setView("home");
  };

  const handleIdeasGenerated = (newIdeas, queryItem) => {
    setIdeas(newIdeas);
    setScannedItem(queryItem);
    setGenerationKey(prev => prev + 1); // Trigger complete re-animation of cards
  };

  return (
    <div className="relative min-h-screen pb-24 text-slate-100 selection:bg-neon-cyan/30 selection:text-white pointer-events-none">
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-bg-space bg-glow-mesh pointer-events-none" />

      {/* Decorative floating grids/stars */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]" />

      {/* Floating Header */}
      <Navbar setView={setView} currentView={view} user={user} onLogout={handleLogout} />

      {/* Main Views Router */}
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <AnimatePresence mode="wait">
          {view === "home" && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-16"
            >
              {/* Hero Section */}
              <div id="hero">
                <Hero />
              </div>

              {/* Generator Control Module */}
              <div id="generator" className="scroll-mt-32">
                <GeneratorCore onGenerate={handleIdeasGenerated} token={token} user={user} />
              </div>

              {/* Results Showcase */}
              <section className="space-y-10 pt-8">
                <div className="text-center space-y-2">
                  <motion.div
                    key={`label-${generationKey}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest text-neon-cyan uppercase"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    Manifested Concepts
                  </motion.div>
                  <motion.h2
                    key={`title-${generationKey}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-3xl font-bold font-display tracking-tight text-slate-200 capitalize"
                  >
                    Exhibiting: <span className="text-white font-extrabold">{scannedItem}</span>
                  </motion.h2>
                  <p className="text-slate-500 text-xs font-light tracking-wide max-w-md mx-auto">
                    Custom designs calculated using physical structural parameters and zero-waste blueprints.
                  </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                  <AnimatePresence mode="popLayout">
                    {ideas.map((idea, index) => (
                      <IdeaCard
                        key={`${generationKey}-${index}`}
                        item={idea.item}
                        product={idea.product}
                        category={idea.category}
                        difficulty={idea.difficulty}
                        match={idea.match}
                        description={idea.description}
                        materials={idea.materials}
                        steps={idea.steps}
                        accentColor={idea.accentColor}
                        delay={index * 0.15} // Staggered entrance
                        floatSpeed={idea.floatSpeed || (6 + index)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </section>
            </motion.div>
          )}

          {view === "login" && (
            <Login key="login-view" setView={setView} onLogin={handleLogin} />
          )}

          {view === "signup" && (
            <Signup key="signup-view" setView={setView} onSignup={handleLogin} />
          )}

          {view === "upgrade" && (
            <Upgrade key="upgrade-view" setView={setView} />
          )}

          {view === "discover" && (
            <Discover key="discover-view" />
          )}

          {view === "vault" && (
            <Vault key="vault-view" token={token} />
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

