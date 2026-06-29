import React, { useState } from 'react';
import * as Icons from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeLabel: string;
  afterLabel: string;
  beforeColor: string; // e.g., 'from-gray-700 to-slate-950'
  afterColor: string;  // e.g., 'from-emerald-500 to-teal-600'
  beforeIcon: string;  // Lucide icon name
  afterIcon: string;   // Lucide icon name
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeLabel,
  afterLabel,
  beforeColor,
  afterColor,
  beforeIcon,
  afterIcon,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  // Dynamic Lucide icon lookup
  const renderIcon = (name: string, className: string) => {
    const IconComponent = (Icons as any)[name];
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
    return <Icons.HelpCircle className={className} />;
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg select-none group border border-slate-200 dark:border-slate-800">
      {/* AFTER CONTAINER (Background) */}
      <div className={`absolute inset-0 bg-gradient-to-br ${afterColor} flex flex-col justify-between p-6 text-white`}>
        <div className="flex justify-between items-start">
          <span className="bg-eco-blue-600/80 backdrop-blur-sm text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 uppercase tracking-wider shadow-sm">
            After: Upcycled Product
          </span>
          <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl border border-white/20 shadow-inner">
            {renderIcon(afterIcon, "w-8 h-8 text-white animate-float-medium")}
          </div>
        </div>
        <div>
          <h4 className="text-xl font-bold drop-shadow-md">{afterLabel}</h4>
          <p className="text-white/80 text-xs mt-1">Drag the slider to see the transformation</p>
        </div>
      </div>

      {/* BEFORE CONTAINER (Foreground, clipped based on slider position) */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${beforeColor} flex flex-col justify-between p-6 text-white overflow-hidden`}
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <div className="flex justify-between items-start w-full">
          <span className="bg-slate-900/80 backdrop-blur-sm text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10 uppercase tracking-wider shadow-sm">
            Before: Raw Waste
          </span>
          <div className="p-3 bg-slate-900/40 backdrop-blur-md rounded-xl border border-white/10 shadow-inner">
            {renderIcon(beforeIcon, "w-8 h-8 text-slate-300")}
          </div>
        </div>
        <div className="min-w-[280px]">
          <h4 className="text-xl font-bold text-slate-100">{beforeLabel}</h4>
          <p className="text-slate-300 text-xs mt-1">Ready for creative reuse</p>
        </div>
      </div>

      {/* DRAGGABLE SLIDER LINE AND HANDLE */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize pointer-events-none z-20 flex items-center justify-center shadow-lg"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-8 h-8 rounded-full bg-white text-slate-800 flex items-center justify-center shadow-xl border-2 border-eco-green-500 hover:bg-eco-green-50 hover:scale-110 active:scale-95 transition-all duration-150">
          <Icons.ChevronsLeftRight className="w-4 h-4 text-eco-green-600 animate-pulse" />
        </div>
      </div>


      {/* HIDDEN RANGE INPUT FOR DRAG CONTROL */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleSliderChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
      />
    </div>
  );
};
