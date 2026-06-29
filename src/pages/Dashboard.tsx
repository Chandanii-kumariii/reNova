import { useState } from 'react';
import { MOCK_PROJECTS } from '../data/mockProjects';
import type { ProjectIdea } from '../data/mockProjects';
import { ReuseCard } from '../components/ReuseCard';
import { Award, ShieldCheck, Leaf, Trash2, Droplet, Zap, BookOpen, Sliders } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DashboardProps {
  savedIdeaIds: string[];
  completedIdeaIds: string[];
  onSaveToggle: (id: string) => void;
  onCompleteToggle: (id: string) => void;
  onShare: (idea: ProjectIdea) => void;
  showNotification: (msg: string, type: 'success' | 'info') => void;
  setActiveTab: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  savedIdeaIds,
  completedIdeaIds,
  onSaveToggle,
  onCompleteToggle,
  onShare,
  showNotification,
  setActiveTab
}) => {
  // Calculator State (Interactive Eco-Impact sliders)
  const [calcBottles, setCalcBottles] = useState(12);
  const [calcBoxes, setCalcBoxes] = useState(8);
  const [calcJars, setCalcJars] = useState(5);
  const [calcShirts, setCalcShirts] = useState(3);

  // Constants for multipliers
  // 1 bottle = 0.05kg plastic, 0.08kg CO2, 0.5L water
  // 1 box = 0.2kg paper, 0.3kg CO2, 2L water
  // 1 jar = 0.3kg glass, 0.15kg CO2, 1.2L water
  // 1 shirt = 0.25kg textile, 1.2kg CO2, 15L water


  
  const totalWeightSaved = (
    calcBottles * 0.05 + 
    calcBoxes * 0.2 + 
    calcJars * 0.3 + 
    calcShirts * 0.25
  ).toFixed(2);

  const totalCO2Saved = (
    calcBottles * 0.08 +
    calcBoxes * 0.3 +
    calcJars * 0.15 +
    calcShirts * 1.2
  ).toFixed(2);

  const totalWaterSaved = (
    calcBottles * 0.5 +
    calcBoxes * 2 +
    calcJars * 1.2 +
    calcShirts * 15
  ).toFixed(0);

  // Retrieve actual ProjectIdea objects for saved items
  const savedProjects = MOCK_PROJECTS.filter((p) => savedIdeaIds.includes(p.id));

  const handleCompleteClick = (id: string, title: string) => {
    onCompleteToggle(id);
    
    // If we are marking it as completed (i.e. it was not already completed)
    if (!completedIdeaIds.includes(id)) {
      // Trigger eco green/blue confetti!
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#22c55e', '#0ea5e9', '#dcfce7', '#bae6fd']
      });
      showNotification(`Congratulations on completing "${title}"! 🌿`, 'success');
    } else {
      showNotification(`Marked "${title}" as in progress.`, 'info');
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* USER PROFILE HEADER */}
      <div className="glass-panel rounded-3xl p-6 md:p-8 border border-white/20 dark:border-slate-800/40 shadow-lg flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
          {/* Avatar */}
          <div className="relative">
            <span className="text-5xl p-4.5 bg-gradient-to-br from-eco-green-100 to-eco-blue-100 dark:from-emerald-950/40 dark:to-blue-950/40 border border-slate-250/20 rounded-3xl inline-block shadow-inner animate-float-medium">
              🦸
            </span>
            <span className="absolute -bottom-2 -right-2 bg-gradient-to-r from-eco-green-600 to-emerald-600 text-white text-[10px] font-black px-2 py-1 rounded-lg border-2 border-white dark:border-slate-900 shadow">
              LVL 3
            </span>
          </div>

          <div className="space-y-2">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">Eco Explorer</h2>
              <p className="text-xs text-slate-450 dark:text-slate-500 mt-0.5">Joined June 2026 • Sustainability Pioneer</p>
            </div>
            {/* Level XP Bar */}
            <div className="space-y-1 w-64 max-w-full mx-auto md:mx-0">
              <div className="flex justify-between text-[10px] font-bold text-slate-500">
                <span>340 XP</span>
                <span>500 XP to Level 4</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800/70 rounded-full overflow-hidden border border-slate-200/20">
                <div className="h-full bg-gradient-to-r from-eco-green-500 to-eco-blue-500 rounded-full" style={{ width: '68%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Badges */}
        <div className="flex flex-wrap justify-center gap-3.5 border-t md:border-t-0 border-slate-150/60 dark:border-slate-800/50 pt-5 md:pt-0">
          <div className="flex flex-col items-center p-3 rounded-2xl bg-white/40 dark:bg-slate-950/25 border border-slate-200/45 dark:border-slate-800/30 w-24 shadow-sm" title="Completed 3+ upcycling projects">
            <Award className="w-6 h-6 text-eco-green-600 mb-1.5 animate-pulse-slow" />
            <span className="text-[10px] font-bold text-slate-850 dark:text-slate-350 text-center">Green Artisan</span>
          </div>
          
          <div className="flex flex-col items-center p-3 rounded-2xl bg-white/40 dark:bg-slate-950/25 border border-slate-200/45 dark:border-slate-800/30 w-24 shadow-sm" title="Saved 10kg+ landfill waste">
            <ShieldCheck className="w-6 h-6 text-eco-blue-600 mb-1.5" />
            <span className="text-[10px] font-bold text-slate-850 dark:text-slate-350 text-center">Waste Slayer</span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-2xl bg-white/40 dark:bg-slate-950/25 border border-slate-200/45 dark:border-slate-800/30 w-24 shadow-sm" title="Calculated carbon footprint offset">
            <Leaf className="w-6 h-6 text-emerald-600 mb-1.5" />
            <span className="text-[10px] font-bold text-slate-850 dark:text-slate-350 text-center">CO2 Auditor</span>
          </div>
        </div>
      </div>

      {/* INTERACTIVE ECO CALCULATOR (Middle) */}
      <section className="glass-panel rounded-3xl p-6 md:p-8 border border-white/20 dark:border-slate-800/40 shadow-lg space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-150/60 dark:border-slate-800/45 pb-4">
          <Sliders className="w-5 h-5 text-eco-green-600" />
          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            Personal Eco-Impact Calculator
          </h3>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          Adjust the sliders below to declare the quantities of materials you have upcycled or prevented from landfill disposal this month. Watch your personal carbon, plastic, and water offset metrics recalculate instantly!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* SLIDERS (Left/Top) */}
          <div className="lg:col-span-6 space-y-5">
            {/* Bottles */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Plastic Bottles Upcycled</span>
                <span className="text-eco-green-600 dark:text-eco-green-400">{calcBottles} units</span>
              </div>
              <input
                type="range" min="0" max="50" value={calcBottles}
                onChange={(e) => setCalcBottles(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-eco-green-600"
              />
            </div>

            {/* Boxes */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Cardboard Boxes Upcycled</span>
                <span className="text-eco-green-600 dark:text-eco-green-400">{calcBoxes} units</span>
              </div>
              <input
                type="range" min="0" max="50" value={calcBoxes}
                onChange={(e) => setCalcBoxes(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-eco-green-600"
              />
            </div>

            {/* Glass Jars */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Glass Jars Upcycled</span>
                <span className="text-eco-green-600 dark:text-eco-green-400">{calcJars} units</span>
              </div>
              <input
                type="range" min="0" max="50" value={calcJars}
                onChange={(e) => setCalcJars(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-eco-green-600"
              />
            </div>

            {/* T-shirts */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Old Clothes / T-Shirts Upcycled</span>
                <span className="text-eco-green-600 dark:text-eco-green-400">{calcShirts} units</span>
              </div>
              <input
                type="range" min="0" max="20" value={calcShirts}
                onChange={(e) => setCalcShirts(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-eco-green-600"
              />
            </div>
          </div>

          {/* CALCULATED METRICS GRAPHICS (Right/Bottom) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4.5 rounded-2xl bg-gradient-to-br from-green-500/5 to-emerald-500/5 border border-green-500/10 text-center flex flex-col justify-between h-36">

              <div className="mx-auto p-2 bg-green-500/10 text-green-600 rounded-xl w-fit">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white">{totalWeightSaved} kg</h4>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-0.5 uppercase tracking-wide">Waste Saved</p>
              </div>
            </div>

            <div className="p-4.5 rounded-2xl bg-gradient-to-br from-blue-500/5 to-sky-500/5 border border-blue-500/10 text-center flex flex-col justify-between h-36">
              <div className="mx-auto p-2 bg-blue-500/10 text-blue-600 rounded-xl w-fit">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white">{totalCO2Saved} kg</h4>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-0.5 uppercase tracking-wide">CO2 Offset</p>
              </div>
            </div>

            <div className="p-4.5 rounded-2xl bg-gradient-to-br from-teal-500/5 to-cyan-500/5 border border-teal-500/10 text-center flex flex-col justify-between h-36">
              <div className="mx-auto p-2 bg-teal-500/10 text-teal-600 rounded-xl w-fit">
                <Droplet className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white">{totalWaterSaved} L</h4>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-0.5 uppercase tracking-wide">Water Saved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SAVED IDEAS SECTION (Bottom) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/45 pb-4">
          <h3 className="text-xl font-extrabold text-slate-850 dark:text-white flex items-center gap-2">
            <span>Saved Reuse Ideas</span>
            <span className="text-xs bg-eco-green-100 dark:bg-eco-green-950/40 text-eco-green-700 dark:text-eco-green-400 px-2.5 py-0.5 rounded-full border border-eco-green-200/40 font-bold">
              {savedProjects.length} Projects
            </span>
          </h3>
        </div>

        {savedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {savedProjects.map((idea) => (
              <ReuseCard
                key={idea.id}
                idea={idea}
                isSaved={true}
                isCompleted={completedIdeaIds.includes(idea.id)}
                onSaveToggle={() => onSaveToggle(idea.id)}
                onCompleteToggle={() => handleCompleteClick(idea.id, idea.title)}
                onShare={() => onShare(idea)}
                onViewDetails={() => {
                  showNotification(`Opening project guide: ${idea.title}`, 'info');
                  // Quick trigger redirect to Tutorials tab or display steps
                }}
              />
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-3xl p-12 text-center border border-white/20 dark:border-slate-800/40 flex flex-col items-center justify-center min-h-[220px] text-slate-400 space-y-4">
            <BookOpen className="w-10 h-10 text-slate-350 dark:text-slate-700 animate-pulse-slow" />
            <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm">No Saved Projects Yet</h4>
            <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
              Explore the Idea Generator or scan an object with the camera to find creative designs and save them here.
            </p>
            <button
              onClick={() => setActiveTab('generator')}
              className="glass-button bg-eco-green-600 hover:bg-eco-green-700 text-white text-xs font-bold py-2.5 px-6 rounded-xl transition-colors"
            >
              Discover Ideas
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
