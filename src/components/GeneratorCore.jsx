

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Camera, Search, Sparkles, RefreshCw, Trash2, X } from "lucide-react";

// Mock Database of luxury reuse ideas
const LUXURY_REUSE_DATABASE = {
  "wine bottles": [
    {
      item: "Wine Bottles",
      product: "Solar Luminary Chandelier",
      category: "Luxury Lighting",
      difficulty: "Intermediate",
      match: "98%",
      description: "A weightless suspended chandelier utilizing emerald glass bottles, brass frames, and solar filament LEDs.",
      materials: ["Green Bottles", "Brass Rings", "Solar Filament", "Tension Wires"],
      accentColor: "cyan",
      floatSpeed: 6
    },
    {
      item: "Wine Bottles",
      product: "Terrazzo Glass Vessel",
      category: "Tableware",
      difficulty: "Advanced",
      match: "94%",
      description: "Upscale serving bowl created from crushed olive glass bonded with bio-epoxy and diamond polished to a satin finish.",
      materials: ["Crushed Glass", "Bio-Epoxy Resin", "Silicone Mold", "Polishing Compound"],
      accentColor: "green",
      floatSpeed: 5
    },
    {
      item: "Wine Bottles",
      product: "Acoustic Wall Panels",
      category: "Architectural Decor",
      difficulty: "Beginner",
      match: "91%",
      description: "Sleek wall dividers that block sound waves, using melted glass rings arranged in an overlapping art deco style.",
      materials: ["Bottles", "Tile Cutter", "Kiln", "Wall Mount Brackets"],
      accentColor: "cyan",
      floatSpeed: 7
    }
  ],
  "old skateboard": [
    {
      item: "Old Skateboard",
      product: "Stave & Maple Lounge Chair",
      category: "Luxury Furniture",
      difficulty: "Advanced",
      match: "97%",
      description: "A cantilevered chair using stained canadian maple deck veneers layered with black powder-coated steel tubes.",
      materials: ["Decks", "Steel Tubing", "Hex Bolts", "Polyurethane Coating"],
      accentColor: "green",
      floatSpeed: 5.5
    },
    {
      item: "Old Skateboard",
      product: "Geometric Accent Mirror",
      category: "Home Accent",
      difficulty: "Intermediate",
      match: "93%",
      description: "A premium circular mirror surrounded by a tessellated framework of colored skateboard wood strips.",
      materials: ["Decks", "Circular Mirror", "Wood Glue", "Sanding Blocks"],
      accentColor: "cyan",
      floatSpeed: 6.5
    },
    {
      item: "Old Skateboard",
      product: "Acoustic Sound Dock",
      category: "Premium Audio",
      difficulty: "Intermediate",
      match: "89%",
      description: "A passive amplifier dock for mobile devices, crafted by layering decks to create a high-density sound funnel.",
      materials: ["Decks", "Router", "Danish Oil", "Felt Feet"],
      accentColor: "cyan",
      floatSpeed: 4.8
    }
  ],
  "copper pipes": [
    {
      item: "Copper Pipes",
      product: "Linear Induction Light",
      category: "Luxury Lighting",
      difficulty: "Intermediate",
      match: "99%",
      description: "A minimalist ceiling-hung tube light using polished copper piping with embedded cold-cathode LED bars.",
      materials: ["Copper Pipes", "LED Bars", "Tension Cables", "Polishing Cream"],
      accentColor: "cyan",
      floatSpeed: 5.8
    },
    {
      item: "Copper Pipes",
      product: "Modular Valet Rack",
      category: "Wardrobe Accessory",
      difficulty: "Beginner",
      match: "95%",
      description: "A structural valet stand featuring interlocking hand-burnished copper pipes and premium top-grain leather straps.",
      materials: ["Copper Pipes", "Leather Straps", "Pipe Connectors", "Solder"],
      accentColor: "green",
      floatSpeed: 6.2
    },
    {
      item: "Copper Pipes",
      product: "Minimalist Espalier Trellis",
      category: "Interior Gardening",
      difficulty: "Beginner",
      match: "92%",
      description: "A geometric wall trellis that holds climbing plants, creating a weightless green wall in modern penthouses.",
      materials: ["Copper Pipes", "Wall Anchors", "Brass Clips", "Plant Pots"],
      accentColor: "cyan",
      floatSpeed: 5
    }
  ],
  "plastic cups": [
    {
      item: "Plastic Cups",
      product: "Tessellated Polymer Acoustic Screen",
      category: "Architectural Decor",
      difficulty: "Intermediate",
      match: "96%",
      description: "A premium translucent partition wall created from heat-welded PET cup rims arranged in a stunning hexagonal structure.",
      materials: ["Plastic Cups", "Aluminum Frame", "Tension Bars", "Hot Air Gun"],
      accentColor: "cyan",
      floatSpeed: 6
    },
    {
      item: "Plastic Cups",
      product: "Molded Terrazzo Desktop Organizer",
      category: "Home Accent",
      difficulty: "Beginner",
      match: "93%",
      description: "Sleek, modular desktop organizer made by shredding polypropylene cups, melting them with colored pigments, and pressing them into geometric molds.",
      materials: ["Shredded Polymer", "Pigment Pastes", "Heat Press", "Silicone Mold"],
      accentColor: "green",
      floatSpeed: 5.2
    },
    {
      item: "Plastic Cups",
      product: "Aura Filament Pedestal Lamp",
      category: "Luxury Lighting",
      difficulty: "Advanced",
      match: "91%",
      description: "A warm-glowing modern pedestal lamp featuring a diffuser constructed from layered, crystal-clear upcycled polymer rings.",
      materials: ["PET Cups", "Acrylic Rod", "Warm LED Strip", "Solid Brass Base"],
      accentColor: "cyan",
      floatSpeed: 6.5
    }
  ]
};

