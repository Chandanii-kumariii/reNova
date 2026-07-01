import React, { useState, useEffect, useRef } from 'react';
import { MOCK_PROJECTS } from '../data/mockProjects';
import type { ProjectIdea } from '../data/mockProjects';
import { ReuseCard } from '../components/ReuseCard';
import { Search, Sparkles, AlertCircle, X, ChevronRight, Check, Compass, Printer } from 'lucide-react';

interface IdeaGeneratorProps {
  savedIdeaIds: string[];
  completedIdeaIds: string[];
  onSaveToggle: (id: string) => void;
  onCompleteToggle: (id: string) => void;
  onShare: (idea: ProjectIdea) => void;
  showNotification: (msg: string, type: 'success' | 'info') => void;
}

const COMMON_ITEMS = [
  'Plastic Bottle',
  'Glass Jar',
  'Cardboard Box',
  'Old T-Shirt',
  'Coffee Grounds',
  'Tire',
  'Tin Can',
  'Orange Peels'
];

const AI_QUOTES = [
  'Analyzing atomic molecular structure...',
  'Extracting upcycling structural load limits...',
  'Scanning global DIY creative databases...',
  'Optimizing carbon reduction ratios...',
  'Calculating aesthetic feasibility score...',
  'Generating step-by-step eco blueprint...'
];

