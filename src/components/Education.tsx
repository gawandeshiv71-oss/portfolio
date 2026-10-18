import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, CheckCircle2, Sparkles } from 'lucide-react';
import { EDUCATION_DATA } from '../data/portfolioData';
import { audioManager } from '../utils/audio';

export const Education: React.FC = () => {
  return (
    <section id="education" className="relative py-28 w-full overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full cyber-badge text-xs font-mono mb-3"
          >
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>ACADEMIC FOUNDATION</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white font-['Space_Grotesk']"
          >
            Education <span className="text-gradient">Timeline</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-2"
          >
            Structured computer science engineering coursework at Cusrow Wadia Institute of Technology.
          </motion.p>
        </div>

        {/* Vertical 3D Timeline Container */}
        <div className="max-w-4xl mx-auto relative">
          {/* Glowing Vertical Circuit Line */}
          <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-400 via-teal-400 to-emerald-400 sm:-translate-x-1/2 shadow-[0_0_15px_rgba(0,240,255,0.7)]" />

          <div className="space-y-12">
            {EDUCATION_DATA.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 group"
              >
                {/* Timeline Center Node */}
                <div className="absolute left-6 sm:left-1/2 top-0 sm:top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-2xl bg-slate-900 border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.6)] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-5 h-5 text-cyan-300" />
                  </div>
                </div>

                {/* Left Side: Meta Card (Desktop) */}
                <div className="w-full sm:w-1/2 pl-16 sm:pl-0 sm:pr-12 text-left sm:text-right">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.year}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-['Space_Grotesk']">
                    {item.organization}
                  </h3>
                  <div className="flex items-center gap-1.5 sm:justify-end text-xs font-mono text-slate-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Pune, Maharashtra, India</span>
                  </div>
                </div>

                {/* Right Side: Detailed 3D Card */}
                <div className="w-full sm:w-1/2 pl-16 sm:pl-12 text-left">
                  <motion.div
                    whileHover={{ y: -4 }}
                    onMouseEnter={() => audioManager.playHover()}
                    className="glass-panel p-6 sm:p-7 rounded-3xl border border-cyan-500/30 shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
                  >
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                      <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {item.subtitle}
                      </span>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        {item.status}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white mb-2 font-['Space_Grotesk']">
                      {item.title}
                    </h4>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Bullet Highlights */}
                    <div className="space-y-2 mb-5">
                      {item.details.map((d, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>

                    {/* Core Subjects Studied */}
                    <div className="pt-3 border-t border-slate-800/80">
                      <span className="block text-[10px] font-mono text-slate-400 mb-2">
                        CURRICULUM HIGHLIGHTS:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.skills.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-900 border border-slate-800 text-cyan-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
