import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, User, MapPin, GraduationCap, Code2, Zap, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO, ABOUT_SKILL_BADGES } from '../data/portfolioData';
import { DigitalIdentityPortrait } from './DigitalIdentityPortrait';
import { audioManager } from '../utils/audio';

interface AboutProps {
  onNavigate?: (pageId: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);

  const pillars = [
    {
      title: 'Systems & Algorithmic Core',
      desc: 'Deep theoretical and hands-on grounding in C/C++, Data Structures, Memory Management, and OOP design patterns.',
      icon: <Code2 className="w-4 h-4 text-cyan-400" />
    },
    {
      title: 'Autonomous & Agentic AI',
      desc: 'Designing autonomous pipelines, multi-agent reasoning, prompt engineering, and LLM-assisted workflows.',
      icon: <Zap className="w-4 h-4 text-emerald-400" />
    },
    {
      title: 'Modern Web Engineering',
      desc: 'Building responsive, high-performance interfaces with React, modern TypeScript, Three.js, and clean software architecture.',
      icon: <Terminal className="w-4 h-4 text-purple-400" />
    }
  ];

  return (
    <section className="relative min-h-[92vh] py-20 w-full overflow-hidden flex flex-col justify-center">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full cyber-badge text-xs font-mono mb-3"
          >
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span>SECTOR 02 // IDENTITY DECRYPT</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-['Space_Grotesk']"
          >
            {PERSONAL_INFO.aboutHeadline}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xs sm:text-sm font-mono max-w-xl mx-auto mt-2"
          >
            A high-agency Computer Science student bridging classical systems engineering with agentic intelligence.
          </motion.p>
        </div>

        {/* Orbiting Floating Skill Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {ABOUT_SKILL_BADGES.map((skill, index) => {
            const isHovered = hoveredBadge === skill;
            return (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.04 }}
                whileHover={{ scale: 1.12, y: -3 }}
                onMouseEnter={() => {
                  audioManager.playHover();
                  setHoveredBadge(skill);
                }}
                onMouseLeave={() => setHoveredBadge(null)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold cursor-pointer select-none transition-all duration-300 ${
                  isHovered
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.7)] border-cyan-300'
                    : 'glass-panel text-cyan-300 border-cyan-500/30 hover:border-cyan-400'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-400">#</span>
                  {skill}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Main 2-Column Presentation: Left Digital Identity Portrait, Right Biography & Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-6xl mx-auto">
          {/* Left Column: Shivam's Creative Particle Digital Identity Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <DigitalIdentityPortrait />
          </div>

          {/* Right Column: Verified Bio, CWIT Credentials, and Engineering Focus */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  VERIFIED ACADEMIC & BUILDER PROFILE
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  REAL DATA
                </span>
              </div>

              {/* Bio blockquote */}
              <blockquote className="p-4 rounded-2xl bg-cyan-950/20 border-l-4 border-cyan-400 text-slate-200 text-sm sm:text-base font-medium leading-relaxed italic mb-5">
                "{PERSONAL_INFO.aboutBio}"
              </blockquote>

              {/* Institution badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
                  <div className="flex items-center gap-2 text-cyan-400 mb-1">
                    <GraduationCap className="w-4 h-4" />
                    <span className="uppercase text-[10px] text-slate-500">Institution</span>
                  </div>
                  <span className="text-white font-bold block">{PERSONAL_INFO.institution}</span>
                  <span className="text-slate-400 text-[11px]">{PERSONAL_INFO.degree}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
                  <div className="flex items-center gap-2 text-emerald-400 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="uppercase text-[10px] text-slate-500">Base Location</span>
                  </div>
                  <span className="text-white font-bold block">{PERSONAL_INFO.location}</span>
                  <span className="text-slate-400 text-[11px]">{PERSONAL_INFO.status}</span>
                </div>
              </div>

              {/* Technical Pillars */}
              <div className="space-y-3">
                <span className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  ENGINEERING PHILOSOPHY & CAPABILITIES:
                </span>
                {pillars.map((pil, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/40 transition-colors flex items-start gap-3"
                  >
                    <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700 shrink-0">
                      {pil.icon}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block mb-0.5 font-['Space_Grotesk']">
                        {pil.title}
                      </span>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {pil.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Next Page Portal link */}
              {onNavigate && (
                <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">NEXT SECTOR:</span>
                  <button
                    onClick={() => onNavigate('projects')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:text-white hover:bg-cyan-500/30 text-xs font-bold transition-all cursor-pointer"
                  >
                    <span>03 // INSPECT PROJECTS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