const getFallbackIdeas = (item) => {
  const formatted = item.trim().charAt(0).toUpperCase() + item.trim().slice(1);
  return [
    {
      item: formatted,
      product: `Ethereal ${formatted} Canopy`,
      category: "Space Design",
      difficulty: "Advanced",
      match: "95%",
      description: `A floor-to-ceiling geometric installation crafted from high-precision cut ${item} fragments bound in an ultra-thin carbon fiber chassis.`,
      materials: [formatted, "Carbon Fiber Frame", "Epoxy Sealant", "Suspension Pins"],
      accentColor: "cyan",
      floatSpeed: 6
    },
    {
      item: formatted,
      product: `Aura ${formatted} Sconce`,
      category: "Luxury Lighting",
      difficulty: "Intermediate",
      match: "91%",
      description: `A floating, warm-glow wall sconce lighting installation utilizing structurally reinforced ${item} elements and a frosted brass collar.`,
      materials: [formatted, "Frosted Collar", "LED Strips", "Micro-Wired Suspension"],
      accentColor: "green",
      floatSpeed: 5.2
    },
    {
      item: formatted,
      product: `Neo-${formatted} Console Table`,
      category: "Luxury Furniture",
      difficulty: "Advanced",
      match: "88%",
      description: `A sleek, floating wall console table incorporating compressed, stabilized ${item} with raw brushed titanium supports.`,
      materials: [formatted, "Brushed Titanium", "Industrial Stabilizer", "Wall Anchors"],
      accentColor: "cyan",
      floatSpeed: 6.8
    }
  ];
};