export const IdeaGenerator: React.FC<IdeaGeneratorProps> = ({
  savedIdeaIds,
  completedIdeaIds,
  onSaveToggle,
  onCompleteToggle,
  onShare,
  showNotification
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingQuote, setLoadingQuote] = useState(AI_QUOTES[0]);
  const [results, setResults] = useState<ProjectIdea[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectIdea | null>(null);

  const suggestionRef = useRef<HTMLDivElement>(null);

  // Auto-close suggestions on clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cycling loading quotes
  useEffect(() => {
    let quoteInterval: ReturnType<typeof setInterval>;
    if (isLoading) {
      let idx = 0;
      quoteInterval = setInterval(() => {
        idx = (idx + 1) % AI_QUOTES.length;
        setLoadingQuote(AI_QUOTES[idx]);
      }, 500);
    }
    return () => clearInterval(quoteInterval);
  }, [isLoading]);

  const handleSearchSubmit = (item: string) => {
    if (!item.trim()) return;

    setShowSuggestions(false);
    setIsLoading(true);
    setHasSearched(true);
    setInputValue(item);

    // Simulate AI processing delay
    setTimeout(() => {
      const matchQuery = item.toLowerCase();
      // Search projects matching category or material name
      const filtered = MOCK_PROJECTS.filter(
        p => p.material.toLowerCase().includes(matchQuery) ||
             p.category.toLowerCase().includes(matchQuery) ||
             matchQuery.includes(p.material.toLowerCase())
      );
      
      setResults(filtered);
      setIsLoading(false);
      showNotification(`AI successfully matched ${filtered.length} projects for "${item}"!`, 'success');
    }, 1800);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSearchSubmit(suggestion);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* HEADER */}
      <div className="max-w-2xl mx-auto text-center space-y-3">
        <div className="inline-flex p-3 rounded-2xl bg-eco-green-500/10 text-eco-green-600 dark:text-eco-green-400">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
          ReNova AI Generator
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Enter any waste material lying around your house, and our custom eco-model will generate creative, step-by-step DIY project blueprints to reuse it.
        </p>
      </div>

      {/* INPUT FIELD CONTAINER */}
      <div className="max-w-xl mx-auto relative" ref={suggestionRef}>
        <div className="flex gap-2.5 p-2 rounded-2xl glass-panel border border-white/20 dark:border-slate-800/40 shadow-lg">
          <div className="flex-1 relative flex items-center pl-3">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="e.g., Plastic Bottle, Glass Jar, Old T-Shirt..."
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearchSubmit(inputValue);
              }}
              className="w-full bg-transparent border-none text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none pl-3 text-base"
            />
            {inputValue && (
              <button
                onClick={() => setInputValue('')}
                className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => handleSearchSubmit(inputValue)}
            className="glass-button inline-flex items-center gap-1.5 bg-gradient-to-r from-eco-green-600 to-eco-green-700 hover:from-eco-green-500 hover:to-eco-green-600 text-white font-semibold py-3 px-4 sm:px-6 rounded-xl shadow-md"
          >
            <span className="hidden sm:inline">Analyze</span>
            <Sparkles className="w-4 h-4" />
          </button>

        </div>

        {/* AUTOCOMPLETE SUGGESTIONS */}
        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-30 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
            <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-950/20">
              Popular Waste Items
            </div>
            {COMMON_ITEMS.filter((item) =>
              item.toLowerCase().includes(inputValue.toLowerCase())
            ).map((item) => (
              <button
                key={item}
                onClick={() => handleSuggestionClick(item)}
                className="w-full px-4 py-3 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-eco-green-50 dark:hover:bg-eco-green-950/20 transition-colors flex items-center justify-between group"
              >
                <span>{item}</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
            {COMMON_ITEMS.filter((item) =>
              item.toLowerCase().includes(inputValue.toLowerCase())
            ).length === 0 && (
              <div className="px-4 py-3 text-xs text-slate-500 italic">
                Press Enter to scan "{inputValue}" anyway
              </div>
            )}
          </div>
        )}
      </div>

      {/* MOCK-AI PROCESSING LOADER */}
      {isLoading && (
        <div className="max-w-md mx-auto text-center py-12 space-y-6">
          <div className="relative inline-flex items-center justify-center">
            {/* Pulsing ring */}
            <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-eco-green-500/20 dark:border-eco-green-400/20 animate-ping" />
            {/* Spinning icon */}
            <div className="w-20 h-20 rounded-full border-4 border-t-eco-green-600 border-r-transparent border-b-eco-blue-600 border-l-transparent animate-spin flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-eco-green-600 dark:text-eco-green-400 animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-slate-800 dark:text-slate-200">Generating ReuseBlueprints...</h3>
            <p className="text-xs text-eco-blue-600 dark:text-eco-blue-400 font-mono tracking-wide h-4">
              {loadingQuote}
            </p>
          </div>
        </div>
      )}

      {/* RESULTS DISPLAY */}
      {!isLoading && hasSearched && (
        <div className="space-y-8 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/50 pb-4">
            <h2 className="text-xl font-extrabold text-slate-800 dark:text-white">
              AI Suggestions for "{inputValue}"
            </h2>
            <span className="text-xs bg-eco-blue-100 dark:bg-eco-blue-950/40 text-eco-blue-700 dark:text-eco-blue-400 px-3 py-1 rounded-full font-semibold border border-eco-blue-200/40">
              {results.length} Ideas Found
            </span>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((idea) => (
                <ReuseCard
                  key={idea.id}
                  idea={idea}
                  isSaved={savedIdeaIds.includes(idea.id)}
                  isCompleted={completedIdeaIds.includes(idea.id)}
                  onSaveToggle={() => onSaveToggle(idea.id)}
                  onCompleteToggle={() => onCompleteToggle(idea.id)}
                  onShare={() => onShare(idea)}
                  onViewDetails={() => setSelectedProject(idea)}
                />
              ))}
            </div>
          ) : (
            <div className="glass-panel rounded-2xl p-12 text-center max-w-lg mx-auto space-y-4 border border-rose-100 dark:border-rose-950/20">
              <div className="inline-flex p-3 rounded-xl bg-rose-100 dark:bg-rose-950/40 text-rose-600">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">No Direct Matches Found</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Our AI didn't find specific templates for "{inputValue}" in its local database. Try standard items like <strong className="text-eco-green-600">Plastic Bottle</strong>, <strong className="text-eco-green-600">Cardboard Box</strong>, <strong className="text-eco-green-600">Old T-Shirt</strong>, or <strong className="text-eco-green-600">Glass Jar</strong>!
              </p>
            </div>
          )}
        </div>
      )}

      {/* QUICK SUGGESTIONS BUBBLES */}
      {!isLoading && !hasSearched && (
        <div className="max-w-2xl mx-auto space-y-4">
          <h3 className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
            Or select a material to start:
          </h3>
          <div className="flex flex-wrap justify-center gap-2.5">
            {COMMON_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => handleSuggestionClick(item)}
                className="px-4 py-2 rounded-full border border-slate-200 hover:border-eco-green-500 dark:border-slate-800 dark:hover:border-eco-green-500 bg-white/50 hover:bg-eco-green-50/20 dark:bg-slate-900/50 dark:hover:bg-eco-green-950/10 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all duration-200"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP-BY-STEP PROJECT DETAILS MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-slate-200 dark:border-slate-800 animate-scaleUp">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start">
              <div>
                <span className="text-xs bg-eco-green-100 dark:bg-eco-green-950/40 text-eco-green-700 dark:text-eco-green-400 font-semibold px-2.5 py-1 rounded-md">
                  {selectedProject.difficulty} • {selectedProject.category}
                </span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                  {selectedProject.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* Quick Info Grid */}
              <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/30 border border-slate-100 dark:border-slate-800/40 text-center">
                <div>
                  <div className="text-xs text-slate-400 font-medium">Difficulty</div>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{selectedProject.difficulty}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Estimated Cost</div>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{selectedProject.cost}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Est. Duration</div>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{selectedProject.time}</div>
                </div>
              </div>

              {/* Eco Impact */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/15 border border-emerald-100/60 dark:border-emerald-900/30 space-y-1">
                <h4 className="text-sm font-extrabold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Eco-Impact Benefit</span>
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
                  {selectedProject.ecoImpact}
                </p>
              </div>

              {/* Materials & Tools */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2.5">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Materials Needed</h4>
                  <ul className="space-y-1.5">
                    {selectedProject.materialsNeeded.map((mat, idx) => (
                      <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-eco-green-500 mt-0.5 flex-shrink-0" />
                        <span>{mat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2.5">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Tools Required</h4>
                  <ul className="space-y-1.5">
                    {selectedProject.toolsNeeded.map((tool, idx) => (
                      <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-eco-blue-500 mt-0.5 flex-shrink-0" />
                        <span>{tool}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Step-by-Step Instructions */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Step-by-Step Instructions</h4>
                <div className="space-y-4">
                  {selectedProject.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-4 p-3.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-950/25 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-eco-green-100 dark:bg-eco-green-950/50 text-eco-green-700 dark:text-eco-green-400 flex items-center justify-center text-xs font-black flex-shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-0.5">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-between gap-3">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-850 text-xs font-semibold transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Guide</span>
              </button>
              
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onSaveToggle(selectedProject.id);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors ${
                    savedIdeaIds.includes(selectedProject.id)
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20'
                      : 'bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {savedIdeaIds.includes(selectedProject.id) ? 'Saved to Dashboard' : 'Save Project'}
                </button>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="bg-eco-green-600 hover:bg-eco-green-700 dark:bg-eco-green-600 dark:hover:bg-eco-green-500 text-white text-xs font-bold py-2.5 px-6 rounded-xl transition-colors"
                >
                  Got It!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
