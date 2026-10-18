import React from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  Terminal,
  Code,
  Globe,
  Brain,
  Bot,
  Layers,
  Trophy,
  Rocket
} from 'lucide-react';
import { LEARNING_JOURNEY_DATA } from '../data/portfolioData';
import { audioManager } from '../utils/audio';

const stepIcons: Record<number, React.ReactNode> = {
  1: <Terminal className="w-5 h-5 text-cyan-400" />,
  2: <Code className="w-5 h-5 text-teal-400" />,
  3: <Globe className="w-5 h-5 text-sky-400" />,
  4: <Brain className="w-5 h-5 text-purple-400" />,
  5: <Bot className="w-5 h-5 text-indigo-400" />,
  6: <Layers className="w-5 h-5 text-emerald-400" />,
  7: <Trophy className="w-5 h-5 text-amber-400" />,
  8: <Rocket className="w-5 h-5 text-pink-400" />
};

export const LearningJourney: React.FC = () => {
  return (
    <section id="journey" className="relative py-28 w-full overflow-hidden bg-slate-950/40">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full cyber-badge text-xs font-mono mb-3"
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>EVOLUTIONARY PATHWAY</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white font-['Space_Grotesk']"
          >
            Learning <span className="text-gradient">Journey</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-2"
          >
            From theoretical computer science fundamentals to autonomous agent pipelines and future-facing software engineering.
          </motion.p>
        </div>

        {/* 8-Step Interactive Roadmap Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Animated Glowing Vertical Track */}
          <div className="absolute left-6 sm:left-1/2 top-6 bottom-6 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 sm:-translate-x-1/2 shadow-[0_0_15px_rgba(0,240,255,0.6)]" />

          <div className="space-y-8 sm:space-y-12">
            {LEARNING_JOURNEY_DATA.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                    isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  } gap-6 group`}
                >
                  {/* Center Node Badge */}
                  <div className="absolute left-6 sm:left-1/2 top-4 sm:top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center group-hover:scale-110 group-hover:border-emerald-400 transition-all duration-300">
                      {stepIcons[item.step]}
                    </div>
                  </div>

                  {/* Left / Right Content Card */}
                  <div className="w-full sm:w-1/2 pl-16 sm:pl-0 sm:px-8">
                    <motion.div
                      whileHover={{ y: -4, scale: 1.02 }}
                      onMouseEnter={() => audioManager.playHover()}
                      className={`glass-panel p-5 sm:p-6 rounded-2xl border border-slate-700/60 hover:border-cyan-400/60 transition-all shadow-xl ${
                        isEven ? 'sm:text-right' : 'sm:text-left'
                      }`}
                    >
                      {/* Step index & badge */}
                      <div
                        className={`flex items-center gap-2 mb-2 ${
                          isEven ? 'sm:justify-end' : 'sm:justify-start'
                        }`}
                      >
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                          STEP 0{item.step}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
                          {item.badge}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white font-['Space_Grotesk'] mb-1 group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
                        {item.shortDesc}
                      </p>

                      {/* Tag badges */}
                      <div
                        className={`flex flex-wrap gap-1.5 ${
                          isEven ? 'sm:justify-end' : 'sm:justify-start'
                        }`}
                      >
                        {item.skills.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden sm:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
