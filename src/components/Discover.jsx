import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { motion as motionFramer } from "framer-motion";
import { Search, Heart, Download, Sparkles, SlidersHorizontal, User, Cpu } from "lucide-react";

const COMMUNITY_PROJECTS = [
  {
    id: 1,
    title: "Solar Luminary Chandelier",
    category: "Lighting",
    creator: "@EcologyArtist",
    likes: 420,
    downloads: 12,
    image: "/waste_chandelier.png",
    description: "Suspended chandelier crafted from emerald glass bottles and solar filament LEDs.",
    accent: "cyan"
  },
  {
    id: 2,
    title: "Stave & Maple Lounge Chair",
    category: "Furniture",
    creator: "@MapleCrafter",
    likes: 380,
    downloads: 9,
    image: "/skateboard_chair.png",
    description: "Cantilevered lounge chair using stained maple deck veneers and steel tubing.",
    accent: "green"
  },
  {
    id: 3,
    title: "Linear Induction Light",
    category: "Lighting",
    creator: "@CopperWelder",
    likes: 310,
    downloads: 15,
    image: "/copper_lamp.png",
    description: "Minimalist ceiling-hung tube light using polished copper piping.",
    accent: "cyan"
  },
  {
    id: 4,
    title: "Geometric Wall Mirror",
    category: "Furniture",
    creator: "@SkateArtisan",
    likes: 290,
    downloads: 6,
    image: "gradient-mirror", // Will render as neon CSS gradient
    description: "Circular mirror surrounded by a tessellated framework of colored skateboard wood.",
    accent: "cyan"
  },
  {
    id: 5,
    title: "Terrazzo Glass Vessel",
    category: "Tableware",
    creator: "@GlassBender",
    likes: 250,
    downloads: 8,
    image: "gradient-vessel", // Will render as neon CSS gradient
    description: "Serving bowl created from crushed olive glass bonded with bio-epoxy.",
    accent: "green"
  },
  {
    id: 6,
    title: "Espalier Plant Trellis",
    category: "Furniture",
    creator: "@GreenDesigner",
    likes: 180,
    downloads: 4,
    image: "gradient-trellis", // Will render as neon CSS gradient
    description: "Geometric wall trellis that holds climbing plants in copper pipe frames.",
    accent: "green"
  }
];

function Discover() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedProjects, setLikedProjects] = useState({});
  const [downloadingId, setDownloadingId] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const categories = ["All", "Lighting", "Furniture", "Tableware"];

  const handleLike = (id) => {
    setLikedProjects(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleDownload = (id) => {
    if (downloadingId !== null) return;
    setDownloadingId(id);
    setDownloadProgress(0);
    
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setDownloadingId(null), 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  const filteredProjects = COMMUNITY_PROJECTS.filter(project => {
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.creator.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <motionFramer.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-6xl mx-auto px-4 py-8 md:py-16 z-10 relative pointer-events-auto space-y-10"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <motionFramer.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] font-mono tracking-widest text-slate-400 uppercase"
        >
          <Sparkles className="w-3.5 h-3.5 text-neon-cyan animate-pulse" />
          Catalog Repository
        </motionFramer.div>
        <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white uppercase mt-3">
          Sourced Blueprints
        </h2>
        <p className="text-xs md:text-sm text-slate-500 font-light max-w-md mx-auto">
          Browse open-source digital manufacturing scripts uploaded by ecological engineers worldwide.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:max-w-md flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search catalog blueprints..."
            className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/5 hover:border-white/10 focus:border-neon-cyan/40 focus:outline-none focus:ring-1 focus:ring-neon-cyan/30 rounded-2xl text-xs font-mono text-slate-300 placeholder-slate-650 transition-all"
            aria-label="Search blueprint query"
          />
        </div>

        {/* Filters */}
        <div className="glassmorphism p-1 rounded-full flex gap-1 items-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-4 py-2 text-xs font-mono tracking-wider rounded-full transition-colors cursor-pointer focus:outline-none ${
                activeCategory === cat ? "text-black font-bold z-10" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motionFramer.span
                  layoutId="active-discover-tab"
                  className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-green rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

      </div>

      {/* Grid of Blueprints */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => {
            const isLiked = !!likedProjects[project.id];
            const isDownloading = downloadingId === project.id;
            const isCyan = project.accent === "cyan";

            return (
              <motionFramer.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={`glassmorphism ${
                  isCyan ? "glassmorphism-glow-cyan" : "glassmorphism-glow-green"
                } rounded-2xl border border-white/5 relative overflow-hidden flex flex-col justify-between group h-full`}
              >
                {/* Product Image section */}
                <div className="h-48 relative overflow-hidden bg-black/40 border-b border-white/5">
                  
                  {/* Category badge */}
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/70 border border-white/10 text-[9px] font-mono tracking-wider uppercase text-slate-300 z-10">
                    {project.category}
                  </span>

                  {/* Render Image or Gradient */}
                  {project.image.startsWith("/") ? (
                    <motionFramer.img
                      src={project.image}
                      alt={project.title}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 transition-all"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-tr ${
                      isCyan ? "from-neon-cyan/10 to-purple-500/10" : "from-neon-green/10 to-cyan-500/10"
                    } flex items-center justify-center relative`}>
                      <Cpu className="w-10 h-10 text-slate-700 group-hover:text-neon-cyan transition-colors duration-500" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)]" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-600" />
                        {project.creator}
                      </span>
                      <span className="tracking-wide uppercase">{project.accent === "cyan" ? "Cyan Module" : "Green Module"}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold font-display text-slate-200 tracking-tight group-hover:text-white transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-slate-400 text-xs font-light leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="h-[1px] bg-white/5 w-full" />

                  {/* Footer metadata & buttons */}
                  <div className="flex justify-between items-center">
                    
                    {/* Stats */}
                    <div className="flex gap-4 text-[10px] font-mono text-slate-500">
                      <button 
                        onClick={() => handleLike(project.id)}
                        className={`flex items-center gap-1 transition-colors cursor-pointer ${
                          isLiked ? "text-rose-500" : "hover:text-slate-300"
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-rose-500" : ""}`} />
                        {project.likes + (isLiked ? 1 : 0)}
                      </button>
                      
                      <span className="flex items-center gap-1">
                        <Download className="w-3.5 h-3.5 text-slate-600" />
                        {project.downloads + (isDownloading && downloadProgress === 100 ? 1 : 0)}
                      </span>
                    </div>

                    {/* Download Button */}
                    <motionFramer.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleDownload(project.id)}
                      disabled={isDownloading}
                      className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 rounded-xl text-[10px] font-mono text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      {isDownloading ? (
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full border border-slate-500 border-t-neon-cyan animate-spin" />
                          <span>{downloadProgress}%</span>
                        </div>
                      ) : (
                        <>
                          <Download className="w-3 h-3 text-neon-cyan" />
                          Blueprint
                        </>
                      )}
                    </motionFramer.button>
                  </div>
                </div>

              </motionFramer.div>
            );
          })}
        </AnimatePresence>
      </div>

    </motionFramer.div>
  );
}

export default Discover;
