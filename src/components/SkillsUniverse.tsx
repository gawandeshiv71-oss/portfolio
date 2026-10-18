import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  Layers,
  Cpu,
  Brain,
  Terminal,
  FileCode,
  Layout,
  Palette,
  Smartphone,
  Bot,
  Sparkles,
  Workflow,
  Binary,
  Boxes,
  Database,
  Network,
  Info
} from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';
import { Skills3DCanvas } from './Skills3DCanvas';
import { audioManager } from '../utils/audio';

// Map icon names to Lucide icons
const iconMap: Record<string, React.ReactNode> = {
  Code: <Code className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  Terminal: <Terminal className="w-5 h-5" />,
  FileCode: <FileCode className="w-5 h-5" />,
  Layout: <Layout className="w-5 h-5" />,
  Palette: <Palette className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  Smartphone: <Smartphone className="w-5 h-5" />,
  Brain: <Brain className="w-5 h-5" />,
  Bot: <Bot className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Workflow: <Workflow className="w-5 h-5" />,
  Binary: <Binary className="w-5 h-5" />,
  Boxes: <Boxes className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  Network: <Network className="w-5 h-5" />
};

const CATEGORIES = [
  { id: 'all', label: 'All Disciplines', color: '#00f0ff' },
  { id: 'programming', label: 'Programming', color: '#00f0ff' },
  { id: 'web', label: 'Web Development', color: '#38bdf8' },
  { id: 'ai', label: 'AI & Autonomous Agents', color: '#8b5cf6' },
  { id: 'cs', label: 'Computer Science Core', color: '#10b981' }
];

export const SkillsUniverse: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTooltipId, setActiveTooltipId] = useState<string | null>(null);

  const filteredSkills =
    selectedCategory === 'all'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.category === selectedCategory);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'programming':
        return 'text-cyan-400 border-cyan-500/40 bg-cyan-950/20';
      case 'web':
        return 'text-sky-400 border-sky-500/40 bg-sky-950/20';
      case 'ai':
        return 'text-purple-400 border-purple-500/40 bg-purple-950/20';
      case 'cs':
        return 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20';
      default:
        return 'text-cyan-400 border-cyan-500/40 bg-cyan-950/20';
    }
  };

  return (
    <section id="skills" className="relative py-28 w-full overflow-hidden bg-slate-950/30">
      {/* Background Ambience */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full cyber-badge text-xs font-mono mb-3"
          >
            <Brain className="w-3.5 h-3.5 text-cyan-400" />
            <span>NEURAL CAPABILITY MATRIX</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white font-['Space_Grotesk']"
          >
            3D Skills <span className="text-gradient">Universe</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-2"
          >
            Floating planetary nodes orbiting a central neural sphere, representing systems, web, AI and core CS competencies.
          </motion.p>
        </div>

        {/* 3D Visual Centerpiece: Orbiting Universe */}
        <div className="relative w-full h-[320px] sm:h-[400px] mb-12 rounded-3xl glass-panel border border-cyan-500/20 overflow-hidden flex items-center justify-center">
          <Skills3DCanvas />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-slate-950/60 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-800">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Sparkles className="w-3 h-3 animate-spin" />
              INTERACTIVE 3D NEURAL SPHERE
            </span>
            <span className="hidden sm:inline text-slate-500">
              Drag mouse to rotate orbits • Hover nodes for telemetric data
            </span>
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  audioManager.playClick();
                  setSelectedCategory(cat.id);
                }}
                onMouseEnter={() => audioManager.playHover()}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                    : 'glass-panel text-slate-300 hover:text-white hover:border-cyan-400/50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Floating 3D Skill Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence>
            {filteredSkills.map((skill) => {
              const catClass = getCategoryColor(skill.category);
              const isTooltip = activeTooltipId === skill.id;

              return (
                <motion.div
                  layout
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onMouseEnter={() => {
                    audioManager.playHover();
                    setActiveTooltipId(skill.id);
                  }}
                  onMouseLeave={() => setActiveTooltipId(null)}
                  className="relative glass-card p-5 rounded-2xl border flex flex-col justify-between group overflow-hidden"
                >
                  {/* Subtle top glow bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Header: Icon + Category Badge */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2.5 rounded-xl border ${catClass}`}>
                        {iconMap[skill.iconName] || <Code className="w-5 h-5" />}
                      </div>
                      <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700/60 text-slate-400">
                        {skill.category}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-['Space_Grotesk']">
                      {skill.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>

                  {/* Proficiency Meter */}
                  <div className="mt-5 pt-3 border-t border-slate-800/80">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                      <span>PROFICIENCY</span>
                      <span className="text-cyan-400 font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Interactive Tooltip on Mobile/Desktop */}
                  {isTooltip && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute inset-x-2 bottom-2 p-3 rounded-xl bg-slate-950/95 border border-cyan-400/60 backdrop-blur-xl text-left z-20 shadow-2xl"
                    >
                      <div className="flex items-center gap-1.5 text-cyan-400 text-[11px] font-mono mb-1">
                        <Info className="w-3 h-3" />
                        <span>TECHNICAL SCOPE</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug">
                        {skill.description}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
