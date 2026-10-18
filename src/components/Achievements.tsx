import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Sparkles } from 'lucide-react';
import { ACHIEVEMENTS_DATA } from '../data/portfolioData';
import { Trophy3DCanvas } from './Trophy3DCanvas';
import { audioManager } from '../utils/audio';

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="relative py-28 w-full overflow-hidden bg-slate-950/40">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full cyber-badge text-xs font-mono mb-3"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>EXCELLENCE UNDER PRESSURE</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white font-['Space_Grotesk']"
          >
            Key <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400">Achievements</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-2"
          >
            Recognized for shipping end-to-end intelligent prototypes under strict sprint constraints.
          </motion.p>
        </div>

        {/* Central 3D Interactive Stage */}
        <div className="max-w-5xl mx-auto glass-panel rounded-3xl border border-amber-500/25 p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 3D Trophy Canvas */}
            <div className="lg:col-span-5 h-[340px] sm:h-[400px] rounded-2xl bg-slate-900/40 border border-amber-500/20 relative overflow-hidden flex items-center justify-center">
              <Trophy3DCanvas />
              <div className="absolute bottom-3 left-3 right-3 text-center text-[10px] font-mono text-amber-300/80 bg-slate-950/70 py-1.5 px-3 rounded-lg border border-amber-500/20">
                ★ 3D HOLOGRAPHIC HACKATHON TROPHY • ROTATABLE ★
              </div>
            </div>

            {/* Right Achievement Details */}
            <div className="lg:col-span-7 flex flex-col text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono w-fit">
                <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>{ACHIEVEMENTS_DATA.badge}</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-['Space_Grotesk'] mb-3">
                  {ACHIEVEMENTS_DATA.title}
                </h3>
                <blockquote className="p-4 rounded-2xl bg-amber-950/20 border-l-4 border-amber-400 text-slate-200 text-base sm:text-lg font-medium italic">
                  "{ACHIEVEMENTS_DATA.quote}"
                </blockquote>
              </div>

              {/* Highlight Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {ACHIEVEMENTS_DATA.highlights.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -3 }}
                    onMouseEnter={() => audioManager.playHover()}
                    className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-amber-400/40 transition-all text-left flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-base font-black text-amber-400 font-['Space_Grotesk'] block">
                        {item.metric}
                      </span>
                      <span className="text-xs font-bold text-white block mt-0.5 mb-1.5">
                        {item.label}
                      </span>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        {item.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Skills Applied Badge List */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs font-mono text-slate-400">
                <span className="text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  KEY STRENGTHS:
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                  Sprint Execution
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                  AI Solutioning
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                  Live Technical Pitch
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
