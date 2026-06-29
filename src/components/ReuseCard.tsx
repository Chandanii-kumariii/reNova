import type { ProjectIdea } from '../data/mockProjects';
import { Heart, Share2, Clock, DollarSign, ChevronRight, Check } from 'lucide-react';


interface ReuseCardProps {
  idea: ProjectIdea;
  isSaved: boolean;
  isCompleted?: boolean;
  onSaveToggle: () => void;
  onCompleteToggle?: () => void;
  onViewDetails: () => void;
  onShare: () => void;
}

export const ReuseCard: React.FC<ReuseCardProps> = ({
  idea,
  isSaved,
  isCompleted = false,
  onSaveToggle,
  onCompleteToggle,
  onViewDetails,
  onShare,
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800/50';
      case 'Medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800/50';
      case 'Hard':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400 border-rose-200 dark:border-rose-800/50';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400 border-slate-200';
    }
  };

  return (
    <div className="glass-card flex flex-col justify-between h-full rounded-2xl p-6 relative group overflow-hidden border border-white/20 dark:border-slate-800/40">
      {/* Absolute background highlight on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-eco-green-500/5 to-eco-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div>
        {/* Badges */}
        <div className="flex flex-wrap gap-2 items-center justify-between mb-4">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${getDifficultyColor(idea.difficulty)}`}>
            {idea.difficulty}
          </span>
          <span className="bg-slate-100 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 text-xs px-2.5 py-1 rounded-md border border-slate-200/50 dark:border-slate-800/40">
            {idea.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-eco-green-600 dark:group-hover:text-eco-green-400 transition-colors duration-300">
          {idea.title}
        </h3>
        
        {/* Description */}
        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-4">
          {idea.description}
        </p>

        {/* Meta info row */}
        <div className="grid grid-cols-2 gap-3 mb-5 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-eco-green-600 dark:text-eco-green-400" />
            <span>{idea.time}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-eco-blue-600 dark:text-eco-blue-400" />
            <span>{idea.cost}</span>
          </div>
        </div>
      </div>

      <div>
        {/* Divider */}
        <hr className="border-slate-200/60 dark:border-slate-800/50 mb-4" />

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={onViewDetails}
            className="flex-1 inline-flex items-center justify-center gap-1 bg-eco-green-600 hover:bg-eco-green-700 dark:bg-eco-green-600 dark:hover:bg-eco-green-500 text-white text-xs font-semibold py-2 px-3 rounded-xl transition-colors shadow-sm shadow-eco-green-600/10"
          >
            <span>View Steps</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <div className="flex gap-1">
            {onCompleteToggle && isSaved && (
              <button
                onClick={onCompleteToggle}
                title={isCompleted ? "Mark as Incomplete" : "Mark as Completed"}
                className={`p-2 rounded-xl border transition-all duration-300 ${
                  isCompleted
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
                }`}
              >
                <Check className="w-4 h-4" />
              </button>
            )}
            
            <button
              onClick={onSaveToggle}
              title={isSaved ? "Remove from Saved" : "Save Idea"}
              className={`p-2 rounded-xl border transition-all duration-300 ${
                isSaved
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={onShare}
              title="Share Project"
              className="p-2 rounded-xl border bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
