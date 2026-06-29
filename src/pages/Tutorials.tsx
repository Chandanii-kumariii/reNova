import { useState } from 'react';
import { MOCK_PROJECTS } from '../data/mockProjects';
import type { ProjectIdea } from '../data/mockProjects';
import { Search, Filter, BookOpen, Clock, DollarSign, X, Check, Eye } from 'lucide-react';



const CATEGORIES = ['All', 'Plastic', 'Glass', 'Paper/Cardboard', 'Fabric', 'Metal', 'Organic'];

export const Tutorials: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTutorial, setSelectedTutorial] = useState<ProjectIdea | null>(null);

  // Filter logic
  const filteredTutorials = MOCK_PROJECTS.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyStyles = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950/20 border border-green-200/50 dark:border-green-900/30';
      case 'Medium':
        return 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30';
      case 'Hard':
        return 'text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/30';
      default:
        return 'text-slate-600 bg-slate-50 dark:text-slate-400 dark:bg-slate-950/20';
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* HEADER */}
      <div className="max-w-2xl mx-auto text-center space-y-3">
        <div className="inline-flex p-3 rounded-2xl bg-eco-green-500/10 text-eco-green-600 dark:text-eco-green-400">
          <BookOpen className="w-8 h-8 animate-float-medium" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
          DIY Upcycling Tutorials
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Discover a curated library of eco-friendly tutorials. Filter by material type, search for specific products, and learn how to construct useful items step-by-step.
        </p>
      </div>

      {/* SEARCH & FILTERS PANEL */}
      <div className="glass-panel p-5 rounded-3xl border border-white/20 dark:border-slate-800/40 shadow-md space-y-4 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search bar */}
          <div className="flex-1 relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search tutorials by name, material, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 focus:border-eco-green-500 focus:outline-none focus:ring-2 focus:ring-eco-green-500/10 rounded-2xl py-3 pl-12 pr-4 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Icon indicator for filters */}
          <div className="hidden md:flex items-center gap-2 px-4 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-500 text-xs font-semibold">
            <Filter className="w-4 h-4 text-eco-green-600" />
            <span>Filters</span>
          </div>
        </div>

        {/* Categories Scroller */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${
                selectedCategory === cat
                  ? 'bg-eco-green-600 border-eco-green-600 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-50 dark:bg-slate-900/50 dark:hover:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-350'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* TUTORIALS GRID */}
      <div className="animate-fadeIn">
        {filteredTutorials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map((tut) => (
              <div
                key={tut.id}
                className="glass-card flex flex-col justify-between rounded-2xl p-6 border border-white/20 dark:border-slate-800/40 relative group overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-4.5">
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                      {tut.category}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${getDifficultyStyles(tut.difficulty)}`}>
                      {tut.difficulty}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2 group-hover:text-eco-green-600 dark:group-hover:text-eco-green-400 transition-colors">
                    {tut.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-5 leading-relaxed line-clamp-3">
                    {tut.description}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-5">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-eco-green-600" />
                      <span>{tut.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-eco-blue-600" />
                      <span>{tut.cost}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedTutorial(tut)}
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-eco-green-600 hover:dark:bg-eco-green-600 hover:text-white hover:dark:text-white text-slate-700 dark:text-slate-300 text-xs font-bold py-2.5 px-4 rounded-xl transition-all border border-slate-200 dark:border-slate-700 hover:border-transparent"
                  >
                    <span>Read Tutorial</span>
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-slate-400">
            No tutorials match your search terms or category selection.
          </div>
        )}
      </div>

      {/* TUTORIAL STEP-BY-STEP MODAL */}
      {selectedTutorial && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-slate-200 dark:border-slate-800 animate-scaleUp">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start">
              <div>
                <span className="text-xs bg-eco-green-100 dark:bg-eco-green-950/40 text-eco-green-700 dark:text-eco-green-400 font-semibold px-2.5 py-1 rounded-md">
                  {selectedTutorial.difficulty} • {selectedTutorial.category}
                </span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                  {selectedTutorial.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedTutorial(null)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/30 border border-slate-100 dark:border-slate-800/40 text-center text-xs">
                <div>
                  <span className="text-slate-400">Difficulty</span>
                  <p className="font-bold text-slate-850 dark:text-slate-200 mt-0.5">{selectedTutorial.difficulty}</p>
                </div>
                <div>
                  <span className="text-slate-400">Estimated Cost</span>
                  <p className="font-bold text-slate-850 dark:text-slate-200 mt-0.5">{selectedTutorial.cost}</p>
                </div>
                <div>
                  <span className="text-slate-400">Duration</span>
                  <p className="font-bold text-slate-850 dark:text-slate-200 mt-0.5">{selectedTutorial.time}</p>
                </div>
              </div>

              {/* Eco Impact */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/15 border border-emerald-100/60 dark:border-emerald-900/30 space-y-1">
                <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wide">
                  Eco Benefit
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
                  {selectedTutorial.ecoImpact}
                </p>
              </div>

              {/* Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-2.5">
                  <h4 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider">Materials</h4>
                  <ul className="space-y-1.5">
                    {selectedTutorial.materialsNeeded.map((mat, idx) => (
                      <li key={idx} className="text-slate-600 dark:text-slate-400 flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-eco-green-500 mt-0.5 flex-shrink-0" />
                        <span>{mat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2.5">
                  <h4 className="font-bold text-slate-800 dark:text-white uppercase tracking-wider">Tools</h4>
                  <ul className="space-y-1.5">
                    {selectedTutorial.toolsNeeded.map((tool, idx) => (
                      <li key={idx} className="text-slate-600 dark:text-slate-400 flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-eco-blue-500 mt-0.5 flex-shrink-0" />
                        <span>{tool}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">Steps</h4>
                <div className="space-y-3">
                  {selectedTutorial.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-950/25 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800/40">
                      <div className="w-6.5 h-6.5 rounded-full bg-eco-green-100 dark:bg-eco-green-950/50 text-eco-green-700 dark:text-eco-green-400 flex items-center justify-center text-xs font-black flex-shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end">
              <button
                onClick={() => setSelectedTutorial(null)}
                className="bg-eco-green-600 hover:bg-eco-green-700 dark:bg-eco-green-600 dark:hover:bg-eco-green-500 text-white text-xs font-bold py-2.5 px-6 rounded-xl transition-colors"
              >
                Close Tutorial
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
