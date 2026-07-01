import { useState, useEffect } from 'react';
import { Leaf, Sparkles, Image, Award, Zap, Globe } from 'lucide-react';


import { ECO_FACTS } from '../data/mockProjects';

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
  const [ecoFactIndex, setEcoFactIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setEcoFactIndex((prev) => (prev + 1) % ECO_FACTS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-20 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500/10 via-teal-500/5 to-blue-500/10 dark:from-emerald-950/20 dark:via-slate-900/10 dark:to-blue-950/20 p-8 md:p-16 border border-white/20 dark:border-slate-800/40">
        {/* Animated Background Blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-72 h-72 bg-eco-green-500/10 dark:bg-eco-green-500/5 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-[-15%] left-[5%] w-80 h-80 bg-eco-blue-500/10 dark:bg-eco-blue-500/5 rounded-full blur-3xl animate-float-medium" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-eco-green-100 dark:bg-eco-green-950/40 text-eco-green-700 dark:text-eco-green-400 text-xs font-semibold border border-eco-green-200/50 dark:border-eco-green-800/30">
            <Leaf className="w-3.5 h-3.5 animate-pulse" />
            <span>ReNova Upcycling AI</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Turn <span className="text-transparent bg-clip-text bg-gradient-to-r from-eco-green-600 to-eco-blue-600 dark:from-eco-green-400 dark:to-eco-blue-400">Waste</span> into <span className="text-transparent bg-clip-text bg-gradient-to-r from-eco-blue-600 to-eco-green-600 dark:from-eco-blue-400 dark:to-eco-green-400">Value</span>
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Unleash your creativity and shrink your carbon footprint. Our intelligent generator analyzes your everyday household waste materials and suggests high-quality, practical DIY upcycling projects.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={() => setActiveTab('generator')}
              className="glass-button inline-flex items-center justify-center gap-2 bg-gradient-to-r from-eco-green-600 to-eco-green-700 hover:from-eco-green-500 hover:to-eco-green-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-eco-green-600/20 hover:shadow-xl hover:shadow-eco-green-600/30 hover:scale-[1.02]"
            >
              <span>Generate Ideas</span>
              <Sparkles className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveTab('upload')}
              className="glass-button inline-flex items-center justify-center gap-2 bg-white/80 hover:bg-white dark:bg-slate-900/60 dark:hover:bg-slate-900/80 text-slate-800 dark:text-slate-200 font-semibold py-4 px-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:scale-[1.02]"
            >
              <span>Scan Waste Image</span>
              <Image className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white">Our Eco Impact So Far</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Real-time statistics of waste repurposed and eco-friendly projects created by our community.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-2xl p-8 border border-white/20 dark:border-slate-800/40 text-center space-y-3 hover:scale-[1.02] transition-transform duration-300">
            <div className="inline-flex p-3 rounded-xl bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400 mb-2">
              <Globe className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">12,432 kg</h3>
            <p className="text-slate-500 dark:text-slate-400 font-semibold text-sm">Landfill Waste Saved</p>
            <p className="text-xs text-slate-400 dark:text-slate-500">Equates to roughly 820,000 plastic water bottles diverted.</p>
          </div>

          <div className="glass-panel rounded-2xl p-8 border border-white/20 dark:border-slate-800/40 text-center space-y-3 hover:scale-[1.02] transition-transform duration-300">
            <div className="inline-flex p-3 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 mb-2">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">4,827</h3>
            <p className="text-slate-500 dark:text-slate-400 font-semibold text-sm">Projects Completed</p>
            <p className="text-xs text-slate-400 dark:text-slate-500">From home decor items to backyard bird sanctuaries.</p>
          </div>

          <div className="glass-panel rounded-2xl p-8 border border-white/20 dark:border-slate-800/40 text-center space-y-3 hover:scale-[1.02] transition-transform duration-300">
            <div className="inline-flex p-3 rounded-xl bg-teal-100 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 mb-2">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">1.8 Tons</h3>
            <p className="text-slate-500 dark:text-slate-400 font-semibold text-sm">CO2 Emissions Saved</p>
            <p className="text-xs text-slate-400 dark:text-slate-500">Calculated by offsetting new manufacturing and transport energy.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white">How It Works</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Three simple steps to transform trash into functional items.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line for desktop */}
          <div className="hidden md:block absolute top-[2.5rem] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-eco-green-500/20 via-eco-blue-500/20 to-eco-green-500/20 -z-10" />

          {/* Step 1 */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-eco-green-500 to-emerald-600 text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-eco-green-500/20 border-4 border-white dark:border-slate-900">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Describe or Upload</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs">
              Type the name of your waste material (e.g., "Egg Carton") or drag and drop a photo to let our scanner detect the item.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-eco-blue-500 to-sky-600 text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-eco-blue-500/20 border-4 border-white dark:border-slate-900">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">AI Analysis</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs">
              Our intelligent engine parses the item, matching it with creative, structural, and chemical upcycling potentials.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-eco-green-600 to-eco-blue-600 text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-eco-green-500/20 border-4 border-white dark:border-slate-900">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Get Creative Ideas</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs">
              Browse detailed step-by-step instructions, complete with tool requirements, cost estimates, and difficulty ratings.
            </p>
          </div>
        </div>
      </section>

      {/* ROTATING ECO FACTS BANNER */}
      <section className="glass-panel rounded-2xl p-6 md:p-8 border border-white/20 dark:border-slate-800/40 bg-gradient-to-r from-eco-green-600/5 via-transparent to-eco-blue-600/5">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0 p-4 rounded-2xl bg-gradient-to-br from-eco-green-500 to-eco-blue-500 text-white shadow-md">
            <Leaf className="w-8 h-8 animate-float-medium" />
          </div>
          <div className="space-y-1 text-center md:text-left flex-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-eco-green-600 dark:text-eco-green-400">Did You Know?</span>
            <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 font-medium transition-opacity duration-500">
              "{ECO_FACTS[ecoFactIndex]}"
            </p>
          </div>
          <div className="flex-shrink-0 text-xs text-slate-400 dark:text-slate-500">
            Swipe automatically
          </div>
        </div>
      </section>
    </div>
  );
};