function GeneratorCore({ onGenerate, token, user }) {
  const [inputValue, setInputValue] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0); // 0: Idle, 1: Reading, 2: Architecting, 3: Elevating
  const [isDragging, setIsDragging] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const suggestions = ["Wine Bottles", "Old Skateboard", "Copper Pipes", "Plastic Cups"];

  const handleGenerate = async (itemToGenerate) => {
    const query = itemToGenerate || inputValue;
    if (!query.trim()) return;

    setIsScanning(true);
    setScanStep(1);

    // Simulated multi-step AI design scan (makes it feel premium and complex)
    const scanSteps = [
      { text: "Deconstructing molecular composition...", time: 900 },
      { text: "Matching structural properties with design blueprint...", time: 1800 },
      { text: "Elevating waste item into luxury design concept...", time: 2700 }
    ];

    scanSteps.forEach((step, index) => {
      setTimeout(() => {
        setScanStep(index + 1);
      }, step.time);
    });

    // Run API request and the 3.2s animation delay concurrently
    const apiPromise = fetch("/api/generator/elevate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    }).then(res => {
      if (!res.ok) throw new Error("Elevation failed");
      return res.json();
    });

    const timerPromise = new Promise(resolve => setTimeout(resolve, 3200));

    try {
      const [results] = await Promise.all([apiPromise, timerPromise]);
      
      // If user is logged in, auto-save generated concepts to their database vault!
      if (token && user) {
        for (const concept of results) {
          fetch("/api/generator/save", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(concept)
          }).catch(err => console.warn("Auto-save concept failed:", err));
        }
      }

      onGenerate(results, query);
    } catch (err) {
      console.warn("Generator backend elevation failed, falling back to local registry data:", err);
      // Fallback local logic in case server is down
      const normalizedKey = query.toLowerCase().trim();
      let results = LUXURY_REUSE_DATABASE[normalizedKey];
      if (!results) {
        const foundKey = Object.keys(LUXURY_REUSE_DATABASE).find(k => normalizedKey.includes(k) || k.includes(normalizedKey));
        results = foundKey ? LUXURY_REUSE_DATABASE[foundKey] : getFallbackIdeas(query);
      }
      onGenerate(results, query);
    } finally {
      setIsScanning(false);
      setScanStep(0);
    }
  };

  const startCamera = async (e) => {
    e.stopPropagation();
    setIsCameraActive(true);
    setPreviewImage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access failed", err);
      setIsCameraActive(false);
    }
  };

  const capturePhoto = (e) => {
    e.stopPropagation();
    if (!videoRef.current || !streamRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    const dataUrl = canvas.toDataURL("image/png");
    setPreviewImage(dataUrl);
    stopCamera();

    const mockItem = "Scanned Material";
    setInputValue(mockItem);
    handleGenerate(mockItem);
  };

  const stopCamera = (e) => {
    if (e) e.stopPropagation();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
        const name = file.name.split(".")[0].replace(/[-_]/g, " ");
        setInputValue(name);
        handleGenerate(name);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearPreview = (e) => {
    e.stopPropagation();
    setPreviewImage(null);
    setInputValue("");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
        const name = file.name.split(".")[0].replace(/[-_]/g, " ");
        setInputValue(name);
        handleGenerate(name);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 z-10 relative pointer-events-auto">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileSelect} 
        accept="image/*" 
        className="hidden" 
      />

      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="glassmorphism glassmorphism-glow-cyan p-8 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden backdrop-blur-xl"
      >
        {/* Glow behind the input */}
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-neon-cyan/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-neon-green/5 blur-3xl pointer-events-none" />

        <AnimatePresence mode="wait">
          {!isScanning ? (
            <motion.div
              key="generator-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Input Area */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 justify-center mb-1">
                  <Sparkles className="w-5 h-5 text-neon-cyan animate-pulse" />
                  <h3 className="font-display font-medium text-lg text-slate-300 uppercase tracking-widest">
                    Input Control Module
                  </h3>
                </div>
                
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-slate-500">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter everyday waste (e.g. Wine Bottles, Old Skateboard, Tires)..."
                    className="w-full pl-12 pr-32 py-4.5 bg-black/40 border border-white/10 rounded-2xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-neon-cyan/40 focus:ring-1 focus:ring-neon-cyan/30 transition-all font-light text-base tracking-wide"
                    onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleGenerate()}
                    className="absolute right-2 px-5 py-2.5 bg-gradient-to-r from-neon-cyan to-neon-cyan/80 hover:from-neon-cyan hover:to-violet-400 text-black font-semibold rounded-xl text-sm transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.3)] cursor-pointer"
                  >
                    Elevate
                  </motion.button>
                </div>
              </div>

              {/* Suggestions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
                <span className="text-slate-500 font-mono text-xs uppercase tracking-wider">Suggested Feedstock:</span>
                <div className="flex flex-wrap gap-2 justify-center">
                  {suggestions.map((item) => (
                    <motion.button
                      key={item}
                      whileHover={{ scale: 1.05, borderColor: "rgba(139, 92, 246, 0.4)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setPreviewImage(null);
                        setInputValue(item);
                        handleGenerate(item);
                      }}
                      className="px-3.5 py-1.5 bg-white/5 border border-white/5 rounded-full text-slate-300 hover:text-white text-xs font-mono transition-all cursor-pointer"
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-white/5"></div>
                <span className="flex-shrink mx-4 text-xs font-mono uppercase tracking-widest text-slate-500">OR</span>
                <div className="flex-grow border-t border-white/5"></div>
              </div>

              {/* Upload / Camera Dropzone */}
              <div className="space-y-4">
                {isCameraActive ? (
                  /* Active Web RTC Webcam Feed */
                  <div className="border border-white/10 rounded-2xl p-4 bg-black/40 flex flex-col items-center justify-center space-y-4 h-64 relative overflow-hidden">
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      className="w-full h-full object-cover rounded-xl"
                    />
                    
                    <div className="absolute bottom-4 flex gap-3 z-10">
                      <button 
                        type="button"
                        onClick={capturePhoto} 
                        className="px-4 py-2 bg-gradient-to-r from-neon-cyan to-neon-green text-black font-semibold font-mono text-xs rounded-xl shadow-lg cursor-pointer flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Deconstruct Frame
                      </button>
                      <button 
                        type="button"
                        onClick={stopCamera} 
                        className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 font-semibold font-mono text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <X className="w-3.5 h-3.5" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : previewImage ? (
                  /* Feedstock Image Preview (Captured/Dropped) */
                  <div className="border border-white/10 rounded-2xl p-4 bg-black/40 flex items-center justify-center h-64 relative group overflow-hidden">
                    <img 
                      src={previewImage} 
                      alt="Scanned feedstock preview" 
                      className="max-h-full max-w-full object-contain rounded-xl filter brightness-95"
                    />
                    
                    <button 
                      type="button"
                      onClick={clearPreview} 
                      className="absolute top-4 right-4 p-2 bg-black/70 border border-white/10 hover:border-neon-cyan/40 text-slate-400 hover:text-white rounded-full transition-all cursor-pointer z-10"
                      aria-label="Remove feedstock image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="absolute bottom-4 px-4 py-1.5 bg-black/80 border border-white/5 rounded-full text-[10px] font-mono tracking-widest text-neon-cyan uppercase">
                      Feedstock Cached
                    </div>
                  </div>
                ) : (
                  /* Empty state: Drop zone trigger */
                  <motion.div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current.click()}
                    whileHover={{ scale: 1.01 }}
                    className={`border border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                      isDragging 
                        ? "border-neon-cyan bg-neon-cyan/5" 
                        : "border-white/10 hover:border-white/20 bg-white/[0.01] hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="p-4 rounded-full bg-white/5 mb-4 group-hover:bg-white/10 transition-colors">
                      <Upload className="w-6 h-6 text-slate-400" />
                    </div>
                    <p className="text-slate-300 text-sm font-medium">
                      Drag & Drop a Photo of Your Feedstock
                    </p>
                    <p className="text-slate-500 text-xs mt-1.5 font-light">
                      Or click here to browse device file folders
                    </p>
                    
                    <div className="mt-5 flex gap-3">
                      <button 
                        type="button"
                        onClick={startCamera}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-slate-300 hover:text-white transition-all font-mono cursor-pointer"
                      >
                        <Camera className="w-3.5 h-3.5 text-neon-cyan" />
                        Activate Camera
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="generator-scanning"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="py-12 flex flex-col items-center justify-center space-y-6"
            >
              {/* Pulsing Scan Ring */}
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  className="w-28 h-28 rounded-full border-2 border-transparent border-t-neon-cyan border-b-neon-green/40 p-1"
                >
                  <div className="w-full h-full rounded-full border border-dashed border-white/10" />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <RefreshCw className="w-8 h-8 text-neon-cyan animate-spin duration-[4000ms]" />
                </div>
              </div>

              {/* Progress status */}
              <div className="space-y-2 text-center max-w-sm">
                <span className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
                  Smart Reuse Design Engine Active
                </span>
                
                <div className="h-6 overflow-hidden relative">
                  <AnimatePresence mode="popLayout">
                    <motion.p
                      key={scanStep}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-slate-300 font-light text-sm tracking-wide"
                    >
                      {scanStep === 1 && "Analyzing feedstock molecular density..."}
                      {scanStep === 2 && "Sourcing luxury blueprints & elements..."}
                      {scanStep === 3 && "Running anti-gravitational structural calculations..."}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Progress bar loader */}
                <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden mx-auto mt-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.2, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-neon-cyan to-neon-green"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default GeneratorCore;
