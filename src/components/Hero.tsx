import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Hero3DCanvas } from './Hero3DCanvas';
import { AICore3D } from './AICore3D';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { audioManager } from '../utils/audio';

interface HeroProps {
  onNavigate: (pageId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const handleWarp = (pageId: string) => {
    audioManager.playClick();
    onNavigate(pageId);
  };

  return (
    <section className="relative min-h-[92vh] w-full flex flex-col justify-center items-center overflow-hidden pt-24 pb-16 px-4">
      {/* 3D WebGL Canvas Background */}
      <Hero3DCanvas />

      {/* Futuristic Vignette and Cyber Grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/30 via-transparent to-[#030712] pointer-events-none" />
      <div className="absolute inset-0 radial-glow pointer-events-none" />

      {/* Main Content Stage */}
      <div className="relative z-10 max-w-6xl mx-auto w-full text-center flex flex-col items-center">
        {/* Top Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel text-[11px] font-mono text-cyan-300 border border-cyan-500/30 mb-6 shadow-[0_0_20px_rgba(0,240,255,0.15)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="tracking-wider">CS DIPLOMA @ CWIT • DIGITAL UNIVERSE v3.0</span>
        </motion.div>

        {/* Extremely Large Cinematic Hero Title */}
        <div className="mb-2 overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase font-['Space_Grotesk'] leading-[0.9]"
          >
            <span className="block text-white">SHIVAM</span>
            <span className="block text-gradient drop-shadow-[0_0_40px_rgba(0,240,255,0.35)]">
              GAWANDE
            </span>
          </motion.h1>
        </div>

        {/* Cinematic Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs sm:text-sm md:text-base font-mono uppercase tracking-[0.2em] text-slate-300 mb-4 max-w-3xl"
        >
          <span className="text-cyan-400">Computer Science</span>
          <span className="text-slate-600 mx-2">•</span>
          <span className="text-emerald-400">AI/ML</span>
          <span className="text-slate-600 mx-2">•</span>
          <span className="text-purple-400">Agentic AI</span>
          <span className="text-slate-600 mx-2">•</span>
          <span className="text-white">Developer</span>
        </motion.p>

        {/* Philosophy Quotation */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-sm sm:text-lg text-slate-300 max-w-2xl mb-8 font-medium leading-relaxed"
        >
          "{PERSONAL_INFO.heroTagline}"
        </motion.p>

        {/* Interactive Signature 3D AI Core Preview Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-xs h-40 sm:h-44 mb-6 relative"
        >
          <AICore3D />
        </motion.div>

        {/* Portal Warp Actions */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-3.5 mb-10"
        >
          {/* Projects Portal */}
          <button
            onClick={() => handleWarp('projects')}
            onMouseEnter={() => audioManager.playHover()}
            className="px-7 py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer font-['Space_Grotesk']"
          >
            <span>03 // EXPLORE 3D PROJECTS</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* About Profile Portal */}
          <button
            onClick={() => handleWarp('about')}
            onMouseEnter={() => audioManager.playHover()}
            className="px-7 py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-slate-200 glass-panel border border-cyan-500/40 hover:border-cyan-400 hover:text-white shadow-[0_0_15px_rgba(0,240,255,0.1)] hover:shadow-[0_0_25px_rgba(0,240,255,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 cursor-pointer font-['Space_Grotesk']"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>02 // DIGITAL IDENTITY & BIO</span>
          </button>

          {/* Contact Portal */}
          <button
            onClick={() => handleWarp('contact')}
            onMouseEnter={() => audioManager.playHover()}
            className="px-6 py-3.5 rounded-2xl font-mono text-xs text-slate-300 glass-card border border-slate-700/80 hover:border-slate-500 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>07 // TRANSMIT SIGNAL</span>
          </button>
        </motion.div>

        {/* Quick Social & System Telemetry Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400"
        >
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Profile"
              onMouseEnter={() => audioManager.playHover()}
              className="p-2.5 rounded-xl glass-card text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn Profile"
              onMouseEnter={() => audioManager.playHover()}
              className="p-2.5 rounded-xl glass-card text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>SECTOR 01: DIGITAL HOME BASE</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
