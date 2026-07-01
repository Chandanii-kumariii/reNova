import { useState } from 'react';
import { Leaf, Menu, X, Sun, Moon, Sparkles } from 'lucide-react';



interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  theme,
  toggleTheme,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'generator', label: 'Idea Generator' },
    { id: 'upload', label: 'Upload Image' },
    { id: 'tutorials', label: 'DIY Tutorials' },
    { id: 'community', label: 'Community' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'about-contact', label: 'About & Contact' },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-45 w-full glass-panel border-b border-white/10 dark:border-slate-800/40 shadow-sm backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo Brand */}
          <div 
            onClick={() => handleTabClick('home')} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="p-2 bg-gradient-to-br from-eco-green-500 to-eco-green-600 rounded-xl text-white shadow-md shadow-eco-green-500/10 group-hover:scale-105 transition-transform duration-200">
              <Leaf className="w-5 h-5 animate-pulse-slow" />
            </div>
            <span className="text-lg font-black tracking-tight text-slate-850 dark:text-white flex items-center gap-1">
              <span>Re</span>
              <span className="text-eco-green-655 dark:text-eco-green-400">Nova</span>
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-eco-green-500/10 text-eco-green-600 dark:text-eco-green-400 border border-eco-green-500/20 dark:border-eco-green-500/10'
                    : 'text-slate-600 hover:text-eco-green-600 dark:text-slate-350 dark:hover:text-eco-green-400 hover:bg-slate-50 dark:hover:bg-slate-900/40 border border-transparent'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Actions: Theme Toggle & Mobile Hamburger */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title="Toggle Light/Dark Theme"
              className="p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white/50 dark:bg-slate-950/40 text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors active:scale-95 shadow-sm"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-eco-blue-600 animate-float-mini" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
              )}
            </button>

            {/* Hamburger Menu (Mobile) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800 bg-white/50 dark:bg-slate-955 text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors active:scale-95 shadow-sm"
            >
              {isOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg shadow-xl py-4.5 px-4 space-y-2 animate-fadeIn z-40">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-full text-left px-4 py-3.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-between ${
                activeTab === item.id
                  ? 'bg-eco-green-550/10 text-eco-green-600 dark:text-eco-green-400 border border-eco-green-500/20'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-950/40 border border-transparent'
              }`}
            >
              <span>{item.label}</span>
              {activeTab === item.id && <Sparkles className="w-4 h-4 text-eco-green-500 animate-pulse" />}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};
