import React from 'react';
import { ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { PAGES_LIST } from '../data/portfolioData';
import { audioManager } from '../utils/audio';

interface PagesHUDProps {
  currentPageIndex: number;
  onPageChange: (index: number) => void;
}

export const PagesHUD: React.FC<PagesHUDProps> = ({ currentPageIndex, onPageChange }) => {
  const current = PAGES_LIST[currentPageIndex];
  const total = PAGES_LIST.length;

  const handlePrev = () => {
    if (currentPageIndex > 0) {
      audioManager.playClick();
      onPageChange(currentPageIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentPageIndex < total - 1) {
      audioManager.playClick();
      onPageChange(currentPageIndex + 1);
    }
  };

  return (
    <aside aria-label="Page Navigation" className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-3">
      {/* Page Selector Pill */}
      <nav aria-label="Page Index" className="glass-panel px-4 py-2 rounded-2xl border border-cyan-500/30 shadow-2xl flex items-center gap-3 text-xs font-mono">
        <span className="flex items-center gap-1.5 text-cyan-400">
          <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>SECTOR</span>
        </span>

        <span className="text-white font-bold tracking-wider">
          {current.number} <span className="text-slate-500">/</span> {total}
        </span>

        <span className="text-slate-400 uppercase hidden lg:inline">
          [{current.title}]
        </span>

        {/* Micro progress line */}
        <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden border border-slate-700">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300 rounded-full"
            style={{ width: `${((currentPageIndex + 1) / total) * 100}%` }}
          />
        </div>
      </nav>

      {/* Prev / Next Warp Buttons */}
      <div className="flex items-center gap-1.5 glass-panel p-1.5 rounded-2xl border border-slate-700/60 shadow-xl">
        <button
          onClick={handlePrev}
          disabled={currentPageIndex === 0}
          onMouseEnter={() => audioManager.playHover()}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          title="Previous Sector (Arrow Left or key 1-7)"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={handleNext}
          disabled={currentPageIndex === total - 1}
          onMouseEnter={() => audioManager.playHover()}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          title="Next Sector (Arrow Right or key 1-7)"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
