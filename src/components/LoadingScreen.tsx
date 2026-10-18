import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldCheck, Sparkles } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface LoadingScreenProps {
  onComplete: () => void;
}

const TELEMETRY_LOGS = [
  'Establishing secure WebGL 3D pipeline...',
  'Compiling holographic matrix shaders...',
  'Initializing neural agent orchestrator...',
  'Mounting project visual datasets...',
  'Optimizing responsive viewport geometry...',
  'Shivam\'s digital universe online.'
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    audioManager.playPowerUp();

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 450);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 4;
        const next = Math.min(prev + increment, 100);
        
        // Update log index based on progress
        const logIdx = Math.min(
          Math.floor((next / 100) * TELEMETRY_LOGS.length),
          TELEMETRY_LOGS.length - 1
        );
        setLogIndex(logIdx);

        return next;
      });
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712] text-slate-100 overflow-hidden select-none"
      >
        {/* Futuristic Background Grids and Glow */}
        <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none translate-y-24" />

        <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center">
          {/* Holographic Spinning Ring Core */}
          <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
            {/* Outer rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-cyan-500/30 border-t-cyan-400 border-r-transparent"
            />
            {/* Middle counter-rotating ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              className="absolute inset-2 rounded-full border border-emerald-500/30 border-b-emerald-400 border-l-transparent"
            />
            {/* Glowing Core Monogram */}
            <div className="relative w-16 h-16 rounded-2xl glass-panel flex flex-col items-center justify-center border border-cyan-400/40 shadow-[0_0_25px_rgba(0,240,255,0.35)]">
              <span className="font-mono text-xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-400">
                SG.
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full cyber-badge text-xs font-mono mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '3s' }} />
              <span>3D DIGITAL ENVIRONMENT</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white font-['Space_Grotesk']">
              Initializing Shivam's Digital Space...
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              AI / ML • AGENTIC AI • SOFTWARE ARCHITECTURE
            </p>
          </div>

          {/* Progress Bar Container */}
          <div className="w-full bg-slate-900/80 p-1 rounded-full border border-slate-700/60 shadow-inner mb-4 relative overflow-hidden">
            <motion.div
              className="h-2 rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 relative"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#fff]" />
            </motion.div>
          </div>

          {/* Progress readout & status */}
          <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400 mb-6">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Terminal className="w-3.5 h-3.5" />
              STATUS: {progress < 100 ? 'COMPILING' : 'READY'}
            </span>
            <span className="font-bold text-slate-200 text-sm">{progress}%</span>
          </div>

          {/* Telemetry log terminal box */}
          <div className="w-full p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 font-mono text-[11px] text-slate-300 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-400 truncate">
              &gt; {TELEMETRY_LOGS[logIndex]}
            </span>
          </div>
        </div>

        {/* Footer subtle brand */}
        <div className="absolute bottom-6 flex items-center gap-2 text-[11px] font-mono text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-500/80" />
          <span>CWIT CS DIPLOMA • SHIVAM GAWANDE PORTFOLIO v2.5</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
