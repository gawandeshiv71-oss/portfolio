import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { audioManager } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    audioManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xl py-12 w-full text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          {/* Logo & Info */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              {PERSONAL_INFO.monogram}
            </div>
            <div>
              <span className="text-white font-bold block text-base font-['Space_Grotesk']">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {PERSONAL_INFO.institution} • Computer Science Diploma
              </span>
            </div>
          </div>

          {/* Telemetry Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>WebGL 3D Core Active • 60 FPS • All Systems Nominal</span>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            onMouseEnter={() => audioManager.playHover()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700/60 hover:border-cyan-400 text-xs font-mono text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <span>BACK TO SUMMIT</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with React, Three.js, Tailwind CSS & Framer Motion.
          </div>
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              GitHub
            </a>
            <span>•</span>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              LinkedIn
            </a>
            <span>•</span>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:text-cyan-400 transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
